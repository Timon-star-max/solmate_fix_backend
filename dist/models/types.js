"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionType = exports.StatusType = void 0;
var StatusType;
(function (StatusType) {
    StatusType[StatusType["Pending"] = 0] = "Pending";
    StatusType[StatusType["Successed"] = 1] = "Successed";
    StatusType[StatusType["Failed"] = 2] = "Failed";
})(StatusType = exports.StatusType || (exports.StatusType = {}));
var TransactionType;
(function (TransactionType) {
    TransactionType[TransactionType["Presale"] = 0] = "Presale";
    TransactionType[TransactionType["Withdraw"] = 1] = "Withdraw";
    TransactionType[TransactionType["Other"] = 2] = "Other";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
//# sourceMappingURL=types.js.map