"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MtnBjCashOutApiManagerService = void 0;
const api_manager_interface_service_1 = require("../api-manager-interface/api-manager-interface.service");
const MtnApiProvider_1 = require("../../../sdk/Mtn/MtnApiProvider");
const config_1 = require("../../../sdk/Mtn/config");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
const Controller_1 = require("../../Controller");
const main_1 = require("../../../main");
const Parteners_entity_1 = require("../../../Models/Entities/Parteners.entity");
class MtnBjCashOutApiManagerService extends api_manager_interface_service_1.ApiManagerInterface {
    async checkStatusTransaction(params) {
        const collections = await MtnApiProvider_1.MtnApiProvider.getCollection(MtnBjCashOutApiManagerService.country);
        return await MtnApiProvider_1.MtnApiProvider.checkOperationStatus(this, params, collections);
    }
    async confirmTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async getBalance(params) {
        console.log('geting balance');
        const collections = await MtnApiProvider_1.MtnApiProvider.getCollection(MtnBjCashOutApiManagerService.country);
        return await MtnApiProvider_1.MtnApiProvider.getBalance(collections);
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
        const partner = await Parteners_entity_1.Parteners.findOne(transaction.partenersId);
        const collections = await MtnApiProvider_1.MtnApiProvider.getCollection(MtnBjCashOutApiManagerService.country);
        let transactionId;
        try {
            transactionId = await collections.requestToPay({
                amount: transaction.amount,
                currency: config_1.mtnApiConfig(MtnBjCashOutApiManagerService.country).collection
                    .currency,
                externalId: transaction.transactionId.toString(),
                payer: {
                    partyIdType: 'MSISDN',
                    partyId: '229' + transaction.phone,
                },
                payerMessage: `Paiement de ${transaction.amount} CFA pour ${params.dto.sender || partner.name}. ID: ${transaction.transactionId}`,
                payeeNote: `Reception de ${transaction.amount} du numero ${transaction.phone} depuis ${params.dto.sender || partner.name}. ID: ${transaction.transactionId}`,
                callbackUrl: config_1.mtnApiConfig(MtnBjCashOutApiManagerService.country)
                    .collection.callback,
            });
            const transactionInfo = await collections.getTransaction(transactionId);
            console.log(transactionId, transactionInfo, 'heree');
            const statues = this.helper.getStatusAfterExec('success', this.apiService.sousServices);
            transaction.statut = statues['status'];
            transaction.preStatut = statues['preStatus'];
            transaction.sousServiceTransactionId = transactionId;
            await transaction.save();
            transaction.message = main_1.serializeData(transactionInfo);
            transaction.needCheckTransaction = 1;
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
        catch (e) {
            console.log(e.message);
            console.log('error while requesting');
            const statues = this.helper.getStatusAfterExec('failed', this.apiService.sousServices);
            transaction.statut = statues['status'];
            transaction.preStatut = statues['preStatus'];
            transaction.sousServiceTransactionId = transactionId;
            await transaction.save();
            transaction.errorMessage = main_1.serializeData(e.transaction || e.message);
            await transaction.save();
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
                partnerMessage: MtnApiProvider_1.MtnApiProvider.getMessageFromCode((_a = e.transaction) === null || _a === void 0 ? void 0 : _a.reason),
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
exports.MtnBjCashOutApiManagerService = MtnBjCashOutApiManagerService;
MtnBjCashOutApiManagerService.country = 'bj';
//# sourceMappingURL=mtn-bj-cash-out-api-manager.service.js.map