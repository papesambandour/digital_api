"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappMessageSendApiManagerService = void 0;
const api_manager_interface_service_1 = require("../api-manager-interface/api-manager-interface.service");
const Controller_1 = require("../../Controller");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
const WhatsAppApiProvider_1 = require("../../../sdk/WhatsApp/WhatsAppApiProvider");
const main_1 = require("../../../main");
class WhatsappMessageSendApiManagerService extends api_manager_interface_service_1.ApiManagerInterface {
    async checkStatusTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async confirmTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async handleCallbackTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async initTransaction(params) {
        const api = await this.loadBalancingPhone();
        const baseResponse = {
            phone: params.dto.phone,
            amount: params.dto.amount.toString(),
            externalTransactionId: params.dto.externalTransactionId,
            codeService: params.dto.codeService,
            callbackUrl: params.dto.callbackUrl,
        };
        if (!api) {
            return Object.assign({
                status: 'FAILLED',
                codeHttp: Controller_1.CODE_HTTP.SERVICE_DOWN,
                partnerMessage: api_manager_interface_service_1.MANAGER_INIT_DOWN_MESSAGE,
            }, baseResponse);
        }
        const transaction = await this.createTransaction(api);
        const response = await WhatsAppApiProvider_1.default.sendMessageToOne(params.dto.phone, params.dto.message, await this.helper.b64ToFilePath(params.dto.attachedMedia, params.dto.attachedMediaExtension, params.dto.attachedMediaName));
        const statues = this.helper.getStatusAfterExec(response.success ? 'success' : 'failed', this.apiService.sousServices);
        console.log(response, 'sttaus', statues);
        transaction.statut = statues['status'];
        transaction.preStatut = statues['preStatus'];
        transaction.sousServiceTransactionId = response.whatsappNumberId;
        await transaction.save();
        await this.helper.setIsCallbackReadyValue(transaction.id);
        this.helper.updateApiBalance(this, transaction.phonesId).then();
        if (response.success) {
            transaction.message = main_1.serializeData(response);
            await transaction.save();
            await this.helper.handleSuccessTransactionCreditDebit(transaction);
            console.log('Send OKK');
            return Object.assign({
                status: Enum_entity_1.StatusEnum.PENDING,
                codeHttp: Controller_1.CODE_HTTP.OK_OPERATION,
                partnerMessage: response.message,
                transaction: transaction,
                transactionId: transaction.transactionId,
                usedPhoneId: api.id,
            }, baseResponse);
        }
        else {
            transaction.errorMessage = main_1.serializeData(response);
            await transaction.save();
            await this.helper.operationPartnerCancelTransaction(transaction);
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
                partnerMessage: response.message,
                transaction: transaction,
                transactionId: transaction.transactionId,
                usedPhoneId: api.id,
                refundOnFailed: true,
            }, baseResponse);
        }
    }
    async refundTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async getBalance(params) {
        return {
            success: false,
            newBalance: null,
        };
    }
}
exports.WhatsappMessageSendApiManagerService = WhatsappMessageSendApiManagerService;
//# sourceMappingURL=whatsapp-message-send-api-manager.service.js.map