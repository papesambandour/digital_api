"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KPaySnCashOutApiManagerService = void 0;
const api_manager_interface_service_1 = require("../api-manager-interface/api-manager-interface.service");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
const Controller_1 = require("../../Controller");
const main_1 = require("../../../main");
const Parteners_entity_1 = require("../../../Models/Entities/Parteners.entity");
const KPayCashOut_1 = require("../../../sdk/KPay/KPayCashOut");
class KPaySnCashOutApiManagerService extends api_manager_interface_service_1.ApiManagerInterface {
    async checkStatusTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async confirmTransaction(params) {
        const baseResponse = {
            phone: params.transaction.phone,
            amount: params.transaction.amount.toString(),
            externalTransactionId: params.transaction.externalTransactionId,
            codeService: params.transaction.codeSousService,
            callbackUrl: params.transaction.urlIpn,
        };
        const check = await KPayCashOut_1.KPayCashOut.confirmPaymentFunction(params);
        if (check === null || check === void 0 ? void 0 : check.success) {
            return Object.assign({
                status: Enum_entity_1.StatusEnum.SUCCESS,
                codeHttp: Controller_1.CODE_HTTP.OK_OPERATION,
                partnerMessage: check === null || check === void 0 ? void 0 : check.message,
                meta: check,
            }, baseResponse);
        }
        else {
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.FAILLED,
                partnerMessage: check === null || check === void 0 ? void 0 : check.message,
                meta: check,
            }, baseResponse);
        }
    }
    async getBalance(params) {
        return KPayCashOut_1.KPayCashOut.getBalance();
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
        const partner = await Parteners_entity_1.Parteners.findOne(transaction.partenersId);
        const response = await KPayCashOut_1.KPayCashOut.requestToPay({
            amount: transaction.amount,
            correlationReference: transaction.transactionId.toString(),
            description: params.dto.motif || '',
            phone: transaction.phone,
            partnerName: partner.name,
        });
        const statues = this.helper.getStatusAfterExec(response.success ? 'success' : 'failed', this.apiService.sousServices);
        transaction.statut = statues['status'];
        transaction.preStatut = statues['preStatus'];
        transaction.sousServiceTransactionId = response.kpayReference;
        await transaction.save();
        if (response.success) {
            transaction.message = main_1.serializeData(response);
            transaction.needCheckTransaction = 0;
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
            transaction.errorMessage = main_1.serializeData(response);
            await transaction.save();
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
                partnerMessage: response.exception,
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
exports.KPaySnCashOutApiManagerService = KPaySnCashOutApiManagerService;
//# sourceMappingURL=kpay-sn-cash-out-api-manager.service.js.map