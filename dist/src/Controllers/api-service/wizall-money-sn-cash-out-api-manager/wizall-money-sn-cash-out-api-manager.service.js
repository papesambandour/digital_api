"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WizallMoneySnCashOutApiManagerService = void 0;
const api_manager_interface_service_1 = require("../api-manager-interface/api-manager-interface.service");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
const Controller_1 = require("../../Controller");
const WizallApiProvider_1 = require("../../../sdk/Wizall/WizallApiProvider");
const main_1 = require("../../../main");
class WizallMoneySnCashOutApiManagerService extends api_manager_interface_service_1.ApiManagerInterface {
    async checkStatusTransaction(params) {
        return WizallApiProvider_1.default.apiManagerCheckCashOutStatusTransaction(this, params);
    }
    async confirmTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async getBalance(params) {
        return WizallApiProvider_1.default.getInstance('payment').getBalance();
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
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.SERVICE_DOWN,
                partnerMessage: api_manager_interface_service_1.MANAGER_INIT_DOWN_MESSAGE,
            }, baseResponse);
        }
        console.log('initing cashout');
        const transaction = await this.createTransaction(api);
        const wizallApi = WizallApiProvider_1.default.getInstance('payment');
        const response = await wizallApi.makePayment({
            amount: transaction.amount,
            phoneNumber: transaction.phone,
            identifier: WizallApiProvider_1.default.getWizallExternalFromInternalId(transaction.transactionId.toString(), 'payment'),
        });
        response.success = (response === null || response === void 0 ? void 0 : response.Status) === 'PENDING';
        const statues = this.helper.getStatusAfterExec((response === null || response === void 0 ? void 0 : response.success) ? 'success' : 'failed', this.apiService.sousServices);
        transaction.statut = statues['status'];
        transaction.preStatut = statues['preStatus'];
        await transaction.save();
        if (response.success) {
            transaction.message = main_1.serializeData(response);
            transaction.needCheckTransaction = 1;
            await transaction.save();
            console.log('Send OKK');
            return Object.assign({
                status: Enum_entity_1.StatusEnum.PENDING,
                codeHttp: Controller_1.CODE_HTTP.OK_OPERATION,
                partnerMessage: "Votre opération s'est effectuée sans erreur, Vous allez confirmer le paiement depuis votre application Wizall",
                transaction: transaction,
                transactionId: transaction.transactionId,
                usedPhoneId: api.id,
            }, baseResponse);
        }
        else {
            console.log('error while requesting');
            transaction.errorMessage = main_1.serializeData(response);
            await transaction.save();
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
                partnerMessage: WizallApiProvider_1.default.getMessageFromCode(response),
                transaction: transaction,
                transactionId: transaction.transactionId,
                usedPhoneId: api.id,
            }, baseResponse);
        }
    }
    async refundTransaction(params) {
        return await this.notImplementedYet(params);
    }
}
exports.WizallMoneySnCashOutApiManagerService = WizallMoneySnCashOutApiManagerService;
//# sourceMappingURL=wizall-money-sn-cash-out-api-manager.service.js.map