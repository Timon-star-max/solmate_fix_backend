"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findSaleSate = exports.findGlobalState = exports.getSolTransaction = exports.getEvmTransaction = exports.getUsdPrice = exports.getContractAddress = exports.getRpcUrl = exports.depositFunc = void 0;
var providers_1 = require("@ethersproject/providers");
var ethers_1 = require("ethers");
var utils_1 = require("ethers/lib/utils");
var constants_1 = require("../constants");
var pubkey_1 = require("@project-serum/anchor/dist/cjs/utils/pubkey");
var anchor = __importStar(require("@project-serum/anchor"));
var anchor_1 = require("@project-serum/anchor");
var web3_js_1 = require("@solana/web3.js");
var logger_1 = __importDefault(require("./logger"));
var erc20_json_1 = __importDefault(require("../constants/erc20.json"));
var chainlink_json_1 = __importDefault(require("../constants/chainlink.json"));
var solana_parser_1 = require("./solana-parser");
var presale_idl_1 = require("../constants/presale_idl");
var spl_token_1 = require("@solana/spl-token");
var connection = new web3_js_1.Connection(constants_1.SOL_RPC_URL, {
    commitment: 'confirmed'
});
var provider = new anchor.AnchorProvider(connection, new anchor.Wallet(web3_js_1.Keypair.generate()), { commitment: 'confirmed' });
var program = new anchor_1.Program(presale_idl_1.IDL, constants_1.PRESALE_PROGRAM_ID, provider);
var parser = new solana_parser_1.SolanaParser([
    {
        idl: presale_idl_1.IDL,
        programId: constants_1.PRESALE_PROGRAM_ID
    }
]);
exports.depositFunc = {
    DepositRequest: [
        { name: "from", type: "address" },
        { name: "tokenAddress", type: "address" },
        { name: "tokenAmount", type: "uint256" },
        { name: "amount", type: "uint256" },
        { name: "deadline", type: "uint256" },
        { name: "nonce", type: "uint256" },
    ]
};
function delay(time) {
    return new Promise(function (resolve) { return setTimeout(resolve, time); });
}
var getRpcUrl = function (chainId) {
    if (chainId == constants_1.ETH_CHAIN_ID) {
        return constants_1.ETH_RPC_URL;
    }
    else if (chainId == constants_1.BSC_CHAIN_ID) {
        return constants_1.BSC_RPC_URL;
    }
    return null;
};
exports.getRpcUrl = getRpcUrl;
var getContractAddress = function (chainId) {
    if (chainId == constants_1.ETH_CHAIN_ID) {
        return constants_1.ETH_CONTRACT_ADDR;
    }
    else if (chainId == constants_1.BSC_CHAIN_ID) {
        return constants_1.BSC_CONTRACT_ADDR;
    }
    return null;
};
exports.getContractAddress = getContractAddress;
var getUsdPrice = function (chainType) { return __awaiter(void 0, void 0, void 0, function () {
    var provider_1, contract, roundData, price, ex_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                provider_1 = new providers_1.JsonRpcProvider(constants_1.MAIN_RPC_URL);
                contract = new ethers_1.Contract(constants_1.PRICE_FEED_ADDRESS[chainType], chainlink_json_1.default, provider_1);
                return [4 /*yield*/, contract.latestRoundData()];
            case 1:
                roundData = _a.sent();
                price = (parseFloat((roundData.answer)) / 100000000.0);
                return [2 /*return*/, price];
            case 2:
                ex_1 = _a.sent();
                logger_1.default.error("getUsdPrice - ".concat(chainType, " - ").concat(ex_1.toString()));
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUsdPrice = getUsdPrice;
var getEvmTransaction = function (chainId, txHash) { return __awaiter(void 0, void 0, void 0, function () {
    var provider_2, tx, i, to_1, log, data, idx, from, tokenAddress, tokenAmountHex, amountHex, tokenAmount, tokenContract, decimals, amount, ex_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 9, , 10]);
                provider_2 = new providers_1.JsonRpcProvider((0, exports.getRpcUrl)(chainId));
                tx = void 0;
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < 3)) return [3 /*break*/, 5];
                return [4 /*yield*/, provider_2.getTransactionReceipt(txHash)];
            case 2:
                tx = _a.sent();
                if (tx) {
                    return [3 /*break*/, 5];
                }
                return [4 /*yield*/, delay(3000)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 1];
            case 5:
                if (tx === null) {
                    return [2 /*return*/, null];
                }
                to_1 = (0, exports.getContractAddress)(chainId);
                if (tx.to != to_1) {
                    return [2 /*return*/, false];
                }
                if (tx.status != 1) {
                    return [2 /*return*/, false];
                }
                log = tx.logs.filter(function (log) { return log.address == to_1; });
                if (!log || log.length == 0) {
                    return [2 /*return*/, false];
                }
                data = log[0].data.substr(2);
                if (data.length != 256) {
                    return [2 /*return*/, false];
                }
                idx = 24;
                from = "0x".concat(data.substr(idx, 40));
                idx += 64;
                tokenAddress = "0x".concat(data.substr(idx, 40));
                idx += 40;
                tokenAmountHex = "0x".concat(data.substr(idx, 64));
                idx += 64;
                amountHex = "0x".concat(data.substr(idx, 64));
                tokenAmount = 0;
                if (!(tokenAddress != constants_1.ZERO_ADDRESS)) return [3 /*break*/, 7];
                tokenContract = new ethers_1.Contract(tokenAddress, erc20_json_1.default, provider_2);
                return [4 /*yield*/, tokenContract.decimals()];
            case 6:
                decimals = _a.sent();
                tokenAmount = Number((0, utils_1.formatUnits)(tokenAmountHex, decimals));
                return [3 /*break*/, 8];
            case 7:
                tokenAmount = Number((0, utils_1.formatUnits)(tokenAmountHex, 18));
                _a.label = 8;
            case 8:
                amount = Number((0, utils_1.formatUnits)(amountHex, 9));
                return [2 /*return*/, {
                        hash: tx.transactionHash,
                        from: from,
                        tokenAddress: tokenAddress,
                        tokenAmount: tokenAmount,
                        amount: amount,
                    }];
            case 9:
                ex_2 = _a.sent();
                logger_1.default.error("getEvmTransaction - ".concat(txHash, " - ").concat(ex_2.toString()));
                return [2 /*return*/, null];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.getEvmTransaction = getEvmTransaction;
var getSolTransaction = function (txHash) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedTransactions, parsedTransaction, from, tokenAddress, isNative, tokenAmount, amount, ex_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                parsedTransactions = [];
                return [4 /*yield*/, parser.parseTransaction(connection, txHash, false)];
            case 1:
                parsedTransactions = _a.sent();
                if (!parsedTransactions || parsedTransactions.length == 0) {
                    return [2 /*return*/, null];
                }
                parsedTransaction = parsedTransactions[0];
                if (parsedTransaction.name != 'buy') {
                    return [2 /*return*/, false];
                }
                from = parsedTransaction.accounts.filter(function (account) { return account.name == 'buyer'; })[0].pubkey.toString();
                tokenAddress = parsedTransaction.accounts.filter(function (account) { return account.name == 'mint'; })[0].pubkey.toString();
                isNative = tokenAddress == spl_token_1.NATIVE_MINT.toString();
                tokenAmount = parsedTransaction.args.tokenAmount.toNumber() / Math.pow(10, isNative ? 9 : constants_1.USD_DECIMALS);
                amount = parsedTransaction.args.amount.toNumber() / Math.pow(10, constants_1.SERSH_DECIMALS);
                return [2 /*return*/, {
                        hash: txHash,
                        from: from,
                        tokenAddress: tokenAddress,
                        tokenAmount: tokenAmount,
                        amount: amount,
                    }];
            case 2:
                ex_3 = _a.sent();
                logger_1.default.error("getSolTransaction - ".concat(txHash, " - ").concat(ex_3.toString()));
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSolTransaction = getSolTransaction;
var findGlobalState = function () {
    var _a = (0, pubkey_1.findProgramAddressSync)([Buffer.from(constants_1.PREFIX)], constants_1.PRESALE_PROGRAM_ID), pubkey = _a[0], bump = _a[1];
    return pubkey;
};
exports.findGlobalState = findGlobalState;
var findSaleSate = function (authority) {
    var _a = (0, pubkey_1.findProgramAddressSync)([Buffer.from(constants_1.PREFIX), authority.toBuffer(), Buffer.from(constants_1.SALE)], constants_1.PRESALE_PROGRAM_ID), pubkey = _a[0], bump = _a[1];
    return pubkey;
};
exports.findSaleSate = findSaleSate;
//# sourceMappingURL=index.js.map