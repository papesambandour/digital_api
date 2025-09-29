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
exports.WaveCallbackData = exports.WaveData = void 0;
const swagger_1 = require("@nestjs/swagger");
class WaveData {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], WaveData.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Object)
], WaveData.prototype, "amount", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], WaveData.prototype, "checkout_status", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], WaveData.prototype, "client_reference", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], WaveData.prototype, "currency", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], WaveData.prototype, "error_url", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Object)
], WaveData.prototype, "last_payment_error", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], WaveData.prototype, "business_name", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], WaveData.prototype, "payment_status", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], WaveData.prototype, "success_url", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], WaveData.prototype, "wave_launch_url", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], WaveData.prototype, "when_completed", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], WaveData.prototype, "when_created", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], WaveData.prototype, "when_expires", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], WaveData.prototype, "transaction_id", void 0);
exports.WaveData = WaveData;
class WaveCallbackData {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], WaveCallbackData.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], WaveCallbackData.prototype, "type", void 0);
exports.WaveCallbackData = WaveCallbackData;
//# sourceMappingURL=WaveCallback.js.map