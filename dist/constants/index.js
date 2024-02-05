"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SALE = exports.VAULT = exports.PREFIX = exports.ZERO_ADDRESS = exports.PRICE_FEED_ADDRESS = exports.TOTAL_SUPPLY = exports.PRESALE_PRICE = exports.USD_DECIMALS = exports.SERSH_DECIMALS = exports.PRESALE_PROGRAM_ID = exports.SOL_RPC_URL = exports.SOL_VAULT_ADDRESS = exports.SOL_AUTHORITY_KEY = exports.EVM_AUTHORITY_KEY = exports.BSC_CONTRACT_ADDR = exports.BSC_CHAIN_ID = exports.BSC_RPC_URL = exports.ETH_CONTRACT_ADDR = exports.ETH_CHAIN_ID = exports.ETH_RPC_URL = exports.MAIN_RPC_URL = exports.SOL_CHAIN = exports.BSC_CHAIN = exports.ETH_CHAIN = void 0;
var bytes_1 = require("@project-serum/anchor/dist/cjs/utils/bytes");
var web3_js_1 = require("@solana/web3.js");
exports.ETH_CHAIN = 1;
exports.BSC_CHAIN = 2;
exports.SOL_CHAIN = 3;
exports.MAIN_RPC_URL = process.env.MAIN_RPC_URL;
exports.ETH_RPC_URL = process.env.ETH_RPC_URL;
exports.ETH_CHAIN_ID = Number(process.env.ETH_CHAIN_ID);
exports.ETH_CONTRACT_ADDR = process.env.ETH_CONTRACT_ADDR;
exports.BSC_RPC_URL = process.env.BSC_RPC_URL;
exports.BSC_CHAIN_ID = Number(process.env.BSC_CHAIN_ID);
exports.BSC_CONTRACT_ADDR = process.env.BSC_CONTRACT_ADDR;
exports.EVM_AUTHORITY_KEY = process.env.EVM_AUTHORITY_KEY;
exports.SOL_AUTHORITY_KEY = web3_js_1.Keypair.fromSecretKey(bytes_1.bs58.decode(process.env.SOL_AUTHORITY_KEY));
exports.SOL_VAULT_ADDRESS = new web3_js_1.PublicKey(process.env.SOL_VAULT_ADDRESS);
exports.SOL_RPC_URL = process.env.SOL_RPC_URL;
exports.PRESALE_PROGRAM_ID = new web3_js_1.PublicKey(process.env.PRESALE_PROGRAM_ID);
exports.SERSH_DECIMALS = Number(process.env.SERSH_DECIMALS);
exports.USD_DECIMALS = Number(process.env.USD_DECIMALS);
exports.PRESALE_PRICE = Number(process.env.PRESALE_PRICE);
exports.TOTAL_SUPPLY = Number(process.env.TOTAL_SUPPLY);
exports.PRICE_FEED_ADDRESS = (_a = {},
    _a[exports.ETH_CHAIN] = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    _a[exports.BSC_CHAIN] = "0x14e613AC84a31f709eadbdF89C6CC390fDc9540A",
    _a[exports.SOL_CHAIN] = "0x4ffC43a60e009B551865A93d232E33Fce9f01507",
    _a);
exports.ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
exports.PREFIX = 'SOLMATE';
exports.VAULT = 'VAULT';
exports.SALE = 'SALE';
//# sourceMappingURL=index.js.map