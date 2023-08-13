"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeneauSnBillPaymentApiManagerService = void 0;
const api_manager_interface_service_1 = require("../api-manager-interface/api-manager-interface.service");
const WaveApiProvider_1 = require("../../../sdk/Wave/WaveApiProvider");
const config_1 = require("../../../sdk/Wave/config");
const Controller_1 = require("../../Controller");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
const main_1 = require("../../../main");
class SeneauSnBillPaymentApiManagerService extends api_manager_interface_service_1.ApiManagerInterface {
    async checkStatusTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async confirmTransaction(params) {
        return await this.notImplementedYet(params);
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
        const billPayment = await WaveApiProvider_1.default.confirmBill({
            amount: params.dto.amount,
            billAccountNumber: params.dto.billAccountNumber,
            invoiceId: params.dto.billReference,
            billId: WaveApiProvider_1.WAVE_BILL_ID.SENEAU,
            billAccountNumberFieldName: 'client_reference',
            sessionId: config_1.waveBusinessApiConfig('sn').sessionId,
            walletId: config_1.waveBusinessApiConfig('sn').walletId,
        });
        const statues = this.helper.getStatusAfterExec((billPayment === null || billPayment === void 0 ? void 0 : billPayment.success) ? 'success' : 'failed', this.apiService.sousServices);
        console.log(billPayment, 'sttaus', statues);
        transaction.statut = statues['status'];
        transaction.preStatut = statues['preStatus'];
        transaction.sousServiceTransactionId = billPayment === null || billPayment === void 0 ? void 0 : billPayment.paymentId;
        await transaction.save();
        await this.helper.setIsCallbackReadyValue(transaction);
        this.helper.updateApiBalance(this, transaction.phonesId).then();
        if (billPayment.success) {
            transaction.message = main_1.serializeData(billPayment);
            await transaction.save();
            await this.helper.handleSuccessTransactionCreditDebit(transaction);
            console.log('Send OKK');
            return Object.assign({
                status: Enum_entity_1.StatusEnum.SUCCESS,
                codeHttp: Controller_1.CODE_HTTP.OK_OPERATION,
                partnerMessage: billPayment.message,
                transaction: transaction,
                transactionId: transaction.transactionId,
                usedPhoneId: api.id,
                data: {
                    notificationMessage: billPayment.message,
                },
            }, baseResponse);
        }
        else {
            transaction.errorMessage = main_1.serializeData(billPayment);
            await transaction.save();
            await this.helper.operationPartnerCancelTransaction(transaction);
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
                partnerMessage: billPayment.message || api_manager_interface_service_1.MANAGER_INIT_UNKNOWN_MESSAGE,
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
    async getPendingBillTransaction(params) {
        const response = await WaveApiProvider_1.default.listPendingBill({
            billAccountNumber: params.dto.billAccountNumber,
            billId: WaveApiProvider_1.WAVE_BILL_ID.SENEAU,
            billAccountNumberFieldName: 'client_reference',
            sessionId: config_1.waveBusinessApiConfig('sn').sessionId,
            walletId: config_1.waveBusinessApiConfig('sn').walletId,
        });
        return {
            success: response.success,
            message: response.message,
            pendingBills: response.bills,
            billAccountNumber: params.dto.billAccountNumber,
        };
    }
}
exports.SeneauSnBillPaymentApiManagerService = SeneauSnBillPaymentApiManagerService;
//# sourceMappingURL=seneau-sn-bill-payment-api-manager.service.js.map