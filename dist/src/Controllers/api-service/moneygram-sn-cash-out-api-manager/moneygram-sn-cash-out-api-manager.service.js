"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneygramSnCashOutApiManagerService = void 0;
const api_manager_interface_service_1 = require("../api-manager-interface/api-manager-interface.service");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
const Controller_1 = require("../../Controller");
const main_1 = require("../../../main");
const process = require("process");
const MoneyGramReceiveProvider_1 = require("../../../sdk/MoneyGram/MoneyGramReceiveProvider");
class MoneygramSnCashOutApiManagerService extends api_manager_interface_service_1.ApiManagerInterface {
    async checkStatusTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async confirmTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async getBalance(params) {
        return {
            newBalance: 0,
            success: true,
        };
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
        console.log('initing cashout');
        const transaction = await this.createTransaction(api);
        const agentCredentials = {
            agentID: process.env.MONEYGRAM_AGENT_ID,
            agentSequence: process.env.MONEYGRAM_POS_ID,
            token: process.env.MONEYGRAM_TOKEN,
        };
        const moneyGramReceiveProvider = new MoneyGramReceiveProvider_1.MoneyGramReceiveProvider(agentCredentials);
        const response = await moneyGramReceiveProvider.receiveMoney(params.dto.amount, params.dto.moneygramReceptionData.receptionServiceReceiveDetails);
        const statues = this.helper.getStatusAfterExec(response.success ? 'success' : 'failed', this.apiService.sousServices);
        transaction.statut = statues['status'];
        transaction.preStatut = statues['preStatus'];
        transaction.sousServiceTransactionId =
            (_a = response === null || response === void 0 ? void 0 : response.commitTransactionResponse) === null || _a === void 0 ? void 0 : _a.referenceNumber;
        await transaction.save();
        await this.helper.setIsCallbackReadyValue(transaction, 5000);
        this.helper.updateApiBalance(this, transaction.phonesId).then();
        if (response === null || response === void 0 ? void 0 : response.success) {
            transaction.message = main_1.serializeData(response, 5);
            await transaction.save();
            await this.helper.handleSuccessTransactionCreditDebit(transaction);
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
            transaction.errorMessage = main_1.serializeData(response);
            await transaction.save();
            await this.helper.operationPartnerCancelTransaction(transaction);
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
                partnerMessage: response.errorMessage ||
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
exports.MoneygramSnCashOutApiManagerService = MoneygramSnCashOutApiManagerService;
//# sourceMappingURL=moneygram-sn-cash-out-api-manager.service.js.map