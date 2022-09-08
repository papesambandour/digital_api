"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaobabPlusSnBillReloadApiManagerService = void 0;
const api_manager_interface_service_1 = require("../api-manager-interface/api-manager-interface.service");
const WaveApiProvider_1 = require("../../../sdk/Wave/WaveApiProvider");
const config_1 = require("../../../sdk/Wave/config");
const Controller_1 = require("../../Controller");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
const main_1 = require("../../../main");
class BaobabPlusSnBillReloadApiManagerService extends api_manager_interface_service_1.ApiManagerInterface {
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
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.SERVICE_DOWN,
                partnerMessage: api_manager_interface_service_1.MANAGER_INIT_DOWN_MESSAGE,
            }, baseResponse);
        }
        const transaction = await this.createTransaction(api);
        const rapido = await WaveApiProvider_1.default.makeDirectBillPay({
            amount: params.dto.amount,
            billAccountNumber: params.dto.billAccountNumber,
            sessionId: config_1.waveBusinessApiConfig('sn').sessionId,
            walletId: config_1.waveBusinessApiConfig('sn').walletId,
            billAccountNumberFieldName: 'reference_number',
            label: "L'unité BaoBab",
            billId: WaveApiProvider_1.WAVE_BILL_ID.BAOBAP_PLUS,
        });
        const statues = this.helper.getStatusAfterExec((rapido === null || rapido === void 0 ? void 0 : rapido.success) ? 'success' : 'failed', this.apiService.sousServices);
        console.log(rapido, 'sttaus', statues);
        transaction.statut = statues['status'];
        transaction.preStatut = statues['preStatus'];
        transaction.sousServiceTransactionId = rapido === null || rapido === void 0 ? void 0 : rapido.paymentId;
        await transaction.save();
        await this.helper.setIsCallbackReadyValue(transaction.id);
        this.helper.updateApiBalance(this, transaction.phonesId).then();
        if (rapido.success) {
            transaction.message = main_1.serializeData(rapido);
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
                    notificationMessage: rapido.message,
                },
            }, baseResponse);
        }
        else {
            transaction.errorMessage = main_1.serializeData(rapido);
            await transaction.save();
            await this.helper.operationPartnerCancelTransaction(transaction);
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
                partnerMessage: rapido.message,
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
exports.BaobabPlusSnBillReloadApiManagerService = BaobabPlusSnBillReloadApiManagerService;
//# sourceMappingURL=baobabplus-sn-bill-reload-api-manager.service.js.map