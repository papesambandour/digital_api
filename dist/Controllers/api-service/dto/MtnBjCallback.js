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
exports.MtnBjCallbackData = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class Payer {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Payer.prototype, "partyIdType", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Payer.prototype, "partyId", void 0);
class MtnBjCallbackData {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], MtnBjCallbackData.prototype, "financialTransactionId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], MtnBjCallbackData.prototype, "externalId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], MtnBjCallbackData.prototype, "amount", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], MtnBjCallbackData.prototype, "currency", void 0);
__decorate([
    swagger_1.ApiProperty({ type: Payer }),
    class_validator_1.IsObject(),
    __metadata("design:type", Payer)
], MtnBjCallbackData.prototype, "payer", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], MtnBjCallbackData.prototype, "payeeNote", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], MtnBjCallbackData.prototype, "status", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], MtnBjCallbackData.prototype, "reason", void 0);
exports.MtnBjCallbackData = MtnBjCallbackData;
//# sourceMappingURL=MtnBjCallback.js.map