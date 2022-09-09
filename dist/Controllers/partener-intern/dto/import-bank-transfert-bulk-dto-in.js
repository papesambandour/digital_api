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
exports.ImportBankTransfertBulkDtoOut = exports.ImportBankTransfertBulkDtoIn = void 0;
const swagger_1 = require("@nestjs/swagger");
class ImportBankTransfertBulkDtoIn {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], ImportBankTransfertBulkDtoIn.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ImportBankTransfertBulkDtoIn.prototype, "statut", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ImportBankTransfertBulkDtoIn.prototype, "message", void 0);
exports.ImportBankTransfertBulkDtoIn = ImportBankTransfertBulkDtoIn;
class ImportBankTransfertBulkDtoOut extends ImportBankTransfertBulkDtoIn {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ImportBankTransfertBulkDtoOut.prototype, "statutTreatment", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ImportBankTransfertBulkDtoOut.prototype, "messageTreatment", void 0);
exports.ImportBankTransfertBulkDtoOut = ImportBankTransfertBulkDtoOut;
//# sourceMappingURL=import-bank-transfert-bulk-dto-in.js.map