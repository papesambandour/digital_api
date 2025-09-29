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
exports.RefundDtoOut = exports.RefundDtoIn = void 0;
const swagger_1 = require("@nestjs/swagger");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
class RefundDtoIn {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Object)
], RefundDtoIn.prototype, "transactionId", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'MoneyGram operator name for reversal',
    }),
    __metadata("design:type", String)
], RefundDtoIn.prototype, "moneyGramOperatorName", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        enum: [
            'NO_RCV_LOC',
            'WRONG_SERVICE',
            'NO_TQ',
            'INCORRECT_AMT',
            'MS_NOT_USED',
        ],
        description: 'MoneyGram reversal reason',
    }),
    __metadata("design:type", String)
], RefundDtoIn.prototype, "moneyGramSendReversalReason", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        enum: ['Y', 'N'],
        description: 'MoneyGram fee refund indicator (Y=Yes, N=No)',
    }),
    __metadata("design:type", String)
], RefundDtoIn.prototype, "moneyGramFeeRefund", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'MoneyGram agent check number (max 12 characters)',
        maxLength: 12,
    }),
    __metadata("design:type", String)
], RefundDtoIn.prototype, "moneyGramAgentCheckNumber", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        enum: ['MTC'],
        description: 'MoneyGram agent check type',
    }),
    __metadata("design:type", String)
], RefundDtoIn.prototype, "moneyGramAgentCheckType", void 0);
exports.RefundDtoIn = RefundDtoIn;
class RefundDtoOut {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], RefundDtoOut.prototype, "status", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], RefundDtoOut.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], RefundDtoOut.prototype, "statutTreatment", void 0);
exports.RefundDtoOut = RefundDtoOut;
//# sourceMappingURL=refund-dto-out.js.map