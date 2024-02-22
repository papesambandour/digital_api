"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrangeMoneySnCashOutApiManagerService = void 0;
const api_manager_interface_service_1 = require("../api-manager-interface/api-manager-interface.service");
const ProviderOrangeMoneyApi_1 = require("../../../sdk/Orange/ProviderOrangeMoneyApi");
const Controller_1 = require("../../Controller");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
const main_1 = require("../../../main");
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
        var _a, _b;
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
        let response;
        if (params.dto.useOMQrCode) {
            response = await omApi.initQrCodeMerchantPayment({
                amount: transaction.amount,
                phoneNumber: transaction.phone,
                identifier: transaction.transactionId.toString(),
            }, params.dto.sender || this.apiService.partner.name, params.dto.successRedirectUrl, params.dto.errorRedirectUrl);
        }
        else {
            response = await omApi.initMerchantPayment({
                amount: transaction.amount,
                phoneNumber: transaction.phone,
                identifier: transaction.transactionId.toString(),
            });
        }
        const statues = this.helper.getStatusAfterExec(response.success ? 'success' : 'failed', this.apiService.sousServices);
        transaction.statut = statues['status'];
        transaction.preStatut = statues['preStatus'];
        transaction.sousServiceTransactionId = response === null || response === void 0 ? void 0 : response.externalReference;
        await transaction.save();
        if (response.success) {
            transaction.message = main_1.serializeData(response.apiResponse);
            if (params.dto.useOMQrCode) {
                transaction.needCheckTransaction = 1;
                transaction.deepLinkUrl = `${response.deepLinks.OM}|${response.deepLinks.MAXIT}`;
                transaction.successRedirectUrl = params.dto.successRedirectUrl;
                transaction.errorRedirectUrl = params.dto.errorRedirectUrl;
            }
            else {
                transaction.needCheckTransaction = 1;
            }
            await transaction.save();
            let messageNotification;
            let deepLink;
            if (params.dto.useOMQrCode) {
                deepLink = `${process.env.APP_INTERNAL_URL}/deep/${transaction.transactionId}`;
                messageNotification = await this.helper.getDeepLinkNotificationMessage(transaction, deepLink);
                const to = `+${this.apiService.sousServices.executeCountryCallCodeWithoutPlus}${params.dto.phone}`;
                setTimeout(async () => {
                    if (await this.apiService.partner.getCanSendOMSnQrCodePaymentLink()) {
                        console.log('can send link');
                        this.helper
                            .sendSms([to], messageNotification, this.apiService.sousServices.executeSmsSender, false, 30)
                            .then(() => {
                        });
                    }
                    else {
                        console.log('ignore send link');
                    }
                }, 0);
            }
            console.log('Send OKK');
            return Object.assign({
                status: Enum_entity_1.StatusEnum.PENDING,
                codeHttp: Controller_1.CODE_HTTP.OK_OPERATION,
                partnerMessage: api_manager_interface_service_1.MANAGER_INIT_CASH_OUT_SUCCESS_MESSAGE,
                transaction: transaction,
                transactionId: transaction.transactionId,
                usedPhoneId: api.id,
                data: params.dto.useOMQrCode
                    ? {
                        notificationMessage: messageNotification,
                        amount: transaction.amount,
                        deepLinkUrl: deepLink,
                        _be_removed_deepLinkUrl_: (_a = response === null || response === void 0 ? void 0 : response.deepLinks) === null || _a === void 0 ? void 0 : _a.OM,
                        _be_removed_alternative_deepLinkUrl_: (_b = response === null || response === void 0 ? void 0 : response.deepLinks) === null || _b === void 0 ? void 0 : _b.MAXIT,
                        _be_removed_deepQrCode_: response.qrCode,
                    }
                    : undefined,
            }, baseResponse);
        }
        else {
            console.log('error while requesting');
            transaction.errorMessage = main_1.serializeData(response.apiResponse);
            await transaction.save();
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
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