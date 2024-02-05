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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaParser = void 0;
var buffer_1 = require("buffer");
var web3_js_1 = require("@solana/web3.js");
var spl = __importStar(require("@solana/spl-token"));
var anchor_1 = require("@project-serum/anchor");
var buffer_layout_1 = require("@solana/buffer-layout");
var helpers_1 = require("./helpers");
function decodeSystemInstruction(instruction) {
    var ixType = web3_js_1.SystemInstruction.decodeInstructionType(instruction);
    var parsed;
    switch (ixType) {
        case "AdvanceNonceAccount": {
            var decoded = web3_js_1.SystemInstruction.decodeNonceAdvance(instruction);
            parsed = {
                name: "advanceNonceAccount",
                accounts: [
                    { name: "nonce", pubkey: decoded.noncePubkey, isSigner: false, isWritable: true },
                    __assign({ name: "recentBlockhashSysvar" }, instruction.keys[1]),
                    { name: "nonceAuthority", pubkey: decoded.authorizedPubkey, isSigner: true, isWritable: false },
                ],
                args: {},
            };
            break;
        }
        case "Allocate": {
            var decoded = web3_js_1.SystemInstruction.decodeAllocate(instruction);
            parsed = {
                name: "allocate",
                accounts: [{ name: "newAccount", pubkey: decoded.accountPubkey, isSigner: true, isWritable: true }],
                args: { space: new anchor_1.BN(decoded.space) },
            };
            break;
        }
        case "AllocateWithSeed": {
            var decoded = web3_js_1.SystemInstruction.decodeAllocateWithSeed(instruction);
            parsed = {
                name: "allocateWithSeed",
                accounts: [
                    { name: "newAccount", pubkey: decoded.accountPubkey, isSigner: false, isWritable: true },
                    { name: "base", pubkey: decoded.basePubkey, isSigner: true, isWritable: false },
                ],
                args: {
                    seed: decoded.seed,
                    space: new anchor_1.BN(decoded.space),
                    owner: decoded.programId,
                    base: decoded.basePubkey,
                },
            };
            break;
        }
        case "Assign": {
            var decoded = web3_js_1.SystemInstruction.decodeAssign(instruction);
            parsed = {
                name: "assign",
                accounts: [{ name: "assignedAccount", pubkey: decoded.accountPubkey, isSigner: true, isWritable: true }],
                args: { owner: decoded.programId },
            };
            break;
        }
        case "AssignWithSeed": {
            var decoded = web3_js_1.SystemInstruction.decodeAssignWithSeed(instruction);
            parsed = {
                name: "assignWithSeed",
                accounts: [
                    { name: "assigned", pubkey: decoded.accountPubkey, isSigner: false, isWritable: true },
                    { name: "base", pubkey: decoded.basePubkey, isSigner: true, isWritable: false },
                ],
                args: {
                    seed: decoded.seed,
                    owner: decoded.programId,
                    base: decoded.basePubkey,
                },
            };
            break;
        }
        case "AuthorizeNonceAccount": {
            var decoded = web3_js_1.SystemInstruction.decodeNonceAuthorize(instruction);
            parsed = {
                name: "authorizeNonceAccount",
                accounts: [
                    { name: "nonce", isSigner: false, isWritable: true, pubkey: decoded.noncePubkey },
                    { name: "nonceAuthority", isSigner: true, isWritable: false, pubkey: decoded.authorizedPubkey },
                ],
                args: { authorized: decoded.newAuthorizedPubkey },
            };
            break;
        }
        case "Create": {
            var decoded = web3_js_1.SystemInstruction.decodeCreateAccount(instruction);
            parsed = {
                name: "createAccount",
                accounts: [
                    { name: "payer", pubkey: decoded.fromPubkey, isSigner: true, isWritable: true },
                    { name: "newAccount", pubkey: decoded.newAccountPubkey, isSigner: true, isWritable: true },
                ],
                args: { lamports: new anchor_1.BN(decoded.lamports), owner: decoded.programId, space: new anchor_1.BN(decoded.space) },
            };
            break;
        }
        case "CreateWithSeed": {
            var decoded = web3_js_1.SystemInstruction.decodeCreateWithSeed(instruction);
            parsed = {
                name: "createAccountWithSeed",
                accounts: [
                    { name: "payer", pubkey: decoded.fromPubkey, isSigner: true, isWritable: true },
                    { name: "created", pubkey: decoded.newAccountPubkey, isSigner: false, isWritable: true },
                    { name: "base", pubkey: decoded.basePubkey, isSigner: true, isWritable: false },
                ],
                args: {
                    lamports: new anchor_1.BN(decoded.lamports),
                    owner: decoded.programId,
                    space: new anchor_1.BN(decoded.space),
                    seed: decoded.seed,
                    base: decoded.basePubkey,
                },
            };
            break;
        }
        case "InitializeNonceAccount": {
            var decoded = web3_js_1.SystemInstruction.decodeNonceInitialize(instruction);
            parsed = {
                name: "initializeNonceAccount",
                accounts: [
                    { name: "nonce", pubkey: decoded.noncePubkey, isSigner: false, isWritable: true },
                    __assign({ name: "recentBlockhashSysvar" }, instruction.keys[1]),
                    __assign({ name: "rentSysvar" }, instruction.keys[2]),
                ],
                args: { authorized: decoded.authorizedPubkey },
            };
            break;
        }
        case "Transfer": {
            var decoded = web3_js_1.SystemInstruction.decodeTransfer(instruction);
            parsed = {
                name: "transfer",
                accounts: [
                    { name: "sender", pubkey: decoded.fromPubkey, isSigner: true, isWritable: true },
                    { name: "receiver", pubkey: decoded.toPubkey, isWritable: true, isSigner: false },
                ],
                args: { lamports: new anchor_1.BN(decoded.lamports.toString()) },
            };
            break;
        }
        case "TransferWithSeed": {
            var decoded = web3_js_1.SystemInstruction.decodeTransferWithSeed(instruction);
            parsed = {
                name: "transferWithSeed",
                accounts: [
                    { name: "sender", pubkey: decoded.fromPubkey, isSigner: false, isWritable: true },
                    { name: "base", pubkey: decoded.basePubkey, isSigner: true, isWritable: false },
                    { name: "receiver", pubkey: decoded.toPubkey, isSigner: false, isWritable: true },
                ],
                args: { owner: decoded.programId, lamports: new anchor_1.BN(decoded.lamports.toString()), seed: decoded.seed },
            };
            break;
        }
        case "WithdrawNonceAccount": {
            var decoded = web3_js_1.SystemInstruction.decodeNonceWithdraw(instruction);
            parsed = {
                name: "withdrawNonceAccount",
                accounts: [
                    { name: "nonce", pubkey: decoded.noncePubkey, isSigner: false, isWritable: true },
                    { name: "recepient", pubkey: decoded.toPubkey, isSigner: false, isWritable: true },
                    __assign({ name: "recentBlockhashSysvar" }, instruction.keys[2]),
                    __assign({ name: "rentSysvar" }, instruction.keys[3]),
                    { name: "nonceAuthority", pubkey: decoded.noncePubkey, isSigner: true, isWritable: false },
                ],
                args: { lamports: new anchor_1.BN(decoded.lamports) },
            };
            break;
        }
        default: {
            parsed = null;
        }
    }
    return parsed
        ? __assign(__assign({}, parsed), { programId: web3_js_1.SystemProgram.programId }) : {
        programId: web3_js_1.SystemProgram.programId,
        name: "unknown",
        accounts: instruction.keys,
        args: { unknown: instruction.data },
    };
}
function decodeTokenInstruction(instruction) {
    var parsed;
    var decoded = (0, buffer_layout_1.u8)().decode(instruction.data);
    switch (decoded) {
        case spl.TokenInstruction.InitializeMint: {
            var decodedIx = spl.decodeInitializeMintInstruction(instruction);
            parsed = {
                name: "initializeMint",
                accounts: [
                    __assign({ name: "tokenMint" }, decodedIx.keys.mint),
                    __assign({ name: "rentSysvar" }, decodedIx.keys.rent),
                ],
                args: { decimals: decodedIx.data.decimals, mintAuthority: decodedIx.data.mintAuthority, freezeAuthority: decodedIx.data.freezeAuthority },
            };
            break;
        }
        case spl.TokenInstruction.InitializeAccount: {
            var decodedIx = spl.decodeInitializeAccountInstruction(instruction);
            parsed = {
                name: "initializeAccount",
                accounts: [
                    __assign({ name: "newAccount" }, decodedIx.keys.account),
                    __assign({ name: "tokenMint" }, decodedIx.keys.mint),
                    __assign({ name: "owner" }, decodedIx.keys.owner),
                    __assign({ name: "rentSysvar" }, decodedIx.keys.rent),
                ],
                args: {},
            };
            break;
        }
        case spl.TokenInstruction.InitializeMultisig: {
            var decodedIx = spl.decodeInitializeMultisigInstruction(instruction);
            var multisig = decodedIx.keys.signers.map(function (meta, idx) { return (__assign({ name: "signer_".concat(idx) }, meta)); });
            parsed = {
                name: "initializeMultisig",
                accounts: __spreadArray([__assign({ name: "multisig" }, decodedIx.keys.account), __assign({ name: "rentSysvar" }, decodedIx.keys.rent)], multisig, true),
                args: { m: decodedIx.data.m },
            };
            break;
        }
        case spl.TokenInstruction.Transfer: {
            var decodedIx = spl.decodeTransferInstruction(instruction);
            var multisig = decodedIx.keys.multiSigners.map(function (meta, idx) { return (__assign({ name: "signer_".concat(idx) }, meta)); });
            parsed = {
                name: "transfer",
                accounts: __spreadArray([
                    __assign({ name: "source" }, decodedIx.keys.source),
                    __assign({ name: "destination" }, decodedIx.keys.destination),
                    __assign({ name: "owner" }, decodedIx.keys.owner)
                ], multisig, true),
                args: { amount: new anchor_1.BN(decodedIx.data.amount.toString()) },
            };
            break;
        }
        case spl.TokenInstruction.Approve: {
            var decodedIx = spl.decodeApproveInstruction(instruction);
            var multisig = decodedIx.keys.multiSigners.map(function (meta, idx) { return (__assign({ name: "signer_".concat(idx) }, meta)); });
            parsed = {
                name: "approve",
                accounts: __spreadArray([
                    __assign({ name: "source" }, decodedIx.keys.account),
                    __assign({ name: "delegate" }, decodedIx.keys.delegate),
                    __assign({ name: "owner" }, decodedIx.keys.owner)
                ], multisig, true),
                args: { amount: new anchor_1.BN(decodedIx.data.amount.toString()) },
            };
            break;
        }
        case spl.TokenInstruction.Revoke: {
            var decodedIx = spl.decodeRevokeInstruction(instruction);
            var multisig = decodedIx.keys.multiSigners.map(function (meta, idx) { return (__assign({ name: "signer_".concat(idx) }, meta)); });
            parsed = {
                name: "revoke",
                accounts: __spreadArray([__assign({ name: "source" }, decodedIx.keys.account), __assign({ name: "owner" }, decodedIx.keys.owner)], multisig, true),
                args: {},
            };
            break;
        }
        case spl.TokenInstruction.SetAuthority: {
            var decodedIx = spl.decodeSetAuthorityInstruction(instruction);
            var multisig = decodedIx.keys.multiSigners.map(function (meta, idx) { return (__assign({ name: "signer_".concat(idx) }, meta)); });
            parsed = {
                name: "setAuthority",
                accounts: __spreadArray([__assign({ name: "account" }, decodedIx.keys.account), __assign({ name: "currentAuthority" }, decodedIx.keys.currentAuthority)], multisig, true),
                args: { authorityType: decodedIx.data.authorityType, newAuthority: decodedIx.data.newAuthority },
            };
            break;
        }
        case spl.TokenInstruction.MintTo: {
            var decodedIx = spl.decodeMintToInstruction(instruction);
            var multisig = decodedIx.keys.multiSigners.map(function (meta, idx) { return (__assign({ name: "signer_".concat(idx) }, meta)); });
            parsed = {
                name: "mintTo",
                accounts: __spreadArray([
                    __assign({ name: "tokenMint" }, decodedIx.keys.mint),
                    __assign({ name: "mintTo" }, decodedIx.keys.destination),
                    __assign({ name: "authority" }, decodedIx.keys.authority)
                ], multisig, true),
                args: { amount: new anchor_1.BN(decodedIx.data.amount.toString()) },
            };
            break;
        }
        case spl.TokenInstruction.Burn: {
            var decodedIx = spl.decodeBurnInstruction(instruction);
            var multisig = decodedIx.keys.multiSigners.map(function (meta, idx) { return (__assign({ name: "signer_".concat(idx) }, meta)); });
            parsed = {
                name: "burn",
                accounts: __spreadArray([
                    __assign({ name: "burnFrom" }, decodedIx.keys.account),
                    __assign({ name: "tokenMint" }, decodedIx.keys.mint),
                    __assign({ name: "owner" }, decodedIx.keys.owner)
                ], multisig, true),
                args: { amount: new anchor_1.BN(decodedIx.data.amount.toString()) },
            };
            break;
        }
        case spl.TokenInstruction.CloseAccount: {
            var decodedIx = spl.decodeCloseAccountInstruction(instruction);
            var multisig = decodedIx.keys.multiSigners.map(function (meta, idx) { return (__assign({ name: "signer_".concat(idx) }, meta)); });
            parsed = {
                name: "closeAccount",
                accounts: __spreadArray([
                    __assign({ name: "account" }, decodedIx.keys.account),
                    __assign({ name: "destination" }, decodedIx.keys.destination),
                    __assign({ name: "owner" }, decodedIx.keys.authority)
                ], multisig, true),
                args: {},
            };
            break;
        }
        case spl.TokenInstruction.FreezeAccount: {
            var decodedIx = spl.decodeFreezeAccountInstruction(instruction);
            var multisig = decodedIx.keys.multiSigners.map(function (meta, idx) { return (__assign({ name: "signer_".concat(idx) }, meta)); });
            parsed = {
                name: "freezeAccount",
                accounts: __spreadArray([
                    __assign({ name: "account" }, decodedIx.keys.account),
                    __assign({ name: "tokenMint" }, decodedIx.keys.mint),
                    __assign({ name: "authority" }, decodedIx.keys.authority)
                ], multisig, true),
                args: {},
            };
            break;
        }
        case spl.TokenInstruction.ThawAccount: {
            var decodedIx = spl.decodeThawAccountInstruction(instruction);
            var multisig = decodedIx.keys.multiSigners.map(function (meta, idx) { return (__assign({ name: "signer_".concat(idx) }, meta)); });
            parsed = {
                name: "thawAccount",
                accounts: __spreadArray([
                    __assign({ name: "account" }, decodedIx.keys.account),
                    __assign({ name: "tokenMint" }, decodedIx.keys.mint),
                    __assign({ name: "authority" }, decodedIx.keys.authority)
                ], multisig, true),
                args: {},
            };
            break;
        }
        case spl.TokenInstruction.TransferChecked: {
            var decodedIx = spl.decodeTransferCheckedInstruction(instruction);
            var multisig = decodedIx.keys.multiSigners.map(function (meta, idx) { return (__assign({ name: "signer_".concat(idx) }, meta)); });
            parsed = {
                name: "transferChecked",
                accounts: __spreadArray([
                    __assign({ name: "source" }, decodedIx.keys.source),
                    __assign({ name: "tokenMint" }, decodedIx.keys.mint),
                    __assign({ name: "destination" }, decodedIx.keys.destination),
                    __assign({ name: "owner" }, decodedIx.keys.owner)
                ], multisig, true),
                args: { amount: new anchor_1.BN(decodedIx.data.amount.toString()), decimals: decodedIx.data.decimals },
            };
            break;
        }
        case spl.TokenInstruction.ApproveChecked: {
            var decodedIx = spl.decodeApproveCheckedInstruction(instruction);
            var multisig = decodedIx.keys.multiSigners.map(function (meta, idx) { return (__assign({ name: "signer_".concat(idx) }, meta)); });
            parsed = {
                name: "approveChecked",
                accounts: __spreadArray([
                    __assign({ name: "source" }, decodedIx.keys.account),
                    __assign({ name: "tokenMint" }, decodedIx.keys.mint),
                    __assign({ name: "delegate" }, decodedIx.keys.delegate),
                    __assign({ name: "owner" }, decodedIx.keys.owner)
                ], multisig, true),
                args: { amount: new anchor_1.BN(decodedIx.data.amount.toString()), decimals: decodedIx.data.decimals },
            };
            break;
        }
        case spl.TokenInstruction.MintToChecked: {
            var decodedIx = spl.decodeMintToCheckedInstruction(instruction);
            var multisig = decodedIx.keys.multiSigners.map(function (meta, idx) { return (__assign({ name: "signer_".concat(idx) }, meta)); });
            parsed = {
                name: "mintToChecked",
                accounts: __spreadArray([
                    __assign({ name: "tokenMint" }, decodedIx.keys.mint),
                    __assign({ name: "mintTo" }, decodedIx.keys.destination),
                    __assign({ name: "authority" }, decodedIx.keys.authority)
                ], multisig, true),
                args: { amount: new anchor_1.BN(decodedIx.data.amount.toString()), decimals: decodedIx.data.decimals },
            };
            break;
        }
        case spl.TokenInstruction.BurnChecked: {
            var decodedIx = spl.decodeBurnCheckedInstruction(instruction);
            var multisig = decodedIx.keys.multiSigners.map(function (meta, idx) { return (__assign({ name: "signer_".concat(idx) }, meta)); });
            parsed = {
                name: "burnChecked",
                accounts: __spreadArray([
                    __assign({ name: "burnFrom" }, decodedIx.keys.account),
                    __assign({ name: "tokenMint" }, decodedIx.keys.mint),
                    __assign({ name: "owner" }, decodedIx.keys.owner)
                ], multisig, true),
                args: { amount: new anchor_1.BN(decodedIx.data.amount.toString()), decimals: decodedIx.data.decimals },
            };
            break;
        }
        case spl.TokenInstruction.InitializeAccount2: {
            var initializeAccount2InstructionData = (0, buffer_layout_1.struct)([(0, buffer_layout_1.u8)("instruction"), (0, buffer_layout_1.blob)(32, "owner")]);
            var decodedIx = initializeAccount2InstructionData.decode(instruction.data);
            parsed = {
                name: "initializeAccount2",
                accounts: [
                    __assign({ name: "newAccount" }, instruction.keys[0]),
                    __assign({ name: "tokenMint" }, instruction.keys[1]),
                    __assign({ name: "rentSysvar" }, instruction.keys[2]),
                ],
                args: { authority: new web3_js_1.PublicKey(decodedIx.owner) },
            };
            break;
        }
        case spl.TokenInstruction.SyncNative: {
            parsed = {
                name: "syncNative",
                accounts: [__assign({ name: "account" }, instruction.keys[0])],
                args: {},
            };
            break;
        }
        case spl.TokenInstruction.InitializeAccount3: {
            var initializeAccount3InstructionData = (0, buffer_layout_1.struct)([(0, buffer_layout_1.u8)("instruction"), (0, buffer_layout_1.blob)(32, "owner")]);
            var decodedIx = initializeAccount3InstructionData.decode(instruction.data);
            parsed = {
                name: "initializeAccount3",
                accounts: [
                    __assign({ name: "newAccount" }, instruction.keys[0]),
                    __assign({ name: "tokenMint" }, instruction.keys[1]),
                ],
                args: { authority: new web3_js_1.PublicKey(decodedIx.owner) },
            };
            break;
        }
        case spl.TokenInstruction.InitializeMultisig2: {
            var multisig = instruction.keys.slice(1).map(function (meta, idx) { return (__assign({ name: "signer_".concat(idx) }, meta)); });
            parsed = {
                name: "initializeMultisig2",
                accounts: __spreadArray([__assign({ name: "multisig" }, instruction.keys[0])], multisig, true),
                args: { m: instruction.data[1] },
            };
            break;
        }
        case spl.TokenInstruction.InitializeMint2: {
            var decodedIx = spl.decodeInitializeMintInstructionUnchecked(instruction);
            var tokenMint = decodedIx.keys.mint;
            if (!tokenMint)
                throw new Error("Failed to parse InitializeMint2 instruction");
            parsed = {
                name: "initializeMint2",
                accounts: [__assign({ name: "tokenMint" }, decodedIx.keys.mint)],
                args: { decimals: decodedIx.data.decimals, mintAuthority: decodedIx.data.mintAuthority, freezeAuthority: decodedIx.data.freezeAuthority },
            };
            break;
        }
        default: {
            parsed = null;
        }
    }
    return parsed
        ? __assign(__assign({}, parsed), { programId: spl.TOKEN_PROGRAM_ID }) : {
        programId: spl.TOKEN_PROGRAM_ID,
        name: "unknown",
        accounts: instruction.keys,
        args: { unknown: instruction.data },
    };
}
function decodeAssociatedTokenInstruction(instruction) {
    return {
        name: "createAssociatedTokenAccount",
        accounts: __spreadArray([
            __assign({ name: "fundingAccount" }, instruction.keys[0]),
            __assign({ name: "newAccount" }, instruction.keys[1]),
            __assign({ name: "wallet" }, instruction.keys[2]),
            __assign({ name: "tokenMint" }, instruction.keys[3]),
            __assign({ name: "systemProgram" }, instruction.keys[4]),
            __assign({ name: "tokenProgram" }, instruction.keys[5])
        ], [instruction.keys.length > 5 ? __assign({ name: "rentSysvar" }, instruction.keys[6]) : undefined], false),
        args: {},
        programId: spl.ASSOCIATED_TOKEN_PROGRAM_ID,
    };
}
function flattenIdlAccounts(accounts, prefix) {
    return accounts
        .map(function (account) {
        var accName = account.name;
        if (Object.prototype.hasOwnProperty.call(account, "accounts")) {
            var newPrefix = prefix ? "".concat(prefix, " > ").concat(accName) : accName;
            return flattenIdlAccounts(account.accounts, newPrefix);
        }
        else {
            return __assign(__assign({}, account), { name: prefix ? "".concat(prefix, " > ").concat(accName) : accName });
        }
    })
        .flat();
}
/**
 * Class for parsing arbitrary solana transactions in various formats
 * - by txHash
 * - from raw transaction data (base64 encoded or buffer)
 * - @solana/web3.js getTransaction().message object
 * - @solana/web3.js getParsedTransaction().message or Transaction.compileMessage() object
 * - @solana/web3.js TransactionInstruction object
 */
