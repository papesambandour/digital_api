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
exports.DtoSousServices = void 0;
const swagger_1 = require("@nestjs/swagger");
class DtoSousServices {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoSousServices.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoSousServices.prototype, "needPhone", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoSousServices.prototype, "hasSoldeApi", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoSousServices.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoSousServices.prototype, "ussdCode", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoSousServices.prototype, "regexMessageValidation", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoSousServices.prototype, "message_retour_ussd", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoSousServices.prototype, "regexPhone", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoSousServices.prototype, "positionValidationIndex", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoSousServices.prototype, "validLength", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoSousServices.prototype, "icon", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoSousServices.prototype, "code", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoSousServices.prototype, "state", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Date)
], DtoSousServices.prototype, "createdAt", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Date)
], DtoSousServices.prototype, "updatedAt", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoSousServices.prototype, "maxLimitTransaction", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoSousServices.prototype, "maxLimitDay", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoSousServices.prototype, "maxLimitWeek", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoSousServices.prototype, "maxLimitMonth", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoSousServices.prototype, "maxLimitTrimest", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoSousServices.prototype, "typeOperation", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoSousServices.prototype, "servicesId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoSousServices.prototype, "typeServicesId", void 0);
exports.DtoSousServices = DtoSousServices;
//# sourceMappingURL=DtoSousServices.js.map