"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FreeMoneyCashInApiManagerService = void 0;
const rp = require("request-promise");
const api_manager_interface_service_1 = require("../api-manager-interface/api-manager-interface.service");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
const Controller_1 = require("../../Controller");
const main_1 = require("../../../main");
const process = require("process");
const FreeMoneyApiProvider_1 = require("../../../sdk/FreeMoney/FreeMoneyApiProvider");
class FreeMoneyCashInApiManagerService extends api_manager_interface_service_1.ApiManagerInterface {
    async checkStatusTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async confirmTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async getBalance(params) {
        return FreeMoneyApiProvider_1.default.getBalance(params);
    }
    async handleCallbackTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async initTransaction(params) {
        var _a, _b, _c, _d;
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
            externalid: transaction.transactionId,
            username: process.env.FREE_MSISDN_NUMBER,
            password: process.env.FREE_MSISDN_PASSWORD,
        };
        let depositResponse;
        try {
            depositResponse = await rp({
                url: `https://gateway.free.sn/Live/Cashin`,
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
            depositResponse = {
                description: e.message,
                body: `${(_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.body}|${e === null || e === void 0 ? void 0 : e.body}|${(_b = e === null || e === void 0 ? void 0 : e.response) === null || _b === void 0 ? void 0 : _b.statusMessage}`,
                transactionid: null,
                status: 'INTERNAL_ERROR',
            };
        }
        try {
            if (typeof depositResponse.body !== 'object') {
                depositResponse = JSON.parse(depositResponse.body);
            }
            else if (typeof depositResponse.body) {
                depositResponse = depositResponse.body;
            }
        }
        catch (e) {
            depositResponse = {
                description: e.message,
                body: `${((_c = e === null || e === void 0 ? void 0 : e.response) === null || _c === void 0 ? void 0 : _c.body) || ''}|${(e === null || e === void 0 ? void 0 : e.body) || ''}|${((_d = e === null || e === void 0 ? void 0 : e.response) === null || _d === void 0 ? void 0 : _d.statusMessage) || ''}`,
                transactionid: null,
                status: 'INTERNAL_ERROR',
            };
        }
        const statues = this.helper.getStatusAfterExec(depositResponse.status === 'SUCCESS'
            ? 'success'
            : depositResponse.status === 'INTERNAL_ERROR'
                ? 'timeout'
                : 'failed', this.apiService.sousServices);
        transaction.statut = statues['status'];
        transaction.preStatut = statues['preStatus'];
        transaction.sousServiceTransactionId = depositResponse.transactionid;
        await transaction.save();
        await this.helper.setIsCallbackReadyValue(transaction, 5000);
        this.helper.updateApiBalance(this, transaction.phonesId).then();
        if (depositResponse.status === 'SUCCESS' ||
            depositResponse.status === 'INTERNAL_ERROR') {
            transaction.message = main_1.serializeData(depositResponse);
            await transaction.save();
            if (depositResponse.status === 'SUCCESS') {
                await this.helper.handleSuccessTransactionCreditDebit(transaction);
            }
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
            transaction.errorMessage = main_1.serializeData(depositResponse);
            await transaction.save();
            await this.helper.operationPartnerCancelTransaction(transaction);
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
                partnerMessage: depositResponse.message ||
                    depositResponse.description ||
                    'Impossible de procéder au transfer ressayer plus tard',
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
exports.FreeMoneyCashInApiManagerService = FreeMoneyCashInApiManagerService;
//# sourceMappingURL=free-money-cash-in-api-manager.service.js.map