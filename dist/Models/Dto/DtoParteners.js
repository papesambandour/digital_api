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
exports.DtoParteners = void 0;
const swagger_1 = require("@nestjs/swagger");
class DtoParteners {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoParteners.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Date)
], DtoParteners.prototype, "createdAt", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Date)
], DtoParteners.prototype, "updatedAt", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoParteners.prototype, "state", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoParteners.prototype, "solde", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoParteners.prototype, "amountReserved", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoParteners.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoParteners.prototype, "phone", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoParteners.prototype, "email", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoParteners.prototype, "adress", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoParteners.prototype, "password", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoParteners.prototype, "firstConnection", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Date)
], DtoParteners.prototype, "passwordExpired", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoParteners.prototype, "passwordDurationDay", void 0);
exports.DtoParteners = DtoParteners;
//# sourceMappingURL=DtoParteners.js.map