var SolanaParser = /** @class */ (function () {
    /**
     * Initializes parser object
     * `SystemProgram`, `TokenProgram` and `AssociatedTokenProgram` are supported by default
     * but may be overriden by providing custom idl/custom parser
     * @param programInfos list of objects which contains programId and corresponding idl
     * @param parsers list of pairs (programId, custom parser)
     */
    function SolanaParser(programInfos, parsers) {
        var standartParsers = [
            [web3_js_1.SystemProgram.programId.toBase58(), decodeSystemInstruction],
            [spl.TOKEN_PROGRAM_ID.toBase58(), decodeTokenInstruction],
            [spl.ASSOCIATED_TOKEN_PROGRAM_ID.toBase58(), decodeAssociatedTokenInstruction],
        ];
        var result;
        parsers = parsers || [];
        for (var _i = 0, programInfos_1 = programInfos; _i < programInfos_1.length; _i++) {
            var programInfo = programInfos_1[_i];
            parsers.push(this.buildIdlParser(new web3_js_1.PublicKey(programInfo.programId), programInfo.idl));
        }
        if (!parsers) {
            result = new Map(standartParsers);
        }
        else {
            // first set provided parsers
            result = new Map(parsers);
            // append standart parsers if parser not exist yet
            for (var _a = 0, standartParsers_1 = standartParsers; _a < standartParsers_1.length; _a++) {
                var parserInfo = standartParsers_1[_a];
                if (!result.has(parserInfo[0])) {
                    result.set.apply(result, parserInfo);
                }
            }
        }
        this.instructionParsers = result;
    }
    /**
     * Adds (or updates) parser for provided programId
     * @param programId program id to add parser for
     * @param parser parser to parse programId instructions
     */
    SolanaParser.prototype.addParser = function (programId, parser) {
        this.instructionParsers.set(programId.toBase58(), parser);
    };
    /**
     * Adds (or updates) parser for provided programId
     * @param programId program id to add parser for
     * @param idl IDL that describes anchor program
     */
    SolanaParser.prototype.addParserFromIdl = function (programId, idl) {
        var _a;
        (_a = this.instructionParsers).set.apply(_a, this.buildIdlParser(new web3_js_1.PublicKey(programId), idl));
    };
    SolanaParser.prototype.buildIdlParser = function (programId, idl) {
        var _this = this;
        var idlParser = function (instruction) {
            var coder = new anchor_1.BorshInstructionCoder(idl);
            var parsedIx = coder.decode(instruction.data);
            if (!parsedIx) {
                return _this.buildUnknownParsedInstruction(instruction.programId, instruction.keys, instruction.data);
            }
            else {
                var ix = idl.instructions.find(function (instr) { return instr.name === parsedIx.name; });
                if (!ix) {
                    return _this.buildUnknownParsedInstruction(instruction.programId, instruction.keys, instruction.data, parsedIx.name);
                }
                var flatIdlAccounts_1 = flattenIdlAccounts(ix.accounts);
                var accounts = instruction.keys.map(function (meta, idx) {
                    if (idx < flatIdlAccounts_1.length) {
                        return __assign({ name: flatIdlAccounts_1[idx].name }, meta);
                    }
                    // "Remaining accounts" are unnamed in Anchor.
                    else {
                        return __assign({ name: "Remaining ".concat(idx - flatIdlAccounts_1.length) }, meta);
                    }
                });
                return {
                    name: parsedIx.name,
                    accounts: accounts,
                    programId: instruction.programId,
                    args: parsedIx.data, // as IxArgsMap<typeof idl, typeof idl["instructions"][number]["name"]>,
                };
            }
        };
        return [programId.toBase58(), idlParser.bind(this)];
    };
    /**
     * Removes parser for provided program id
     * @param programId program id to remove parser for
     */
    SolanaParser.prototype.removeParser = function (programId) {
        this.instructionParsers.delete(programId.toBase58());
    };
    SolanaParser.prototype.buildUnknownParsedInstruction = function (programId, accounts, argData, name) {
        return {
            programId: programId,
            accounts: accounts,
            args: { unknown: argData },
            name: name || "unknown",
        };
    };
    /**
     * Parses instruction
     * @param instruction transaction instruction to parse
     * @returns parsed transaction instruction or UnknownInstruction
     */
    SolanaParser.prototype.parseInstruction = function (instruction) {
        if (!this.instructionParsers.has(instruction.programId.toBase58())) {
            return this.buildUnknownParsedInstruction(instruction.programId, instruction.keys, instruction.data);
        }
        else {
            var parser = this.instructionParsers.get(instruction.programId.toBase58());
            return parser(instruction);
        }
    };
    /**
     * Parses transaction data
     * @param txMessage message to parse
     * @returns list of parsed instructions
     */
    SolanaParser.prototype.parseTransactionData = function (txMessage) {
        var _this = this;
        var parsedAccounts = (0, helpers_1.parseTransactionAccounts)(txMessage);
        return txMessage.instructions.map(function (instruction) { return _this.parseInstruction((0, helpers_1.compiledInstructionToInstruction)(instruction, parsedAccounts)); });
    };
    /**
     * Parses transaction data retrieved from Connection.getParsedTransaction
     * @param txParsedMessage message to parse
     * @returns list of parsed instructions
     */
    SolanaParser.prototype.parseTransactionParsedData = function (txParsedMessage) {
        var _this = this;
        var parsedAccounts = txParsedMessage.accountKeys.map(function (metaLike) { return ({
            isSigner: metaLike.signer,
            isWritable: metaLike.writable,
            pubkey: metaLike.pubkey,
        }); });
        return txParsedMessage.instructions.map(function (parsedIx) {
            return _this.parseInstruction((0, helpers_1.parsedInstructionToInstruction)(parsedIx, parsedAccounts));
        });
    };
    /**
     * Fetches tx from blockchain and parses it
     * @param connection web3 Connection
     * @param txId transaction id
     * @param flatten - true if CPI calls need to be parsed too
     * @returns list of parsed instructions
     */
    SolanaParser.prototype.parseTransaction = function (connection, txId, flatten) {
        if (flatten === void 0) { flatten = false; }
        return __awaiter(this, void 0, void 0, function () {
            var transaction, flattened;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection.getTransaction(txId, { commitment: "confirmed" })];
                    case 1:
                        transaction = _a.sent();
                        if (!transaction)
                            return [2 /*return*/, null];
                        if (flatten) {
                            flattened = (0, helpers_1.flattenTransactionResponse)(transaction);
                            return [2 /*return*/, flattened.instructions.map(function (ix) { return _this.parseInstruction(ix); })];
                        }
                        return [2 /*return*/, this.parseTransactionData(transaction.transaction.message)];
                }
            });
        });
    };
    /**
     * Parses transaction dump
     * @param txDump base64-encoded string or raw Buffer which contains tx dump
     * @returns list of parsed instructions
     */
    SolanaParser.prototype.parseTransactionDump = function (txDump) {
        if (!(txDump instanceof buffer_1.Buffer))
            txDump = buffer_1.Buffer.from(txDump, "base64");
        var tx = web3_js_1.Transaction.from(txDump);
        var message = tx.compileMessage();
        return this.parseTransactionData(message);
    };
    return SolanaParser;
}());
exports.SolanaParser = SolanaParser;
//# sourceMappingURL=parsers.js.map