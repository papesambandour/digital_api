"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hub2CashInApiManagerService = void 0;
const api_manager_interface_service_1 = require("../api-manager-interface/api-manager-interface.service");
const Controller_1 = require("../../Controller");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
const main_1 = require("../../../main");
const Hub2Provider_1 = require("../../../sdk/Hub2/Hub2Provider");
const Parteners_entity_1 = require("../../../Models/Entities/Parteners.entity");
class Hub2CashInApiManagerService extends api_manager_interface_service_1.ApiManagerInterface {
    async checkStatusTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async confirmTransaction(params) {
        return (await this.notImplementedYet(params));
    }
    async handleCallbackTransaction(params) {
        return (await this.notImplementedYet(params));
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
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.SERVICE_DOWN,
                partnerMessage: api_manager_interface_service_1.MANAGER_INIT_DOWN_MESSAGE,
            }, baseResponse);
        }
        const transaction = await this.createTransaction(api);
        const partner = await Parteners_entity_1.Parteners.findOne(transaction.partenersId);
        const response = await Hub2Provider_1.default.sendTransfer({
            amount: transaction.amount,
            msisdn: `+${this.apiService.sousServices.executeCountryCallCodeWithoutPlus}${params.dto.phone}`,
            reference: transaction.transactionId.toString(),
            meta: JSON.parse(this.apiService.sousServices.executeSmsSender),
            overrideBusinessName: params.dto.sender || partner.name,
        });
        const statues = this.helper.getStatusAfterExec(response.success ? 'success' : 'failed', this.apiService.sousServices);
        transaction.statut = statues['status'];
        transaction.preStatut = statues['preStatus'];
        transaction.sousServiceTransactionId = response === null || response === void 0 ? void 0 : response.externalReference;
        await transaction.save();
        if (response.success) {
            transaction.message = main_1.serializeData(response.apiResponse);
            transaction.needCheckTransaction = 0;
            await transaction.save();
            console.log('Send OKK');
            return Object.assign({
                status: Enum_entity_1.StatusEnum.PENDING,
                codeHttp: Controller_1.CODE_HTTP.OK_OPERATION,
                partnerMessage: api_manager_interface_service_1.MANAGER_INIT_CASH_IN_SUCCESS_MESSAGE,
                transaction: transaction,
                transactionId: transaction.transactionId,
                usedPhoneId: api.id,
            }, baseResponse);
        }
        else {
            console.log('error while requesting');
            transaction.errorMessage = main_1.serializeData(response.apiResponse);
            await transaction.save();
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
                partnerMessage: response === null || response === void 0 ? void 0 : response.errorMessage,
                transaction: transaction,
                transactionId: transaction.transactionId,
                usedPhoneId: api.id,
                refundOnFailed: true,
            }, baseResponse);
        }
    }
    async refundTransaction(params) {
        return (await this.notImplementedYet(params));
    }
    async getBalance(params) {
        return Hub2Provider_1.default.apiManagerGetBalance(params);
    }
}
exports.Hub2CashInApiManagerService = Hub2CashInApiManagerService;
//# sourceMappingURL=hub2-cash-in-api-manager.service.js.map