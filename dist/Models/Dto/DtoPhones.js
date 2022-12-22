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
exports.DtoPhones = void 0;
const swagger_1 = require("@nestjs/swagger");
class DtoPhones {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoPhones.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoPhones.prototype, "soldeApi", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoPhones.prototype, "solde", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoPhones.prototype, "number", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoPhones.prototype, "uid", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoPhones.prototype, "imei", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoPhones.prototype, "lgd", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoPhones.prototype, "ltd", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoPhones.prototype, "pin", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoPhones.prototype, "codeSecret", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoPhones.prototype, "state", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Date)
], DtoPhones.prototype, "createdAt", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Date)
], DtoPhones.prototype, "updatedAt", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoPhones.prototype, "socket", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoPhones.prototype, "amountReserved", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoPhones.prototype, "maxSolde", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoPhones.prototype, "alertLevel_1Solde", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoPhones.prototype, "alertLevel_2Solde", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoPhones.prototype, "alertLevel_3Solde", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoPhones.prototype, "alertLevel_4Solde", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoPhones.prototype, "alertLevel_5Solde", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoPhones.prototype, "servicesId", void 0);
exports.DtoPhones = DtoPhones;
//# sourceMappingURL=DtoPhones.js.map