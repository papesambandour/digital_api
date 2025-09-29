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
exports.OmCallbackData = void 0;
const swagger_1 = require("@nestjs/swagger");
class Partner {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], Partner.prototype, "idType", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], Partner.prototype, "id", void 0);
class Customer {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], Customer.prototype, "idType", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], Customer.prototype, "id", void 0);
class Amount {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], Amount.prototype, "value", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], Amount.prototype, "unit", void 0);
class Metadata {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], Metadata.prototype, "successRedirectUrl", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], Metadata.prototype, "cancelRedirectUrl", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], Metadata.prototype, "idQr", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], Metadata.prototype, "reference_id", void 0);
class OmCallbackData {
}
__decorate([
    swagger_1.ApiProperty({ type: Partner }),
    __metadata("design:type", Partner)
], OmCallbackData.prototype, "partner", void 0);
__decorate([
    swagger_1.ApiProperty({ type: Customer }),
    __metadata("design:type", Customer)
], OmCallbackData.prototype, "customer", void 0);
__decorate([
    swagger_1.ApiProperty({ type: Amount }),
    __metadata("design:type", Amount)
], OmCallbackData.prototype, "amount", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], OmCallbackData.prototype, "type", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], OmCallbackData.prototype, "paymentMethod", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], OmCallbackData.prototype, "channel", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], OmCallbackData.prototype, "reference", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], OmCallbackData.prototype, "transactionId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], OmCallbackData.prototype, "createdAt", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], OmCallbackData.prototype, "status", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], OmCallbackData.prototype, "detail", void 0);
__decorate([
    swagger_1.ApiProperty({ type: Metadata }),
    __metadata("design:type", Metadata)
], OmCallbackData.prototype, "metadata", void 0);
exports.OmCallbackData = OmCallbackData;
//# sourceMappingURL=OmCallbackData.js.map