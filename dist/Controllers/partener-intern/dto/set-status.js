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
exports.SetSuccessFailedDtoOut = exports.SetSuccessDtoIn = exports.SetFailedDtoIn = void 0;
const swagger_1 = require("@nestjs/swagger");
class SetFailedDtoIn {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], SetFailedDtoIn.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], SetFailedDtoIn.prototype, "message", void 0);
exports.SetFailedDtoIn = SetFailedDtoIn;
class SetSuccessDtoIn {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], SetSuccessDtoIn.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], SetSuccessDtoIn.prototype, "message", void 0);
exports.SetSuccessDtoIn = SetSuccessDtoIn;
class SetSuccessFailedDtoOut {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], SetSuccessFailedDtoOut.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], SetSuccessFailedDtoOut.prototype, "statutTreatment", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], SetSuccessFailedDtoOut.prototype, "messageTreatment", void 0);
exports.SetSuccessFailedDtoOut = SetSuccessFailedDtoOut;
//# sourceMappingURL=set-status.js.map