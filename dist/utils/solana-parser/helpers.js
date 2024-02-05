"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLogs = exports.flattenTransactionResponse = exports.parsedInstructionToInstruction = exports.compiledInstructionToInstruction = exports.parseTransactionAccounts = exports.hexToBuffer = void 0;
var anchor_1 = require("@project-serum/anchor");
var web3_js_1 = require("@solana/web3.js");
function hexToBuffer(data) {
    var rawHex = data.startsWith("0x") ? data.slice(2) : data;
    return Buffer.from(rawHex);
}
exports.hexToBuffer = hexToBuffer;
/**
 * Parse transaction message and extract account metas
 * @param message transaction message
 * @returns parsed accounts metas
 */
function parseTransactionAccounts(message) {
    var accounts = message.accountKeys;
    var readonlySignedAccountsCount = message.header.numReadonlySignedAccounts;
    var readonlyUnsignedAccountsCount = message.header.numReadonlyUnsignedAccounts;
    var requiredSignaturesAccountsCount = message.header.numRequiredSignatures;
    var totalAccounts = accounts.length;
    var parsedAccounts = accounts.map(function (account, idx) {
        var isSigner = idx < requiredSignaturesAccountsCount;
        var isWritable = idx < requiredSignaturesAccountsCount - readonlySignedAccountsCount ||
            (idx >= requiredSignaturesAccountsCount && idx < totalAccounts - readonlyUnsignedAccountsCount);
        return {
            isSigner: isSigner,
            isWritable: isWritable,
            pubkey: new web3_js_1.PublicKey(account),
        };
    });
    return parsedAccounts;
}
exports.parseTransactionAccounts = parseTransactionAccounts;
/**
 * Converts compiled instruction into common TransactionInstruction
 * @param compiledInstruction
 * @param parsedAccounts account meta, result of {@link parseTransactionAccounts}
 * @returns TransactionInstruction
 */
function compiledInstructionToInstruction(compiledInstruction, parsedAccounts) {
    return new web3_js_1.TransactionInstruction({
        data: anchor_1.utils.bytes.bs58.decode(compiledInstruction.data),
        programId: parsedAccounts[compiledInstruction.programIdIndex].pubkey,
        keys: compiledInstruction.accounts.map(function (accountIdx) { return parsedAccounts[accountIdx]; }),
    });
}
exports.compiledInstructionToInstruction = compiledInstructionToInstruction;
function parsedAccountsToMeta(accounts, accountMeta) {
    var meta = accountMeta.map(function (m) { return (__assign({ pk: m.pubkey.toString() }, m)); });
    return accounts.map(function (account) {
        var encoded = account.toString();
        var found = meta.find(function (item) { return item.pk === encoded; });
        if (!found)
            throw new Error("Account ".concat(encoded, " not present in account meta!"));
        return found;
    });
}
function parsedInstructionToInstruction(parsedInstruction, accountMeta) {
    return new web3_js_1.TransactionInstruction({
        data: anchor_1.utils.bytes.bs58.decode(parsedInstruction.data),
        programId: parsedInstruction.programId,
        keys: parsedAccountsToMeta(parsedInstruction.accounts, accountMeta),
    });
}
exports.parsedInstructionToInstruction = parsedInstructionToInstruction;
/**
 * Converts transaction response with CPI into artifical transaction that contains all instructions from tx and CPI
 * @param transaction transactionResponse to convert from
 * @returns Transaction object
 */
function flattenTransactionResponse(transaction) {
    var _a, _b;
    var result = new web3_js_1.Transaction();
    if (transaction === null || transaction === undefined)
        return result;
    var accountsMeta = parseTransactionAccounts(transaction.transaction.message);
    var orderedCII = (((_a = transaction === null || transaction === void 0 ? void 0 : transaction.meta) === null || _a === void 0 ? void 0 : _a.innerInstructions) || []).sort(function (a, b) { return a.index - b.index; });
    var totalCalls = (((_b = transaction.meta) === null || _b === void 0 ? void 0 : _b.innerInstructions) || []).reduce(function (accumulator, cii) { return accumulator + cii.instructions.length; }, 0) +
        transaction.transaction.message.instructions.length;
    var lastPushedIx = -1;
    var callIndex = -1;
    for (var _i = 0, orderedCII_1 = orderedCII; _i < orderedCII_1.length; _i++) {
        var CII = orderedCII_1[_i];
        // push original instructions until we meet CPI
        while (lastPushedIx !== CII.index) {
            lastPushedIx += 1;
            callIndex += 1;
            result.add(compiledInstructionToInstruction(transaction.transaction.message.instructions[lastPushedIx], accountsMeta));
        }
        for (var _c = 0, _d = CII.instructions; _c < _d.length; _c++) {
            var CIIEntry = _d[_c];
            result.add(compiledInstructionToInstruction(CIIEntry, accountsMeta));
            callIndex += 1;
        }
    }
    while (callIndex < totalCalls - 1) {
        lastPushedIx += 1;
        callIndex += 1;
        result.add(compiledInstructionToInstruction(transaction.transaction.message.instructions[lastPushedIx], accountsMeta));
    }
    return result;
}
exports.flattenTransactionResponse = flattenTransactionResponse;
/**
 * @private
 */
