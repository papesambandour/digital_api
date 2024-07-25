"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LamAirtimeApiManagerService = void 0;
const rp = require("request-promise");
const api_manager_interface_service_1 = require("../api-manager-interface/api-manager-interface.service");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
const Controller_1 = require("../../Controller");
const main_1 = require("../../../main");
const process = require("process");
class LamAirtimeApiManagerService extends api_manager_interface_service_1.ApiManagerInterface {
    async checkStatusTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async confirmTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async getBalance(params) {
        return {
            success: true,
            newBalance: LamAirtimeApiManagerService.latestBalance || 0,
        };
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
            login: process.env.LAM_LOGIN,
            password: process.env.LAM_PASSWORD,
            montant: params.dto.amount,
            telephone: `221${params.dto.amount}`,
            operateur: this.constructor.operatorCode,
            callback: 'https://api.intech.sn/api-services/callback/lam-airtime',
        };
        let airtimeResponse;
        try {
            airtimeResponse = await rp({
                url: `https://airtime.lafricamobile.com/airtime`,
                method: 'POST',
                rejectUnauthorized: false,
                body: data,
                json: true,
                simple: true,
                headers: {},
                resolveWithFullResponse: true,
            });
        }
        catch (e) {
            airtimeResponse = {
                message: e.message,
                status: 'INTERNAL_ERROR_LAM',
            };
        }
        if (typeof airtimeResponse.body !== 'object') {
            airtimeResponse = JSON.parse(airtimeResponse.body);
        }
        else if (typeof airtimeResponse.body) {
            airtimeResponse = airtimeResponse.body;
        }
        const statues = this.helper.getStatusAfterExec(airtimeResponse.status === 'PENDING' ||
            airtimeResponse.status === 'SUCCESSFUL'
            ? 'success'
            : 'failed', this.apiService.sousServices);
        transaction.statut = statues['status'];
        transaction.preStatut = statues['preStatus'];
        if (airtimeResponse.gu_transaction_id) {
            transaction.sousServiceTransactionId = `${airtimeResponse.gu_transaction_id}|${airtimeResponse.partner_transaction_id}`;
        }
        await transaction.save();
        if (airtimeResponse.status === 'PENDING' ||
            airtimeResponse.status === 'SUCCESSFUL') {
            transaction.message = main_1.serializeData(airtimeResponse);
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
            transaction.errorMessage = main_1.serializeData(airtimeResponse);
            await transaction.save();
            await this.helper.operationPartnerCancelTransaction(transaction);
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
                partnerMessage: airtimeResponse.message ||
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
exports.LamAirtimeApiManagerService = LamAirtimeApiManagerService;
LamAirtimeApiManagerService.latestBalance = 0;
LamAirtimeApiManagerService.operatorCode = 'ORANGESN';
//# sourceMappingURL=lam-airtime-manager.service.js.map