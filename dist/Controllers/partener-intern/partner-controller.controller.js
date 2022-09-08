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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerControllerController = void 0;
const common_1 = require("@nestjs/common");
const ResponseDecorateur_1 = require("../../Models/Decorateurs/ResponseDecorateur");
const swagger_1 = require("@nestjs/swagger");
const home_dto_out_1 = require("./dto/home-dto-out");
const refund_dto_out_1 = require("./dto/refund-dto-out");
const partner_service_service_1 = require("./partner-service.service");
let PartnerControllerController = class PartnerControllerController {
    home() {
        return {
            api: 'Partner',
            version: '1.1',
        };
    }
    async refund(refundDtoIn) {
        return await this.partnerServiceService.refund(refundDtoIn);
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", partner_service_service_1.PartnerServiceService)
], PartnerControllerController.prototype, "partnerServiceService", void 0);
__decorate([
    common_1.Get('/home'),
    ResponseDecorateur_1.ResponseDecorateur(home_dto_out_1.HomeDtoOut, 201, 'Home service partner intern '),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PartnerControllerController.prototype, "home", null);
__decorate([
    common_1.Post('/transaction/refund'),
    ResponseDecorateur_1.ResponseDecorateur(refund_dto_out_1.RefundDtoOut, 201, 'Home service partner intern '),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refund_dto_out_1.RefundDtoIn]),
    __metadata("design:returntype", Promise)
], PartnerControllerController.prototype, "refund", null);
PartnerControllerController = __decorate([
    swagger_1.ApiBearerAuth('apikey'),
    common_1.Controller('api/v1.0/partner'),
    swagger_1.ApiTags('Api Intern Service Partner'),
    swagger_1.ApiExtraModels(...[home_dto_out_1.HomeDtoOut, refund_dto_out_1.RefundDtoOut])
], PartnerControllerController);
exports.PartnerControllerController = PartnerControllerController;
//# sourceMappingURL=partner-controller.controller.js.map