function newLogContext(programId, depth, id, instructionIndex) {
    return {
        logMessages: [],
        dataLogs: [],
        rawLogs: [],
        errors: [],
        programId: programId,
        depth: depth,
        id: id,
        instructionIndex: instructionIndex,
    };
}
/**
 * Parses transaction logs and provides additional context such as
 * - programId that generated the message
 * - call id of instruction, that generated the message
 * - call depth of instruction
 * - data messages, log messages and error messages
 * @param logs logs from TransactionResponse.meta.logs
 * @returns parsed logs with call depth and additional context
 */
function parseLogs(logs) {
    var parserRe = /(?<logTruncated>^Log truncated$)|(?<programInvoke>^Program (?<invokeProgramId>[1-9A-HJ-NP-Za-km-z]{32,}) invoke \[(?<level>\d+)\]$)|(?<programSuccessResult>^Program (?<successResultProgramId>[1-9A-HJ-NP-Za-km-z]{32,}) success$)|(?<programFailedResult>^Program (?<failedResultProgramId>[1-9A-HJ-NP-Za-km-z]{32,}) failed: (?<failedResultErr>.*)$)|(?<programCompleteFailedResult>^Program failed to complete: (?<failedCompleteError>.*)$)|(?<programLog>^^Program log: (?<logMessage>.*)$)|(?<programData>^Program data: (?<data>.*)$)|(?<programConsumed>^Program (?<consumedProgramId>[1-9A-HJ-NP-Za-km-z]{32,}) consumed (?<consumedComputeUnits>\d*) of (?<allComputedUnits>\d*) compute units$)|(?<programReturn>^Program return: (?<returnProgramId>[1-9A-HJ-NP-Za-km-z]{32,}) (?<returnMessage>.*)$)/s;
    var result = [];
    var id = -1;
    var currentInstruction = 0;
    var currentDepth = 0;
    var callStack = [];
    var callIds = [];
    for (var _i = 0, logs_1 = logs; _i < logs_1.length; _i++) {
        var log = logs_1[_i];
        var match = parserRe.exec(log);
        if (!match || !match.groups) {
            throw new Error("Failed to parse log line: ".concat(log));
        }
        if (match.groups.logTruncated) {
            result[callIds[callIds.length - 1]].invokeResult = "Log truncated";
        }
        else if (match.groups.programInvoke) {
            callStack.push(match.groups.invokeProgramId);
            id += 1;
            currentDepth += 1;
            callIds.push(id);
            if (match.groups.level != currentDepth.toString())
                throw new Error("invoke depth mismatch, log: ".concat(match.groups.level, ", expected: ").concat(currentDepth));
            result.push(newLogContext(callStack[callStack.length - 1], callStack.length, id, currentInstruction));
            result[result.length - 1].rawLogs.push(log);
        }
        else if (match.groups.programSuccessResult) {
            var lastProgram = callStack.pop();
            var lastCallIndex = callIds.pop();
            if (lastCallIndex === undefined)
                throw new Error("callIds malformed");
            if (lastProgram != match.groups.successResultProgramId)
                throw new Error("[ProramSuccess] callstack mismatch");
            result[lastCallIndex].rawLogs.push(log);
            currentDepth -= 1;
            if (currentDepth === 0) {
                currentInstruction += 1;
            }
        }
        else if (match.groups.programFailedResult) {
            var lastProgram = callStack.pop();
            if (lastProgram != match.groups.failedResultProgramId)
                throw new Error("[ProgramFailed] callstack mismatch");
            result[callIds[callIds.length - 1]].rawLogs.push(log);
            result[callIds[callIds.length - 1]].errors.push(match.groups.failedResultErr);
        }
        else if (match.groups.programCompleteFailedResult) {
            result[callIds[callIds.length - 1]].rawLogs.push(log);
            result[callIds[callIds.length - 1]].errors.push(match.groups.failedCompleteError);
        }
        else if (match.groups.programLog) {
            result[callIds[callIds.length - 1]].rawLogs.push(log);
            result[callIds[callIds.length - 1]].logMessages.push(match.groups.logMessage);
        }
        else if (match.groups.programData) {
            result[callIds[callIds.length - 1]].rawLogs.push(log);
            result[callIds[callIds.length - 1]].dataLogs.push(match.groups.data);
        }
        else if (match.groups.programConsumed) {
            result[callIds[callIds.length - 1]].rawLogs.push(log);
        }
        else if (match.groups.programReturn) {
            if (callStack[callStack.length - 1] != match.groups.returnProgramId)
                throw new Error("[InvokeReturn]: callstack mismatch");
            result[callIds[callIds.length - 1]].invokeResult = match.groups.returnMessage;
        }
    }
    return result;
}
exports.parseLogs = parseLogs;
//# sourceMappingURL=helpers.js.map