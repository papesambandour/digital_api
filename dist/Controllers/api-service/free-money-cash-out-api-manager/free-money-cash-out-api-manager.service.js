"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FreeMoneyCashOutApiManagerService = void 0;
const rp = require("request-promise");
const api_manager_interface_service_1 = require("../api-manager-interface/api-manager-interface.service");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
const Controller_1 = require("../../Controller");
const main_1 = require("../../../main");
const process = require("process");
class FreeMoneyCashOutApiManagerService extends api_manager_interface_service_1.ApiManagerInterface {
    async checkStatusTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async confirmTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async getBalance(params) {
        return await this.notImplementedYet(params);
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
        const data = {
            amount: transaction.amount,
            currency: 'XOF',
            agentmsisdn: process.env.FREE_MSISDN_NUMBER,
            customermsisdn: transaction.phone,
            externaltransactionid: transaction.transactionId,
            externalid: transaction.transactionId,
            username: process.env.FREE_MSISDN_NUMBER,
            password: process.env.FREE_MSISDN_PASSWORD,
        };
        let paymentResponse;
        try {
            paymentResponse = await rp({
                url: `https://gateway.free.sn/Live/Cashout`,
                method: 'POST',
                rejectUnauthorized: false,
                body: data,
                json: true,
                simple: true,
                headers: {
                    APP_ACCESS_TOKEN: process.env.INTECH_SECURE_3DS_ACCESS_TOKEN,
                },
                resolveWithFullResponse: true,
            });
        }
        catch (e) {
            paymentResponse = {
                description: e.message,
            };
        }
        try {
            paymentResponse = JSON.parse(paymentResponse.body);
        }
        catch (e) {
            if (typeof paymentResponse.body === 'string') {
                paymentResponse = {
                    description: paymentResponse.body,
                };
            }
        }
        const statues = this.helper.getStatusAfterExec(paymentResponse.status === 'PENDING' ? 'success' : 'failed', this.apiService.sousServices);
        transaction.statut = statues['status'];
        transaction.preStatut = statues['preStatus'];
        transaction.sousServiceTransactionId = paymentResponse.transactionid;
        await transaction.save();
        if (paymentResponse.status === 'PENDING') {
            transaction.message = main_1.serializeData(paymentResponse);
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
            transaction.errorMessage = main_1.serializeData(paymentResponse);
            await transaction.save();
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
                partnerMessage: paymentResponse.message ||
                    paymentResponse.description ||
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
exports.FreeMoneyCashOutApiManagerService = FreeMoneyCashOutApiManagerService;
//# sourceMappingURL=free-money-cash-out-api-manager.service.js.map