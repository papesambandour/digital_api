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
exports.MoneyGramCallback = exports.EventPayload = exports.TransactionSubStatus = exports.DataToCollect = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class DataToCollect {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", Number)
], DataToCollect.prototype, "Code", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], DataToCollect.prototype, "dataCollection", void 0);
exports.DataToCollect = DataToCollect;
class TransactionSubStatus {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], TransactionSubStatus.prototype, "subStatus", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], TransactionSubStatus.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], TransactionSubStatus.prototype, "targetCustomer", void 0);
__decorate([
    swagger_1.ApiProperty({ type: [DataToCollect] }),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Array)
], TransactionSubStatus.prototype, "dataToCollect", void 0);
exports.TransactionSubStatus = TransactionSubStatus;
class EventPayload {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EventPayload.prototype, "transactionId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EventPayload.prototype, "agentPartnerId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EventPayload.prototype, "referenceNumber", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], EventPayload.prototype, "partnerTransactionId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsDateString(),
    __metadata("design:type", String)
], EventPayload.prototype, "transactionSendDate", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsDateString(),
    __metadata("design:type", String)
], EventPayload.prototype, "transactionStatusDate", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EventPayload.prototype, "transactionStatus", void 0);
__decorate([
    swagger_1.ApiProperty({ type: [TransactionSubStatus] }),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Array)
], EventPayload.prototype, "transactionSubStatus", void 0);
exports.EventPayload = EventPayload;
class MoneyGramCallback {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], MoneyGramCallback.prototype, "eventId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsDateString(),
    __metadata("design:type", String)
], MoneyGramCallback.prototype, "eventDate", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], MoneyGramCallback.prototype, "subscriptionId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], MoneyGramCallback.prototype, "subscriptionType", void 0);
__decorate([
    swagger_1.ApiProperty({ type: EventPayload }),
    class_validator_1.ValidateNested(),
    __metadata("design:type", EventPayload)
], MoneyGramCallback.prototype, "eventPayload", void 0);
exports.MoneyGramCallback = MoneyGramCallback;
//# sourceMappingURL=MoneyGramCallback.js.map