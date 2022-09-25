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
exports.DtoMessageUssds = void 0;
const swagger_1 = require("@nestjs/swagger");
class DtoMessageUssds {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoMessageUssds.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoMessageUssds.prototype, "transactionsId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoMessageUssds.prototype, "content", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoMessageUssds.prototype, "shaSubContent", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Date)
], DtoMessageUssds.prototype, "subCreatedAt", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoMessageUssds.prototype, "sousServiceId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoMessageUssds.prototype, "sender", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoMessageUssds.prototype, "messagerie", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Date)
], DtoMessageUssds.prototype, "createdAt", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Date)
], DtoMessageUssds.prototype, "updatedAt", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoMessageUssds.prototype, "sousServicesId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoMessageUssds.prototype, "phonesId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DtoMessageUssds.prototype, "isMatched", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DtoMessageUssds.prototype, "state", void 0);
exports.DtoMessageUssds = DtoMessageUssds;
//# sourceMappingURL=DtoMessageUssds.js.map