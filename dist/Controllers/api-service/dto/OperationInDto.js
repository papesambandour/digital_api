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
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
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
    class_validator_1.ValidateIf((object) => ![Enum_entity_1.SOUS_SERVICE_ENUM.WHATSAPP_MESSAGING].includes(object['codeService'])),
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
    class_validator_1.IsString({
        message: 'Le sender doit être un un string',
    }),
    class_validator_1.ValidateIf((object) => [
        Enum_entity_1.SOUS_SERVICE_ENUM.WAVE_SN_API_CASH_OUT,
        Enum_entity_1.SOUS_SERVICE_ENUM.WAVE_SN_API_CASH_IN,
    ].includes(object['codeService'])),
    __metadata("design:type", String)
], OperationInDto.prototype, "sender", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsUrl({}, {
        message: 'successRedirectUrl doit être un URL',
    }),
    class_validator_1.ValidateIf((object) => [
        Enum_entity_1.SOUS_SERVICE_ENUM.WAVE_SN_API_CASH_OUT,
        Enum_entity_1.SOUS_SERVICE_ENUM.BANK_CARD_API_CASH_OUT,
    ].includes(object['codeService'])),
    __metadata("design:type", String)
], OperationInDto.prototype, "successRedirectUrl", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsUrl({}, {
        message: 'errorRedirectUrl doit être un URL',
    }),
    class_validator_1.ValidateIf((object) => [
        Enum_entity_1.SOUS_SERVICE_ENUM.WAVE_SN_API_CASH_OUT,
        Enum_entity_1.SOUS_SERVICE_ENUM.BANK_CARD_API_CASH_OUT,
    ].includes(object['codeService'])),
    __metadata("design:type", String)
], OperationInDto.prototype, "errorRedirectUrl", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsAlpha(),
    class_validator_1.ValidateIf((object) => [Enum_entity_1.SOUS_SERVICE_ENUM.BANK_CARD_API_CASH_OUT].includes(object['codeService'])),
    __metadata("design:type", String)
], OperationInDto.prototype, "customerFirstName", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsAlpha(),
    class_validator_1.ValidateIf((object) => [Enum_entity_1.SOUS_SERVICE_ENUM.BANK_CARD_API_CASH_OUT].includes(object['codeService'])),
    __metadata("design:type", String)
], OperationInDto.prototype, "customerLastName", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsEmail({}, {
        message: 'customerEmail doit être un email',
    }),
    __metadata("design:type", String)
], OperationInDto.prototype, "customerEmail", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsCreditCard({
        message: 'cardNumber doit être un numéro de carte valide',
    }),
    class_validator_1.ValidateIf((object) => [Enum_entity_1.SOUS_SERVICE_ENUM.BANK_CARD_API_CASH_OUT].includes(object['codeService'])),
    __metadata("design:type", String)
], OperationInDto.prototype, "cardNumber", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNumberString({}, {
        message: 'cardExpireMonth doit être un string composé de deux chiffre',
    }),
    class_validator_1.Length(2, 2, {
        message: 'cardExpireMonth doit être un string composé de deux chiffre',
    }),
    class_validator_1.ValidateIf((object) => [Enum_entity_1.SOUS_SERVICE_ENUM.BANK_CARD_API_CASH_OUT].includes(object['codeService'])),
    __metadata("design:type", String)
], OperationInDto.prototype, "cardExpireMonth", void 0);
__decorate([
    class_validator_1.IsNumberString({}, {
        message: 'cardExpireYear doit être un string composé de deux chiffre',
    }),
    class_validator_1.Length(2, 2, {
        message: 'cardExpireYear doit être un string composé de deux chiffre',
    }),
    class_validator_1.ValidateIf((object) => [Enum_entity_1.SOUS_SERVICE_ENUM.BANK_CARD_API_CASH_OUT].includes(object['codeService'])),
    __metadata("design:type", String)
], OperationInDto.prototype, "cardExpireYear", void 0);
__decorate([
    class_validator_1.IsNumberString({}, {
        message: 'cardCVC doit être un string composé de trois chiffre',
    }),
    class_validator_1.Length(3, 3, {
        message: 'cardCVC doit être un string composé de trois chiffre',
    }),
    class_validator_1.ValidateIf((object) => [Enum_entity_1.SOUS_SERVICE_ENUM.BANK_CARD_API_CASH_OUT].includes(object['codeService'])),
    __metadata("design:type", String)
], OperationInDto.prototype, "cardCVC", void 0);
__decorate([
    class_validator_1.IsIn(['VISA', 'MASTERCARD', 'VISA_ELECTRON'], {
        message: `cardType doit avoir une des ses valeurs: ${[
            'VISA',
            'MASTERCARD',
            'VISA_ELECTRON',
        ].join(',')}`,
    }),
    class_validator_1.ValidateIf((object) => [Enum_entity_1.SOUS_SERVICE_ENUM.BANK_CARD_API_CASH_OUT].includes(object['codeService'])),
    __metadata("design:type", String)
], OperationInDto.prototype, "cardType", void 0);
__decorate([
    class_validator_1.IsAlpha(),
    class_validator_1.ValidateIf((object) => [Enum_entity_1.SOUS_SERVICE_ENUM.BANK_CARD_API_CASH_OUT].includes(object['codeService'])),
    class_validator_1.Length(3, 15, {
        message: 'merchantName doit être un string composé de maximum 15 caractères',
    }),
    __metadata("design:type", String)
], OperationInDto.prototype, "merchantName", void 0);
__decorate([
    class_validator_1.IsNumberString(null, {
        message: 'merchantCode doit être un string composé de chiffre',
    }),
    class_validator_1.IsOptional({}),
    __metadata("design:type", String)
], OperationInDto.prototype, "merchantCatCode", void 0);
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.ValidateIf((object) => [
        Enum_entity_1.SOUS_SERVICE_ENUM.SENEAU_SN_BILL_PAY,
        Enum_entity_1.SOUS_SERVICE_ENUM.SENELEC_SN_BILL_PAY,
        Enum_entity_1.SOUS_SERVICE_ENUM.AQUATECH_SN_BILL_PAY,
        Enum_entity_1.SOUS_SERVICE_ENUM.UVS_SN_BILL_PAY,
        Enum_entity_1.SOUS_SERVICE_ENUM.UCAD_SN_BILL_PAY,
        Enum_entity_1.SOUS_SERVICE_ENUM.CAMPUS_SN_BILL_PAY,
    ].includes(object['codeService'])),
    class_validator_1.Length(5, 20, {
        message: 'invoiceReference doit être un string composé de minimum 5 et maximum 20 chiffres',
    }),
    __metadata("design:type", String)
], OperationInDto.prototype, "billReference", void 0);
__decorate([
    class_validator_1.IsAlphanumeric(),
    class_validator_1.ValidateIf((object) => [
        Enum_entity_1.SOUS_SERVICE_ENUM.SENEAU_SN_BILL_PAY,
        Enum_entity_1.SOUS_SERVICE_ENUM.SENELEC_SN_BILL_PAY,
        Enum_entity_1.SOUS_SERVICE_ENUM.RAPIDO_SN_BILL_RELOAD,
        Enum_entity_1.SOUS_SERVICE_ENUM.WOYOFAL_SN_BILL_RELOAD,
        Enum_entity_1.SOUS_SERVICE_ENUM.XEWEUL_SN_BILL_RELOAD,
        Enum_entity_1.SOUS_SERVICE_ENUM.AQUATECH_SN_BILL_PAY,
        Enum_entity_1.SOUS_SERVICE_ENUM.OOLUSOLAR_SN_BILL_RELOAD,
        Enum_entity_1.SOUS_SERVICE_ENUM.BAOBAP_PLUS_SN_BILL_RELOAD,
        Enum_entity_1.SOUS_SERVICE_ENUM.UVS_SN_BILL_PAY,
        Enum_entity_1.SOUS_SERVICE_ENUM.UCAD_SN_BILL_PAY,
        Enum_entity_1.SOUS_SERVICE_ENUM.DER_FJ_SN_BILL_RELOAD,
        Enum_entity_1.SOUS_SERVICE_ENUM.CAMPUS_SN_BILL_PAY,
    ].includes(object['codeService'])),
    class_validator_1.Length(8, 20, {
        message: 'billAccountNumber doit être un string composé de minimum 5 et maximum 20 caractères',
    }),
    __metadata("design:type", String)
], OperationInDto.prototype, "billAccountNumber", void 0);
__decorate([
    class_validator_1.IsDateString(),
    class_validator_1.ValidateIf((object) => [Enum_entity_1.SOUS_SERVICE_ENUM.CAMPUS_SN_BILL_PAY].includes(object['codeService'])),
    class_validator_1.Length(10, 10, {
        message: 'birthday doit être  une date sous le format DAY/MONTH/YEAR (02/05/2022)',
    }),
    __metadata("design:type", String)
], OperationInDto.prototype, "birthday", void 0);
__decorate([
    class_validator_1.IsString({
        message: 'message  est requis pour ce service',
    }),
    class_validator_1.ValidateIf((object) => [Enum_entity_1.SOUS_SERVICE_ENUM.WHATSAPP_MESSAGING].includes(object['codeService'])),
    __metadata("design:type", String)
], OperationInDto.prototype, "message", void 0);
__decorate([
    class_validator_1.IsString({
        message: 'attachedMedia  est requis pour ce service',
    }),
    class_validator_1.IsBase64({
        message: 'attachedMedia doit être une chaine en base64 valide',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.ValidateIf((object) => [Enum_entity_1.SOUS_SERVICE_ENUM.WHATSAPP_MESSAGING].includes(object['codeService'])),
    __metadata("design:type", String)
], OperationInDto.prototype, "attachedMedia", void 0);
__decorate([
    class_validator_1.IsString({
        message: 'attachedMediaName doit être un string',
    }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], OperationInDto.prototype, "attachedMediaName", void 0);
__decorate([
    class_validator_1.IsString({
        message: 'attachedMediaExtension  est requis  pour ce service attachedMediaName !== null ',
    }),
    class_validator_1.ValidateIf((object) => [Enum_entity_1.SOUS_SERVICE_ENUM.WHATSAPP_MESSAGING].includes(object['codeService']) &&
        object['attachedMedia']),
    class_validator_1.Length(2, 10, {
        message: 'attachedMediaExtension doit être sous ce format ex: .mp4.',
    }),
    class_validator_1.Contains('.', {
        message: 'attachedMediaExtension doit être sous ce format ex: .mp4',
    }),
    __metadata("design:type", String)
], OperationInDto.prototype, "attachedMediaExtension", void 0);
exports.OperationInDto = OperationInDto;
//# sourceMappingURL=OperationInDto.js.map