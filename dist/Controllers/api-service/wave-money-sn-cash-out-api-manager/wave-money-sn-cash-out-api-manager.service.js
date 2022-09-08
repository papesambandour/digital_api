"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaveMoneySnCashOutApiManagerService = void 0;
const api_manager_interface_service_1 = require("../api-manager-interface/api-manager-interface.service");
const Controller_1 = require("../../Controller");
const WaveApiProvider_1 = require("../../../sdk/Wave/WaveApiProvider");
const config_1 = require("../../../sdk/Wave/config");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
const main_1 = require("../../../main");
class WaveMoneySnCashOutApiManagerService extends api_manager_interface_service_1.ApiManagerInterface {
    async checkStatusTransaction(params) {
        return WaveApiProvider_1.default.apiManagerCheckCashOutStatusTransaction(this, params, this.constructor.country);
    }
    async confirmTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async getBalance(params) {
        return WaveApiProvider_1.default.getBalance(params, config_1.waveBusinessApiConfig(this.constructor.country).cashOutApiKey, WaveApiProvider_1.default.now());
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
        const checkout = await WaveApiProvider_1.default.makeCheckout({
            idemPotency: `${transaction.transactionId}_${transaction.id}`,
            amount: transaction.amount,
            token: config_1.waveBusinessApiConfig(this.constructor.country)
                .cashOutApiKey,
            success_url: params.dto.successRedirectUrl,
            error_url: params.dto.errorRedirectUrl,
            client_reference: transaction.transactionId,
            override_business_name: params.dto.sender,
        });
        if (checkout) {
            checkout.success = !!(checkout === null || checkout === void 0 ? void 0 : checkout.wave_launch_url);
        }
        const statues = this.helper.getStatusAfterExec('success', this.apiService.sousServices);
        console.log(checkout, 'sttaus', statues);
        transaction.statut = statues['status'];
        transaction.preStatut = statues['preStatus'];
        transaction.sousServiceTransactionId = checkout === null || checkout === void 0 ? void 0 : checkout.id;
        await transaction.save();
        if (checkout === null || checkout === void 0 ? void 0 : checkout.success) {
            transaction.message = main_1.serializeData(checkout);
            transaction.needCheckTransaction = 1;
            transaction.deepLinkUrl = `wave://capture/${checkout.wave_launch_url}`;
            transaction.successRedirectUrl = params.dto.successRedirectUrl;
            transaction.errorRedirectUrl = params.dto.errorRedirectUrl;
            await transaction.save();
            console.log('Send OKK');
            const deepLink = `${process.env.APP_INTERNAL_URL}/deep/${transaction.transactionId}`;
            const messageNotification = this.helper.getDeepLinkNotificationMessage(transaction, deepLink);
            this.helper
                .sendSms([
                `+${this.apiService.sousServices.executeCountryCallCodeWithoutPlus}${params.dto.phone}`,
            ], messageNotification, this.apiService.sousServices.executeSmsSender)
                .then();
            return Object.assign({
                status: Enum_entity_1.StatusEnum.PENDING,
                codeHttp: Controller_1.CODE_HTTP.OK_OPERATION,
                partnerMessage: api_manager_interface_service_1.MANAGER_INIT_CASH_OUT_SUCCESS_MESSAGE,
                transaction: transaction,
                transactionId: transaction.transactionId,
                usedPhoneId: api.id,
                data: {
                    notificationMessage: messageNotification,
                    amount: transaction.amount,
                    deepLinkUrl: deepLink,
                    _be_removed_deepLinkUrl_: `wave://capture/${checkout.wave_launch_url}`,
                },
            }, baseResponse);
        }
        else {
            transaction.errorMessage = main_1.serializeData(checkout);
            await transaction.save();
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
                partnerMessage: 'Impossible de procéder au paiement ressayer plus tard',
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
        const response = await WaveApiProvider_1.default.refundTransaction(params, config_1.waveBusinessApiConfig(this.constructor.country).sessionId, params.transaction.sousServiceTransactionId);
        if (response.status === Enum_entity_1.StatusEnum.SUCCESS) {
            await this.helper.handleTransactionRefundSuccess(params.transaction);
        }
        return response;
    }
}
exports.WaveMoneySnCashOutApiManagerService = WaveMoneySnCashOutApiManagerService;
WaveMoneySnCashOutApiManagerService.country = 'sn';
//# sourceMappingURL=wave-money-sn-cash-out-api-manager.service.js.map