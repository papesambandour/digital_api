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
exports.DtoServices = void 0;
const swagger_1 = require("@nestjs/swagger");
class DtoServices {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoServices.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoServices.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoServices.prototype, "icon", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoServices.prototype, "code", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoServices.prototype, "state", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Date)
], DtoServices.prototype, "createdAt", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Date)
], DtoServices.prototype, "updatedAt", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoServices.prototype, "operatorsId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoServices.prototype, "accecptePhone", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoServices.prototype, "solde", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoServices.prototype, "amountReserved", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoServices.prototype, "alertLevel_1Solde", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoServices.prototype, "alertLevel_2Solde", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoServices.prototype, "alertLevel_3Solde", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoServices.prototype, "alertLevel_4Solde", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoServices.prototype, "alertLevel_5Solde", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoServices.prototype, "categoriesServicesId", void 0);
exports.DtoServices = DtoServices;
//# sourceMappingURL=DtoServices.js.map