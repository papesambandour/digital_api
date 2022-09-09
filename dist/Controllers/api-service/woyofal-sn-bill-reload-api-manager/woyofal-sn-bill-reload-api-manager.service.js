"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WoyofalSnBillReloadApiManagerService = void 0;
const api_manager_interface_service_1 = require("../api-manager-interface/api-manager-interface.service");
const Controller_1 = require("../../Controller");
const WaveApiProvider_1 = require("../../../sdk/Wave/WaveApiProvider");
const config_1 = require("../../../sdk/Wave/config");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
const main_1 = require("../../../main");
class WoyofalSnBillReloadApiManagerService extends api_manager_interface_service_1.ApiManagerInterface {
    async checkStatusTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async confirmTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async getBalance(params) {
        return WaveApiProvider_1.default.getBalance(params, config_1.waveBusinessApiConfig('sn').cashOutApiKey, WaveApiProvider_1.default.now());
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
        const woyofal = await WaveApiProvider_1.default.makeDirectBillPay({
            amount: params.dto.amount,
            billAccountNumber: params.dto.billAccountNumber,
            sessionId: config_1.waveBusinessApiConfig('sn').sessionId,
            walletId: config_1.waveBusinessApiConfig('sn').walletId,
            billId: WaveApiProvider_1.WAVE_BILL_ID.WOYOFAL,
            billAccountNumberFieldName: 'meter_number',
            label: 'Le compteur woyofal',
            searchInSummary: '',
        });
        const statues = this.helper.getStatusAfterExec((woyofal === null || woyofal === void 0 ? void 0 : woyofal.success) ? 'success' : 'failed', this.apiService.sousServices);
        console.log(woyofal, 'sttaus', statues);
        transaction.statut = statues['status'];
        transaction.preStatut = statues['preStatus'];
        transaction.sousServiceTransactionId = woyofal === null || woyofal === void 0 ? void 0 : woyofal.paymentId;
        await transaction.save();
        await this.helper.setIsCallbackReadyValue(transaction);
        this.helper.updateApiBalance(this, transaction.phonesId).then();
        if (woyofal.success) {
            transaction.message = main_1.serializeData(woyofal);
            await transaction.save();
            await this.helper.handleSuccessTransactionCreditDebit(transaction);
            console.log('Send OKK');
            return Object.assign({
                status: Enum_entity_1.StatusEnum.SUCCESS,
                codeHttp: Controller_1.CODE_HTTP.OK_OPERATION,
                partnerMessage: api_manager_interface_service_1.MANAGER_INIT_CASH_IN_SUCCESS_MESSAGE,
                transaction: transaction,
                transactionId: transaction.transactionId,
                usedPhoneId: api.id,
                data: {
                    woyofalKwh: woyofal.woyofalKWh,
                    woyofalCode: woyofal.woyofalCode,
                    notificationMessage: woyofal.message,
                },
            }, baseResponse);
        }
        else {
            transaction.errorMessage = main_1.serializeData(woyofal);
            await transaction.save();
            await this.helper.operationPartnerCancelTransaction(transaction);
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
                partnerMessage: woyofal.message,
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
}
exports.WoyofalSnBillReloadApiManagerService = WoyofalSnBillReloadApiManagerService;
//# sourceMappingURL=woyofal-sn-bill-reload-api-manager.service.js.map