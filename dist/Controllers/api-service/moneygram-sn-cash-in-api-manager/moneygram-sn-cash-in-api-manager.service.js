"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneygramSnCashInApiManagerService = void 0;
const api_manager_interface_service_1 = require("../api-manager-interface/api-manager-interface.service");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
const Controller_1 = require("../../Controller");
const main_1 = require("../../../main");
const process = require("process");
const MoneyGramSendProvider_1 = require("../../../sdk/MoneyGram/MoneyGramSendProvider");
const MoneyGramReversalProvider_1 = require("../../../sdk/MoneyGram/MoneyGramReversalProvider");
class MoneygramSnCashInApiManagerService extends api_manager_interface_service_1.ApiManagerInterface {
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
        const moneyGramSendProvider = new MoneyGramSendProvider_1.MoneyGramSendProvider(agentCredentials);
        const response = await moneyGramSendProvider.sendMoney(params.dto.amount, params.dto.moneygramSendData.senderDetails, params.dto.moneygramSendData.receiverDetails);
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
                data: {
                    referenceNumber: response.commitTransactionResponse.referenceNumber,
                },
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        const baseResponse = {
            phone: (_b = (_a = params.transaction) === null || _a === void 0 ? void 0 : _a.phone) !== null && _b !== void 0 ? _b : null,
            amount: (_e = (_d = (_c = params.transaction) === null || _c === void 0 ? void 0 : _c.amount) === null || _d === void 0 ? void 0 : _d.toString()) !== null && _e !== void 0 ? _e : null,
            externalTransactionId: (_g = (_f = params.transaction) === null || _f === void 0 ? void 0 : _f.externalTransactionId) !== null && _g !== void 0 ? _g : null,
            codeService: (_j = (_h = params.transaction) === null || _h === void 0 ? void 0 : _h.codeSousService) !== null && _j !== void 0 ? _j : null,
            callbackUrl: (_l = (_k = params.transaction) === null || _k === void 0 ? void 0 : _k.urlIpn) !== null && _l !== void 0 ? _l : null,
            transactionId: (_o = (_m = params.transaction) === null || _m === void 0 ? void 0 : _m.transactionId) !== null && _o !== void 0 ? _o : null,
        };
        const canRefund = await this.helper.canRefundOperation(params.transaction);
        if (!canRefund.allow) {
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.FAILLED,
                partnerMessage: canRefund.message,
            }, baseResponse);
        }
        if (!params.transaction.sousServiceTransactionId) {
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.FAILLED,
                partnerMessage: 'Numéro de référence MoneyGram manquant',
            }, baseResponse);
        }
        try {
            const agentCredentials = {
                agentID: process.env.MONEYGRAM_AGENT_ID,
                agentSequence: process.env.MONEYGRAM_POS_ID,
                token: process.env.MONEYGRAM_TOKEN,
            };
            const moneyGramReversalProvider = new MoneyGramReversalProvider_1.MoneyGramReversalProvider(agentCredentials);
            const reversalData = {
                reversalDetails: {
                    referenceNumber: params.transaction.sousServiceTransactionId,
                    operatorName: (params.moneyGramOperatorName ||
                        process.env.MONEYGRAM_OPERATOR_NAME ||
                        'SYSTEM')
                        .toString()
                        .substring(0, 7),
                    sendReversalReason: params.moneyGramSendReversalReason || 'INCORRECT_AMT',
                    feeRefund: params.moneyGramFeeRefund || 'Y',
                    agentCheckNumber: (params.moneyGramAgentCheckNumber ||
                        params.transaction.id ||
                        'DEFAULT_CHECK')
                        .toString()
                        .substring(0, 12),
                    agentCheckType: params.moneyGramAgentCheckType || 'MTC',
                },
            };
            const reversalResult = await moneyGramReversalProvider.reverse(reversalData);
            if (reversalResult.success) {
                console.log('MoneyGram refund successful');
                await this.helper.handleTransactionRefundSuccess(params.transaction);
                return Object.assign({
                    status: Enum_entity_1.StatusEnum.SUCCESS,
                    codeHttp: Controller_1.CODE_HTTP.OK_OPERATION,
                    partnerMessage: 'Remboursement MoneyGram réussi',
                    data: {
                        reversalType: (_p = reversalResult.reversalResponse) === null || _p === void 0 ? void 0 : _p.reversalType,
                        refundAmount: (_q = reversalResult.reversalResponse) === null || _q === void 0 ? void 0 : _q.refundTotalAmount,
                        transactionDateTime: (_r = reversalResult.reversalResponse) === null || _r === void 0 ? void 0 : _r.transactionDateTime,
                    },
                }, baseResponse);
            }
            else {
                console.error('MoneyGram refund failed:', reversalResult.errorMessage);
                return Object.assign({
                    status: Enum_entity_1.StatusEnum.FAILLED,
                    codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
                    partnerMessage: reversalResult.errorMessage || 'Échec du remboursement MoneyGram',
                }, baseResponse);
            }
        }
        catch (error) {
            console.error('Error during MoneyGram refund:', error);
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
                partnerMessage: 'Erreur lors du remboursement MoneyGram: ' + error.message,
            }, baseResponse);
        }
    }
}
exports.MoneygramSnCashInApiManagerService = MoneygramSnCashInApiManagerService;
//# sourceMappingURL=moneygram-sn-cash-in-api-manager.service.js.map