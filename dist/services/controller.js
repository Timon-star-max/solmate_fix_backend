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
exports.processSOL = exports.processEVM = exports.requestSOL = exports.generateSignature = exports.getPurchaseInfo = exports.getMyTokenSaleInfo = exports.getPresaleInfo = void 0;
var providers_1 = require("@ethersproject/providers");
var ethers_1 = require("ethers");
var web3_js_1 = require("@solana/web3.js");
var anchor = __importStar(require("@project-serum/anchor"));
var anchor_1 = require("@project-serum/anchor");
var constants_1 = require("../constants");
var presale_json_1 = __importDefault(require("../constants/presale.json"));
var erc20_json_1 = __importDefault(require("../constants/erc20.json"));
var utils_1 = require("../utils");
var logger_1 = __importDefault(require("../utils/logger"));
var typeorm_1 = require("typeorm");
var Transactions_1 = require("../entity/Transactions");
var types_1 = require("../models/types");
var utils_2 = require("ethers/lib/utils");
var buy_1 = require("../actions/buy");
var bn_js_1 = require("bn.js");
var presale_idl_1 = require("../constants/presale_idl");
var spl_token_1 = require("@solana/spl-token");
var getPresaleInfo = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var transactionRepo, transactions, currentSupply, _i, transactions_1, transaction;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    transactionRepo = (0, typeorm_1.getRepository)(Transactions_1.Transactions);
                    return [4 /*yield*/, transactionRepo.find({
                            status: types_1.StatusType.Successed
                        })];
                case 1:
                    transactions = _a.sent();
                    currentSupply = 0;
                    for (_i = 0, transactions_1 = transactions; _i < transactions_1.length; _i++) {
                        transaction = transactions_1[_i];
                        currentSupply += transaction.amount;
                    }
                    return [2 /*return*/, res.status(200)
                            .json({
                            price: constants_1.PRESALE_PRICE,
                            totalSupply: constants_1.TOTAL_SUPPLY,
                            currentSupply: currentSupply
                        })];
            }
        });
    });
};
exports.getPresaleInfo = getPresaleInfo;
var getMyTokenSaleInfo = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var myWalletAddress, transactionRepo, myTransactions, amountSolMate, amountETH, amountBNB, amountSOL, amountStables;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    myWalletAddress = req.params.walletaddress;
                    transactionRepo = (0, typeorm_1.getRepository)(Transactions_1.Transactions);
                    return [4 /*yield*/, transactionRepo.find({
                            from: myWalletAddress,
                            status: types_1.StatusType.Successed
                        })];
                case 1:
                    myTransactions = _a.sent();
                    amountStables = 0;
                    return [4 /*yield*/, myTransactions.map(function (el) {
                            if (el.chain_id == constants_1.ETH_CHAIN_ID && el.token_address == constants_1.ZERO_ADDRESS) {
                                amountSolMate = amountSolMate + el.amount;
                                amountETH = amountETH + el.token_amount;
                            }
                            if (el.chain_id == constants_1.BSC_CHAIN_ID && el.token_address == constants_1.ZERO_ADDRESS) {
                                amountSolMate = amountSolMate + el.amount;
                                amountBNB = amountBNB + el.token_amount;
                            }
                            if (el.chain_id == constants_1.SOL_CHAIN && el.token_address == constants_1.ZERO_ADDRESS) {
                                amountSolMate = amountSolMate + el.amount;
                                amountSOL = amountSOL + el.token_amount;
                            }
                            if (el.token_address != constants_1.ZERO_ADDRESS) {
                                amountSolMate = amountSolMate + el.amount;
                                amountStables = amountStables + el.token_amount;
                            }
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, res.status(200)
                            .json({
                            amountSolMate: amountSolMate,
                            amountETH: amountETH,
                            amountBNB: amountBNB,
                            amountSOL: amountSOL,
                            amountStables: amountStables,
                            myTransactions: myTransactions
                        })];
            }
        });
    });
};
exports.getMyTokenSaleInfo = getMyTokenSaleInfo;
var getPurchaseInfo = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var transactionRepo, transactions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    transactionRepo = (0, typeorm_1.getRepository)(Transactions_1.Transactions);
                    return [4 /*yield*/, transactionRepo.find({
                            status: types_1.StatusType.Successed
                        })];
                case 1:
                    transactions = _a.sent();
                    return [2 /*return*/, res.status(200)
                            .json(transactions)];
            }
        });
    });
};
exports.getPurchaseInfo = getPurchaseInfo;
var generateSignature = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var chain, from, tokenAddress, _amount, chainId, presaleAddress, domainData, provider, presaleContract, nonce, deadline, amount, tokenAmount, usdPrice, tokenContract, tokenDecimals, message, signer, signature, ex_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    chain = req.body.chain;
                    from = req.body.from;
                    tokenAddress = req.body.token_address;
                    _amount = Number.parseFloat(req.body.amount);
                    if (chain != constants_1.ETH_CHAIN
                        && chain != constants_1.BSC_CHAIN
                        && chain != constants_1.SOL_CHAIN) {
                        return [2 /*return*/, res.status(500)
                                .json({
                                error: 'Invalid chain'
                            })];
                    }
                    chainId = chain === constants_1.ETH_CHAIN ? constants_1.ETH_CHAIN_ID :
                        (chain === constants_1.BSC_CHAIN ? constants_1.BSC_CHAIN_ID : null);
                    presaleAddress = (0, utils_1.getContractAddress)(chainId);
                    domainData = {
                        name: "SolmatePresale",
                        version: "1.0.0",
                        chainId: chainId,
                        verifyingContract: presaleAddress,
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    provider = new providers_1.JsonRpcProvider((0, utils_1.getRpcUrl)(chainId));
                    presaleContract = new ethers_1.Contract(presaleAddress, presale_json_1.default, provider);
                    return [4 /*yield*/, presaleContract.getNonce(from)];
                case 2:
                    nonce = (_a.sent()).toNumber();
                    deadline = Math.ceil(Date.now() / 1000) + 60 * 5;
                    amount = ethers_1.ethers.utils.parseUnits(_amount.toFixed(constants_1.SERSH_DECIMALS), constants_1.SERSH_DECIMALS);
                    tokenAmount = void 0;
                    if (!(tokenAddress == constants_1.ZERO_ADDRESS)) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, utils_1.getUsdPrice)(chain)];
                case 3:
                    usdPrice = _a.sent();
                    if (!usdPrice) {
                        return [2 /*return*/, res.status(500)
                                .json({
                                error: "Get error while generate signature. Please try again later."
                            })];
                    }
                    tokenAmount = ethers_1.ethers.utils.parseEther((_amount / constants_1.PRESALE_PRICE / usdPrice).toFixed(18));
                    return [3 /*break*/, 6];
                case 4:
                    tokenContract = new ethers_1.Contract(tokenAddress, erc20_json_1.default, provider);
                    return [4 /*yield*/, tokenContract.decimals()];
                case 5:
                    tokenDecimals = _a.sent();
                    tokenAmount = ethers_1.ethers.utils.parseUnits((_amount / constants_1.PRESALE_PRICE).toFixed(tokenDecimals), tokenDecimals);
                    _a.label = 6;
                case 6:
                    message = {
                        from: from,
                        tokenAddress: tokenAddress,
                        tokenAmount: tokenAmount,
                        amount: amount,
                        deadline: deadline,
                        nonce: nonce
                    };
                    signer = new ethers_1.Wallet(constants_1.EVM_AUTHORITY_KEY, provider);
                    return [4 /*yield*/, signer._signTypedData(domainData, utils_1.depositFunc, message)];
                case 7:
                    signature = _a.sent();
                    return [2 /*return*/, res.status(200)
                            .json({
                            amount: amount,
                            tokenAmount: tokenAmount,
                            signature: signature,
                            deadline: deadline
                        })];
                case 8:
                    ex_1 = _a.sent();
                    logger_1.default.error("Generate signature - ".concat(ex_1));
                    return [2 /*return*/, res.status(500)
                            .json({
                            error: ex_1.toString()
                        })];
                case 9: return [2 /*return*/];
            }
        });
    });
};
exports.generateSignature = generateSignature;
var requestSOL = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, provider, program, buyer, mint, _amount, amount, tokenAmount, usdPrice, buyIx, blockhash, buyTx, serializeTx, encodedTx, ex_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    connection = new web3_js_1.Connection(constants_1.SOL_RPC_URL);
                    provider = new anchor.AnchorProvider(connection, new anchor.Wallet(web3_js_1.Keypair.generate()), { commitment: 'confirmed' });
                    program = new anchor_1.Program(presale_idl_1.IDL, constants_1.PRESALE_PROGRAM_ID, provider);
                    buyer = new web3_js_1.PublicKey(req.body.from);
                    mint = new web3_js_1.PublicKey(req.body.tokenAddress);
                    _amount = Number.parseFloat(req.body.amount);
                    amount = ethers_1.ethers.utils.parseUnits(_amount.toFixed(constants_1.SERSH_DECIMALS), constants_1.SERSH_DECIMALS);
                    tokenAmount = void 0;
                    if (!mint.equals(spl_token_1.NATIVE_MINT)) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, utils_1.getUsdPrice)(constants_1.SOL_CHAIN)];
                case 1:
                    usdPrice = _a.sent();
                    if (!usdPrice) {
                        return [2 /*return*/, res.status(500)
                                .json({
                                error: "Get error while generate trasnaction. Please try again later."
                            })];
                    }
                    tokenAmount = ethers_1.ethers.utils.parseUnits((_amount / constants_1.PRESALE_PRICE / usdPrice).toFixed(9), 9);
                    return [3 /*break*/, 3];
                case 2:
                    tokenAmount = ethers_1.ethers.utils.parseUnits((_amount / constants_1.PRESALE_PRICE).toFixed(6), 6);
                    _a.label = 3;
                case 3: return [4 /*yield*/, (0, buy_1.buy)(program, constants_1.SOL_AUTHORITY_KEY.publicKey, buyer, mint, constants_1.SOL_VAULT_ADDRESS, new bn_js_1.BN(amount.toString()), new bn_js_1.BN(tokenAmount.toString()))];
                case 4:
                    buyIx = _a.sent();
                    return [4 /*yield*/, provider.connection.getLatestBlockhash("finalized")];
                case 5:
                    blockhash = (_a.sent()).blockhash;
                    buyTx = new anchor.web3.Transaction({
                        recentBlockhash: blockhash,
                        feePayer: buyer
                    });
                    buyTx.add(buyIx);
                    // Sign with authority pubkey in BE
                    buyTx.partialSign(constants_1.SOL_AUTHORITY_KEY);
                    serializeTx = buyTx.serialize({
                        requireAllSignatures: false
                    });
                    encodedTx = utils_2.base64.encode(serializeTx);
                    return [2 /*return*/, res.status(200)
                            .json({
                            tx: encodedTx
                        })];
                case 6:
                    ex_2 = _a.sent();
                    logger_1.default.error("Request SOL transaction - ".concat(ex_2));
                    return [2 /*return*/, res.status(500)
                            .json({
                            error: ex_2.toString()
                        })];
                case 7: return [2 /*return*/];
            }
        });
    });
};
exports.requestSOL = requestSOL;
var processEVM = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var chain, tx_hash, chainId, transRepo, existRecord, record, ex_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    chain = req.body.chain;
                    tx_hash = req.body.tx_hash;
                    if (chain != constants_1.ETH_CHAIN
                        && chain != constants_1.BSC_CHAIN) {
                        return [2 /*return*/, res.status(500)
                                .json({
                                error: 'Invalid chain'
                            })];
                    }
                    chainId = chain === constants_1.ETH_CHAIN ? constants_1.ETH_CHAIN_ID :
                        (chain === constants_1.BSC_CHAIN ? constants_1.BSC_CHAIN_ID : null);
                    transRepo = (0, typeorm_1.getRepository)(Transactions_1.Transactions);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, transRepo.findOne({
                            tx_hash: tx_hash
                        })];
                case 2:
                    existRecord = _a.sent();
                    if (existRecord) {
                        return [2 /*return*/, res.status(400)
                                .json({
                                error: 'Already requested transaction.'
                            })];
                    }
                    return [4 /*yield*/, (0, utils_1.getEvmTransaction)(chainId, tx_hash)];
                case 3:
                    record = _a.sent();
                    if (!record) return [3 /*break*/, 5];
                    return [4 /*yield*/, transRepo.save(transRepo.create({
                            tx_hash: tx_hash,
                            chain_id: chain,
                            from: record.from,
                            token_address: record.tokenAddress,
                            token_amount: record.tokenAmount,
                            amount: record.amount,
                            status: types_1.StatusType.Successed
                        }))];
                case 4:
                    _a.sent();
                    logger_1.default.info("Processing EVM - ".concat(tx_hash, " - ").concat(record.amount, " Solmate purchased}"));
                    return [2 /*return*/, res.status(200)
                            .json({
                            msg: 'Request has been approved'
                        })];
                case 5:
                    logger_1.default.error("Processing EVM - ".concat(tx_hash));
                    return [2 /*return*/, res.status(500)
                            .json({
                            error: 'Unknown request'
                        })];
                case 6: return [3 /*break*/, 8];
                case 7:
                    ex_3 = _a.sent();
                    logger_1.default.error("Processing EVM - ".concat(tx_hash, " - ").concat(ex_3));
                    return [2 /*return*/, res.status(500)
                            .json({
                            error: ex_3.toString()
                        })];
                case 8: return [2 /*return*/];
            }
        });
    });
};
exports.processEVM = processEVM;
var processSOL = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var tx_hash, transRepo, existRecord, record, ex_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tx_hash = req.body.tx_hash;
                    transRepo = (0, typeorm_1.getRepository)(Transactions_1.Transactions);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, transRepo.findOne({
                            tx_hash: tx_hash
                        })];
                case 2:
                    existRecord = _a.sent();
                    if (existRecord) {
                        return [2 /*return*/, res.status(400)
                                .json({
                                error: 'Already requested transaction.'
                            })];
                    }
                    return [4 /*yield*/, (0, utils_1.getSolTransaction)(tx_hash)];
                case 3:
                    record = _a.sent();
                    if (!record) return [3 /*break*/, 5];
                    return [4 /*yield*/, transRepo.save(transRepo.create({
                            tx_hash: tx_hash,
                            chain_id: constants_1.SOL_CHAIN,
                            from: record.from,
                            token_address: record.tokenAddress,
                            token_amount: record.tokenAmount,
                            amount: record.amount,
                            status: types_1.StatusType.Successed
                        }))];
                case 4:
                    _a.sent();
                    logger_1.default.info("Processing SOL - ".concat(tx_hash, " - ").concat(record.amount, " Solmate purchased}"));
                    return [2 /*return*/, res.status(200)
                            .json({
                            msg: 'Request has been approved'
                        })];
                case 5:
                    logger_1.default.error("Processing SOL - ".concat(tx_hash, "}"));
                    return [2 /*return*/, res.status(500)
                            .json({
                            error: 'Unknown request'
                        })];
                case 6: return [3 /*break*/, 8];
                case 7:
                    ex_4 = _a.sent();
                    logger_1.default.error("Processing SOL - ".concat(tx_hash, "} - ").concat(ex_4));
                    return [2 /*return*/, res.status(500)
                            .json({
                            error: ex_4.toString()
                        })];
                case 8: return [2 /*return*/];
            }
        });
    });
};
exports.processSOL = processSOL;
//# sourceMappingURL=controller.js.map