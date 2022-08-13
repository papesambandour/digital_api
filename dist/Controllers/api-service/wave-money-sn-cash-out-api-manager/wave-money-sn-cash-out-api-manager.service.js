"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaveMoneySnCashOutApiManagerService = void 0;
const api_manager_interface_service_1 = require("../api-manager-interface/api-manager-interface.service");
const Controller_1 = require("../../Controller");
const WaveApiProvider_1 = require("../../../sdk/Wave/WaveApiProvider");
const config_1 = require("../../../sdk/Wave/config");
class WaveMoneySnCashOutApiManagerService extends api_manager_interface_service_1.ApiManagerInterface {
    async checkStatusTransaction(params) {
        return WaveApiProvider_1.default.apiManagerCheckCashOutStatusTransaction(this, params);
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
        const checkout = await WaveApiProvider_1.default.makeCheckout({
            idemPotency: `${transaction.transactionId}_${transaction.id}`,
            amount: transaction.amount,
            token: config_1.waveBusinessApiConfig().cashOutApiKey,
            success_url: params.dto.successRedirectUrl,
            error_url: params.dto.errorRedirectUrl,
            client_reference: transaction.transactionId,
            override_business_name: params.dto.sender,
        });
        if (checkout) {
            checkout.success = !!(checkout === null || checkout === void 0 ? void 0 : checkout.wave_launch_url);
        }
        const statues = this.helper.getStatusAfterExec(checkout === null || checkout === void 0 ? void 0 : checkout.success, this.apiService.sousServices);
        console.log(checkout, 'sttaus', statues);
        transaction.statut = statues['status'];
        transaction.preStatut = statues['preStatus'];
        transaction.sousServiceTransactionId = checkout === null || checkout === void 0 ? void 0 : checkout.id;
        await transaction.save();
        if (checkout === null || checkout === void 0 ? void 0 : checkout.success) {
            transaction.message = JSON.stringify(checkout);
            transaction.needCheckTransaction = 1;
            await transaction.save();
            console.log('Send OKK');
            const messageNotification = `Bonjour, cliquez sur le lien suivant pour valider la transaction de ${transaction.amount}. ${checkout.wave_launch_url}\n(Expire dans 15 minutes)\nBy InTech`;
            this.helper
                .sendSms([`+221${params.dto.phone}`], messageNotification, 'Pay WAVE')
                .then();
            return Object.assign({
                status: 'SUCCESS',
                codeHttp: Controller_1.CODE_HTTP.OK_OPERATION,
                partnerMessage: api_manager_interface_service_1.MANAGER_INIT_CASH_OUT_SUCCESS_MESSAGE,
                transaction: transaction,
                transactionId: transaction.transactionId,
                usedPhoneId: api.id,
                data: {
                    message: messageNotification,
                    amount: transaction.amount,
                    url: checkout.wave_launch_url,
                },
            }, baseResponse);
        }
        else {
            transaction.errorMessage = JSON.stringify(checkout);
            await transaction.save();
            return Object.assign({
                status: 'FAILLED',
                codeHttp: Controller_1.CODE_HTTP.SERVICE_DOWN,
                partnerMessage: 'Impossible de procéder au paiement ressayer plus tard',
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
exports.WaveMoneySnCashOutApiManagerService = WaveMoneySnCashOutApiManagerService;
//# sourceMappingURL=wave-money-sn-cash-out-api-manager.service.js.map