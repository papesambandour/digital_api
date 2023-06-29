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
exports.DtoGetTransactionStatusOut = exports.DtoGetTransactionStatusIn = void 0;
const swagger_1 = require("@nestjs/swagger");
class DtoGetTransactionStatusIn {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoGetTransactionStatusIn.prototype, "externalTransactionId", void 0);
exports.DtoGetTransactionStatusIn = DtoGetTransactionStatusIn;
class DtoGetTransactionStatusOut {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoGetTransactionStatusOut.prototype, "externalTransactionId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoGetTransactionStatusOut.prototype, "status", void 0);
exports.DtoGetTransactionStatusOut = DtoGetTransactionStatusOut;
//# sourceMappingURL=DtoGetTransactionStatus.js.map