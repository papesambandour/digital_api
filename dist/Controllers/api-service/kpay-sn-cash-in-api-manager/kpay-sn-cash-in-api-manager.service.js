"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KPaySnCashInApiManagerService = void 0;
const api_manager_interface_service_1 = require("../api-manager-interface/api-manager-interface.service");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
const Controller_1 = require("../../Controller");
const main_1 = require("../../../main");
const Parteners_entity_1 = require("../../../Models/Entities/Parteners.entity");
const KPayProvider_1 = require("../../../sdk/KPay/KPayProvider");
class KPaySnCashInApiManagerService extends api_manager_interface_service_1.ApiManagerInterface {
    async checkStatusTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async confirmTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async getBalance(params) {
        return KPayProvider_1.KPayProvider.getBalance();
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
        const response = await KPayProvider_1.KPayProvider.makeTransfer({
            amount: transaction.amount,
            correlationReference: transaction.transactionId.toString(),
            description: params.dto.motif || '',
            phone: transaction.phone,
            partnerName: partner.name,
        });
        const statues = this.helper.getStatusAfterExec(response.success ? 'success' : 'failed', this.apiService.sousServices);
        transaction.statut = statues['status'];
        transaction.preStatut = statues['preStatus'];
        transaction.sousServiceTransactionId = response.transactionId;
        await transaction.save();
        await this.helper.setIsCallbackReadyValue(transaction, 5000);
        this.helper.updateApiBalance(this, transaction.phonesId).then();
        if (response.success) {
            transaction.message = main_1.serializeData(response);
            transaction.needCheckTransaction = 0;
            await transaction.save();
            await this.helper.handleSuccessTransactionCreditDebit(transaction);
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        const baseResponse = {
            phone: (_b = (_a = params.transaction) === null || _a === void 0 ? void 0 : _a.phone) !== null && _b !== void 0 ? _b : null,
            amount: (_e = (_d = (_c = params.transaction) === null || _c === void 0 ? void 0 : _c.amount) === null || _d === void 0 ? void 0 : _d.toString()) !== null && _e !== void 0 ? _e : null,
            externalTransactionId: (_g = (_f = params.transaction) === null || _f === void 0 ? void 0 : _f.externalTransactionId) !== null && _g !== void 0 ? _g : null,
            codeService: (_j = (_h = params.transaction) === null || _h === void 0 ? void 0 : _h.codeSousService) !== null && _j !== void 0 ? _j : null,
            callbackUrl: (_l = (_k = params.transaction) === null || _k === void 0 ? void 0 : _k.urlIpn) !== null && _l !== void 0 ? _l : null,
            transactionId: (_o = (_m = params.transaction) === null || _m === void 0 ? void 0 : _m.transactionId) !== null && _o !== void 0 ? _o : null,
        };
        const canRefund = await this.helper.canRefundOperation(params.transaction);
        if (!canRefund.allow) {
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.FAILLED,
                partnerMessage: canRefund.message,
            }, baseResponse);
        }
        const response = await KPayProvider_1.KPayProvider.refundTransaction(params, 'transfer');
        if (response.status === Enum_entity_1.StatusEnum.SUCCESS) {
            console.log('caaling refund');
            await this.helper.handleTransactionRefundSuccess(params.transaction);
            console.log('fater refubd');
        }
        return response;
    }
}
exports.KPaySnCashInApiManagerService = KPaySnCashInApiManagerService;
//# sourceMappingURL=kpay-sn-cash-in-api-manager.service.js.map