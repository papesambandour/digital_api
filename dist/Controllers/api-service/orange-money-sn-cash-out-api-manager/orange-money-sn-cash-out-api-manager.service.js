"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrangeMoneySnCashOutApiManagerService = void 0;
const api_manager_interface_service_1 = require("../api-manager-interface/api-manager-interface.service");
const ProviderOrangeMoneyApi_1 = require("../../../sdk/Orange/ProviderOrangeMoneyApi");
const Controller_1 = require("../../Controller");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
class OrangeMoneySnCashOutApiManagerService extends api_manager_interface_service_1.ApiManagerInterface {
    async checkStatusTransaction(params) {
        return ProviderOrangeMoneyApi_1.default.apiManagerCheckStatusTransaction(this, params);
    }
    async confirmTransaction(params) {
        return (await this.notImplementedYet(params));
    }
    async handleCallbackTransaction(params) {
        return (await this.notImplementedYet(params));
    }
    async initTransaction(params) {
        var _a;
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
        console.log('initing cashout');
        const transaction = await this.createTransaction(api);
        const omApi = ProviderOrangeMoneyApi_1.default.getInstance();
        const response = await omApi.initMerchantPayment({
            amount: transaction.amount,
            phoneNumber: transaction.phone,
            identifier: transaction.id.toString(),
        });
        const statues = this.helper.getStatusAfterExec(response.success ? 'success' : 'failed', this.apiService.sousServices);
        transaction.statut = statues['status'];
        transaction.preStatut = statues['preStatus'];
        transaction.sousServiceTransactionId =
            (_a = response.transaction) === null || _a === void 0 ? void 0 : _a.externalReference;
        await transaction.save();
        if (response.success) {
            transaction.message = JSON.stringify(response.apiResponse);
            transaction.needCheckTransaction = 1;
            await transaction.save();
            console.log('Send OKK');
            return Object.assign({
                status: Enum_entity_1.StatusEnum.PENDING,
                codeHttp: Controller_1.CODE_HTTP.OK_OPERATION,
                partnerMessage: api_manager_interface_service_1.MANAGER_INIT_CASH_OUT_SUCCESS_MESSAGE,
                transaction: transaction,
                transactionId: transaction.transactionId,
                usedPhoneId: api.id,
            }, baseResponse);
        }
        else {
            console.log('error while requesting');
            transaction.errorMessage = JSON.stringify(response.apiResponse);
            await transaction.save();
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.SERVICE_DOWN,
                partnerMessage: ProviderOrangeMoneyApi_1.default.getMessageFromCode(response.code),
                transaction: transaction,
                transactionId: transaction.transactionId,
                usedPhoneId: api.id,
            }, baseResponse);
        }
    }
    async refundTransaction(params) {
        return (await this.notImplementedYet(params));
    }
    async getBalance(params) {
        return ProviderOrangeMoneyApi_1.default.apiManagerGetBalance(params);
    }
}
exports.OrangeMoneySnCashOutApiManagerService = OrangeMoneySnCashOutApiManagerService;
//# sourceMappingURL=orange-money-sn-cash-out-api-manager.service.js.map