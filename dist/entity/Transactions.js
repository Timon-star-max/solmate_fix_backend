"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactions = void 0;
var typeorm_1 = require("typeorm");
var types_1 = require("../models/types");
var Transactions = /** @class */ (function () {
    function Transactions() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Transactions.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Transactions.prototype, "chain_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            unique: true
        }),
        __metadata("design:type", String)
    ], Transactions.prototype, "tx_hash", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Transactions.prototype, "from", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Transactions.prototype, "token_address", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'double',
        }),
        __metadata("design:type", Number)
    ], Transactions.prototype, "token_amount", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'double',
        }),
        __metadata("design:type", Number)
    ], Transactions.prototype, "amount", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            default: types_1.StatusType.Pending
        }),
        __metadata("design:type", Number)
    ], Transactions.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Transactions.prototype, "create_date", void 0);
    Transactions = __decorate([
        (0, typeorm_1.Entity)()
    ], Transactions);
    return Transactions;
}());
exports.Transactions = Transactions;
//# sourceMappingURL=Transactions.js.map