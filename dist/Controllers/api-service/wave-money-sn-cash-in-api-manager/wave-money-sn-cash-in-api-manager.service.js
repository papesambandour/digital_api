"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaveMoneySnCashInApiManagerService = void 0;
const api_manager_interface_service_1 = require("../api-manager-interface/api-manager-interface.service");
const Controller_1 = require("../../Controller");
const config_1 = require("../../../sdk/Wave/config");
const WaveApiProvider_1 = require("../../../sdk/Wave/WaveApiProvider");
class WaveMoneySnCashInApiManagerService extends api_manager_interface_service_1.ApiManagerInterface {
    async checkStatusTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async confirmTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async getBalance(params) {
        return WaveApiProvider_1.default.getBalance(params, config_1.waveBusinessApiConfig().cashOutApiKey, WaveApiProvider_1.default.now());
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
        const response = await WaveApiProvider_1.default.SendWaveMoneyBusiness({
            toPhoneNumber: `+221${params.dto.phone}`,
            sender: params.dto.sender || '',
            amount: params.dto.amount,
            sessionId: config_1.waveBusinessApiConfig().sessionId,
            walletId: config_1.waveBusinessApiConfig().walletId,
        });
        const statues = this.helper.getStatusAfterExec(response.success ? 'success' : 'failed', this.apiService.sousServices);
        console.log(response, 'sttaus', statues);
        transaction.statut = statues['status'];
        transaction.preStatut = statues['preStatus'];
        transaction.sousServiceTransactionId = response.reference;
        await transaction.save();
        await this.helper.setIsCallbackReadyValue(transaction.id);
        if (response.success) {
            transaction.message = JSON.stringify(response.fullResponse);
            transaction.needCheckTransaction = 1;
            await transaction.save();
            console.log('Send OKK');
            return Object.assign({
                status: 'SUCCESS',
                codeHttp: Controller_1.CODE_HTTP.OK_OPERATION,
                partnerMessage: api_manager_interface_service_1.MANAGER_INIT_CASH_IN_SUCCESS_MESSAGE,
                transaction: transaction,
                transactionId: transaction.transactionId,
                usedPhoneId: api.id,
            }, baseResponse);
        }
        else {
            transaction.errorMessage = JSON.stringify(response.fullResponse);
            await transaction.save();
            return Object.assign({
                status: 'FAILLED',
                codeHttp: Controller_1.CODE_HTTP.SERVICE_DOWN,
                partnerMessage: response.message,
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
exports.WaveMoneySnCashInApiManagerService = WaveMoneySnCashInApiManagerService;
//# sourceMappingURL=wave-money-sn-cash-in-api-manager.service.js.map