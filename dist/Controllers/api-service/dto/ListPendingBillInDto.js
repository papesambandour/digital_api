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
exports.ListPendingBillInDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
class ListPendingBillInDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty({
        message: "L'API KEY Url est requis",
    }),
    __metadata("design:type", String)
], ListPendingBillInDto.prototype, "apiKey", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty({
        message: 'Le code service est requis',
    }),
    __metadata("design:type", String)
], ListPendingBillInDto.prototype, "codeService", void 0);
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.ValidateIf((object) => [Enum_entity_1.SOUS_SERVICE_ENUM.SENEAU_SN_BILL_PAY].includes(object['codeService'])),
    class_validator_1.Length(5, 20, {
        message: 'seneauCustomerReference doit être un string composé de minimum 5 et maximum 20 chiffres',
    }),
    __metadata("design:type", String)
], ListPendingBillInDto.prototype, "billAccountNumber", void 0);
exports.ListPendingBillInDto = ListPendingBillInDto;
//# sourceMappingURL=ListPendingBillInDto.js.map