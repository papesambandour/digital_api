"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoovBjCashOutApiManagerService = void 0;
const api_manager_interface_service_1 = require("../api-manager-interface/api-manager-interface.service");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
const Controller_1 = require("../../Controller");
const main_1 = require("../../../main");
const Parteners_entity_1 = require("../../../Models/Entities/Parteners.entity");
const MoovProvider_1 = require("../../../sdk/Moov/MoovProvider");
class MoovBjCashOutApiManagerService extends api_manager_interface_service_1.ApiManagerInterface {
    async checkStatusTransaction(params) {
        return await MoovProvider_1.MoovProvider.checkTransaction(params, this);
    }
    async confirmTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async getBalance(params) {
        return await MoovProvider_1.MoovProvider.getBalance(MoovBjCashOutApiManagerService.MOOV_BJ_LAST_BALANCE_MESSAGE);
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
        const partner = await Parteners_entity_1.Parteners.findOne(transaction.partenersId);
        const message = `Paiement de ${transaction.amount} CFA pour ${params.dto.sender || partner.name}. Veuillez
saisir votre code secret pour confirmer ou tapez 0 pour annuler.`;
        const checkout = await MoovProvider_1.MoovProvider.makeCheckout(`229${params.dto.phone}`, transaction.amount, transaction.transactionId.toString(), message);
        const statues = this.helper.getStatusAfterExec(checkout.success ? 'success' : 'failed', this.apiService.sousServices);
        console.log(checkout, 'sttaus', statues);
        transaction.statut = statues['status'];
        transaction.preStatut = statues['preStatus'];
        transaction.sousServiceTransactionId = checkout === null || checkout === void 0 ? void 0 : checkout.referenceId;
        await transaction.save();
        if (checkout === null || checkout === void 0 ? void 0 : checkout.success) {
            transaction.message = main_1.serializeData(checkout);
            transaction.needCheckTransaction = 1;
            await transaction.save();
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
            transaction.errorMessage = main_1.serializeData(checkout);
            await transaction.save();
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
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
exports.MoovBjCashOutApiManagerService = MoovBjCashOutApiManagerService;
MoovBjCashOutApiManagerService.MOOV_BJ_LAST_BALANCE_MESSAGE = '';
MoovBjCashOutApiManagerService.MOOV_BJ_LAST_BALANCE = undefined;
//# sourceMappingURL=moov-bj-cash-out-api-manager.service.js.map