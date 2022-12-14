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
exports.OperationOutDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
class OperationOutDto {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], OperationOutDto.prototype, "phone", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], OperationOutDto.prototype, "amount", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], OperationOutDto.prototype, "codeService", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], OperationOutDto.prototype, "transactionId", void 0);
__decorate([
    swagger_1.ApiProperty({ enum: Enum_entity_1.StatusEnum }),
    __metadata("design:type", String)
], OperationOutDto.prototype, "status", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], OperationOutDto.prototype, "externalTransactionId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], OperationOutDto.prototype, "callbackUrl", void 0);
exports.OperationOutDto = OperationOutDto;
//# sourceMappingURL=OperationOutDto.js.map