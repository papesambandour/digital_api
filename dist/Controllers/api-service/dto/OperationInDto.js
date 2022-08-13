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
exports.OperationInDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class OperationInDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty({
        message: 'Le numero de téléphone est requis',
    }),
    __metadata("design:type", String)
], OperationInDto.prototype, "phone", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty({
        message: 'Le montant est requis',
    }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], OperationInDto.prototype, "amount", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty({
        message: 'Le code service est requis',
    }),
    __metadata("design:type", String)
], OperationInDto.prototype, "codeService", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty({
        message: 'Le external transaction id  est requis',
    }),
    __metadata("design:type", String)
], OperationInDto.prototype, "externalTransactionId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty({
        message: 'Le Callback Url est requis',
    }),
    __metadata("design:type", String)
], OperationInDto.prototype, "callbackUrl", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], OperationInDto.prototype, "data", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty({
        message: "L'API KEY Url est requis",
    }),
    __metadata("design:type", String)
], OperationInDto.prototype, "apiKey", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString({
        message: 'Le sender doit être un un string',
    }),
    __metadata("design:type", String)
], OperationInDto.prototype, "sender", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUrl({}, {
        message: 'successRedirectUrl doit être un URL',
    }),
    __metadata("design:type", String)
], OperationInDto.prototype, "successRedirectUrl", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsUrl({}, {
        message: 'errorRedirectUrl doit être un URL',
    }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], OperationInDto.prototype, "errorRedirectUrl", void 0);
exports.OperationInDto = OperationInDto;
//# sourceMappingURL=OperationInDto.js.map