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
const Enum_entity_1 = require("../../Models/Entities/Enum.entity");
const partner_service_service_1 = require("./partner-service.service");
const import_bank_transfert_bulk_dto_in_1 = require("./dto/import-bank-transfert-bulk-dto-in");
const services_balance_1 = require("./dto/services-balance");
const set_status_1 = require("./dto/set-status");
const notification_dto_1 = require("./dto/notification-dto");
const retro_dto_1 = require("./dto/retro-dto");
const execute_ussd_dto_1 = require("./dto/execute-ussd-dto");
const reboot_phone_dto_1 = require("./dto/reboot-phone-dto");
let PartnerControllerController = class PartnerControllerController {
    async home() {
        return {
            api: 'Partner',
            version: '1.1',
        };
    }
    async refund(refundDtoIn) {
        const refund = await this.partnerServiceService.refund(refundDtoIn);
        if (refund.status === Enum_entity_1.StatusEnum.SUCCESS) {
            return {
                status: undefined,
                message: refund.message,
                statutTreatment: 'SUCCESS',
            };
        }
        else {
            return {
                status: refund.status,
                message: refund.message,
                statutTreatment: 'FAILED',
            };
        }
    }
    async retro(retroDtoIn) {
        var _a;
        const apiResponse = await this.partnerServiceService.retroTransaction(retroDtoIn);
        if ((apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.code) === 2000) {
            await this.partnerServiceService.setRetroParentId(retroDtoIn.transactionId, (_a = apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.data) === null || _a === void 0 ? void 0 : _a.transactionId);
            return {
                statutTreatment: 'SUCCESS',
                message: apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.msg,
                apiResponse: apiResponse,
            };
        }
        else {
            return {
                statutTreatment: 'FAILED',
                message: apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.msg,
                apiResponse: apiResponse,
            };
        }
    }
    async retroAdmin(retroDtoIn) {
        var _a;
        const apiResponse = await this.partnerServiceService.retroAdminTransaction(retroDtoIn);
        if ((apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.code) === 2000) {
            await this.partnerServiceService.setRetroParentId(retroDtoIn.transactionId, (_a = apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.data) === null || _a === void 0 ? void 0 : _a.transactionId);
            return {
                statutTreatment: 'SUCCESS',
                message: apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.msg,
                apiResponse: apiResponse,
            };
        }
        else {
            return {
                statutTreatment: 'FAILED',
                message: apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.msg,
                apiResponse: apiResponse,
            };
        }
    }
    async executeUssd(executeUssdIn) {
        const ussdResponse = await this.partnerServiceService.executeUssd(executeUssdIn);
        if (ussdResponse === null || ussdResponse === void 0 ? void 0 : ussdResponse.success) {
            return {
                statutTreatment: 'SUCCESS',
                message: ussdResponse.message,
                phoneId: executeUssdIn.phoneId,
                ussd: executeUssdIn.ussd,
                ussd_response: ussdResponse.ussd_response,
            };
        }
        else {
            return {
                statutTreatment: 'FAILED',
                message: "Le code Ussd n'a pas pus etre executé: " + ussdResponse.message,
                phoneId: executeUssdIn.phoneId,
                ussd: executeUssdIn.ussd,
                ussd_response: '',
            };
        }
    }
    async rebootPhone(rebootPhoneDtoIn) {
        const ussdResponse = await this.partnerServiceService.rebootPhone(rebootPhoneDtoIn);
        if (ussdResponse === null || ussdResponse === void 0 ? void 0 : ussdResponse.success) {
            return {
                statutTreatment: 'SUCCESS',
                message: ussdResponse.message,
                phoneId: rebootPhoneDtoIn.phoneId,
            };
        }
        else {
            return {
                statutTreatment: 'FAILED',
                phoneId: rebootPhoneDtoIn.phoneId,
                message: "Le reboot n'a pas pus etre executé: " + ussdResponse.message,
            };
        }
    }
    async setSuccess(setSuccessDtoIn) {
        return await this.partnerServiceService.setSuccessOrFailed(setSuccessDtoIn, 'success');
    }
    async setFailed(setFailedDtoIn) {
        return await this.partnerServiceService.setSuccessOrFailed(setFailedDtoIn, 'failed');
    }
    async resendCallback(resendCallbackDtoIn) {
        return await this.partnerServiceService.resendCallback(resendCallbackDtoIn);
    }
    async sendNotification(sendNotificationDtoIn) {
        return await this.partnerServiceService.sendNotification(sendNotificationDtoIn);
    }
    async servicesBalance() {
        return await this.partnerServiceService.servicesBalance();
    }
    async importBankTransfer(importBankTransferBulkDtoIn) {
        return await this.partnerServiceService.importBankTransfer(importBankTransferBulkDtoIn);
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
    __metadata("design:returntype", Promise)
], PartnerControllerController.prototype, "home", null);
__decorate([
    common_1.Post('/transaction/refund'),
    ResponseDecorateur_1.ResponseDecorateur(refund_dto_out_1.RefundDtoOut, 201, 'Home service partner intern '),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refund_dto_out_1.RefundDtoIn]),
    __metadata("design:returntype", Promise)
], PartnerControllerController.prototype, "refund", null);
__decorate([
    common_1.Post('/transaction/retro'),
    ResponseDecorateur_1.ResponseDecorateur(retro_dto_1.RetroDtoOut, 201, 'Home service partner intern '),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [retro_dto_1.RetroDtoIn]),
    __metadata("design:returntype", Promise)
], PartnerControllerController.prototype, "retro", null);
__decorate([
    common_1.Post('/transaction/retro-admin'),
    ResponseDecorateur_1.ResponseDecorateur(retro_dto_1.RetroDtoOut, 201, 'Home service partner intern '),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [retro_dto_1.RetroDtoIn]),
    __metadata("design:returntype", Promise)
], PartnerControllerController.prototype, "retroAdmin", null);
__decorate([
    common_1.Post('/phone/execute-ussd'),
    ResponseDecorateur_1.ResponseDecorateur(execute_ussd_dto_1.ExecuteUssdOut, 201, 'Home service partner intern '),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [execute_ussd_dto_1.ExecuteUssdIn]),
    __metadata("design:returntype", Promise)
], PartnerControllerController.prototype, "executeUssd", null);
__decorate([
    common_1.Post('/phone/reboot'),
    ResponseDecorateur_1.ResponseDecorateur(reboot_phone_dto_1.RebootPhoneDtoOut, 201, 'Home service partner intern '),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reboot_phone_dto_1.RebootPhoneDtoIn]),
    __metadata("design:returntype", Promise)
], PartnerControllerController.prototype, "rebootPhone", null);
__decorate([
    common_1.Post('/transaction/set-success'),
    ResponseDecorateur_1.ResponseDecorateur(set_status_1.SetSuccessFailedDtoOut, 201, 'Home service partner intern '),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [set_status_1.SetSuccessDtoIn]),
    __metadata("design:returntype", Promise)
], PartnerControllerController.prototype, "setSuccess", null);
__decorate([
    common_1.Post('/transaction/set-failed'),
    ResponseDecorateur_1.ResponseDecorateur(set_status_1.SetSuccessFailedDtoOut, 201, 'Home service partner intern '),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [set_status_1.SetFailedDtoIn]),
    __metadata("design:returntype", Promise)
], PartnerControllerController.prototype, "setFailed", null);
__decorate([
    common_1.Post('/transaction/resend-callback'),
    ResponseDecorateur_1.ResponseDecorateur(set_status_1.ResendCallbackDtoOut, 201, 'Home service partner intern '),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [set_status_1.ResendCallbackDtoIn]),
    __metadata("design:returntype", Promise)
], PartnerControllerController.prototype, "resendCallback", null);
__decorate([
    common_1.Post('/notification/send'),
    ResponseDecorateur_1.ResponseDecorateur(notification_dto_1.SendNotificationDtoOut, 201, 'Home service partner intern '),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_dto_1.SendNotificationDtoIn]),
    __metadata("design:returntype", Promise)
], PartnerControllerController.prototype, "sendNotification", null);
__decorate([
    common_1.Get('/services/balance'),
    ResponseDecorateur_1.ResponseDecorateur(services_balance_1.ServicesBalanceDtoOut, 201, 'Home service partner intern ', true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PartnerControllerController.prototype, "servicesBalance", null);
__decorate([
    common_1.Post('/transaction/import_bank_transfer'),
    ResponseDecorateur_1.ResponseDecorateur(import_bank_transfert_bulk_dto_in_1.ImportBankTransfertBulkDtoOut, 201, 'Home service partner intern ', true),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], PartnerControllerController.prototype, "importBankTransfer", null);
PartnerControllerController = __decorate([
    swagger_1.ApiBearerAuth('apikey'),
    common_1.Controller('api/v1.0/partner'),
    swagger_1.ApiTags('Api Intern Service Partner'),
    swagger_1.ApiExtraModels(...[
        home_dto_out_1.HomeDtoOut,
        refund_dto_out_1.RefundDtoOut,
        retro_dto_1.RetroDtoOut,
        execute_ussd_dto_1.ExecuteUssdOut,
        reboot_phone_dto_1.RebootPhoneDtoOut,
        notification_dto_1.SendNotificationDtoOut,
        set_status_1.SetSuccessFailedDtoOut,
        import_bank_transfert_bulk_dto_in_1.ImportBankTransfertBulkDtoOut,
        services_balance_1.ServicesBalanceDtoOut,
    ])
], PartnerControllerController);
exports.PartnerControllerController = PartnerControllerController;
//# sourceMappingURL=partner-controller.controller.js.map