"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankCardMoneySnCashOutApiManagerService = void 0;
const api_manager_interface_service_1 = require("../api-manager-interface/api-manager-interface.service");
const Controller_1 = require("../../Controller");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
const Bank3DSBridgeApiProvider_1 = require("../../../sdk/BankCard/Bank3DSBridgeApiProvider");
const main_1 = require("../../../main");
class BankCardMoneySnCashOutApiManagerService extends api_manager_interface_service_1.ApiManagerInterface {
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
        const check = await Bank3DSBridgeApiProvider_1.default.checkTransaction(params);
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
        return Promise.resolve({
            success: false,
            newBalance: null,
        });
    }
    async handleCallbackTransaction(params) {
        return await this.notImplementedYet(params);
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
        const transaction = await this.createTransaction(api);
        const checkout = await Bank3DSBridgeApiProvider_1.default.initTransaction({
            amountXOF: transaction.amount,
            firstName: params.dto.customerFirstName,
            lastName: params.dto.customerLastName,
            bankRefCommand: Bank3DSBridgeApiProvider_1.default.getOrderIdFromTransaction(transaction.transactionId),
            cardNumber: params.dto.cardNumber,
            cardExpireMonth: params.dto.cardExpireMonth,
            cardExpireYear: params.dto.cardExpireYear,
            cardCVC: params.dto.cardCVC,
            cardType: params.dto.cardType,
            bankAuthRedirectUrl: `${process.env.APP_INTERNAL_URL}/auth_3ds_callback/${transaction.transactionId}`,
            phoneNumber: params.dto.phone,
            clientEmail: params.dto.customerEmail,
            merchantName: params.dto.merchantName,
            merchantCat1Code: params.dto.merchantCatCode || '',
            bankProvider: '',
            bankArea: '',
        });
        const statues = this.helper.getStatusAfterExec(checkout.success ? 'success' : 'failed', this.apiService.sousServices);
        console.log(checkout, 'sttaus', statues);
        transaction.statut = statues['status'];
        transaction.preStatut = statues['preStatus'];
        transaction.sousServiceTransactionId =
            (_a = checkout === null || checkout === void 0 ? void 0 : checkout['paymentResponse']) === null || _a === void 0 ? void 0 : _a['orderId'];
        transaction.customerFirstName = params.dto.customerFirstName;
        transaction.customerLastName = params.dto.customerLastName;
        transaction.customerEmail = params.dto.customerEmail;
        transaction.operationDescription = params.dto.operationDescription;
        await transaction.save();
        if (checkout === null || checkout === void 0 ? void 0 : checkout.success) {
            transaction.message = main_1.serializeData(checkout);
            transaction.deepLinkUrl = `${checkout.url}`;
            transaction.successRedirectUrl = params.dto.successRedirectUrl;
            transaction.errorRedirectUrl = params.dto.errorRedirectUrl;
            await transaction.save();
            console.log('Send OKK');
            const deepLink = `${process.env.APP_INTERNAL_URL}/deep/${transaction.transactionId}`;
            const messageNotification = await this.helper.getDeepLinkNotificationMessage(transaction, deepLink);
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
                    authLinkUrl: deepLink,
                    orderId: Bank3DSBridgeApiProvider_1.default.getOrderIdFromTransaction(transaction.transactionId),
                },
            }, baseResponse);
        }
        else {
            transaction.errorMessage = main_1.serializeData(checkout);
            await transaction.save();
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
                partnerMessage: (checkout === null || checkout === void 0 ? void 0 : checkout.message) ||
                    'Impossible de procéder au paiement ressayer plus tard',
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
exports.BankCardMoneySnCashOutApiManagerService = BankCardMoneySnCashOutApiManagerService;
//# sourceMappingURL=bank-card-money-sn-cash-out-api-manager.service.js.map