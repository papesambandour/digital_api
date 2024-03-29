"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoovBjCashInApiManagerService = void 0;
const api_manager_interface_service_1 = require("../api-manager-interface/api-manager-interface.service");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
const Controller_1 = require("../../Controller");
const main_1 = require("../../../main");
const Parteners_entity_1 = require("../../../Models/Entities/Parteners.entity");
const MoovProvider_1 = require("../../../sdk/Moov/MoovProvider");
class MoovBjCashInApiManagerService extends api_manager_interface_service_1.ApiManagerInterface {
    async checkStatusTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async confirmTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async getBalance(params) {
        return await MoovProvider_1.MoovProvider.getBalance(MoovBjCashInApiManagerService.MOOV_BJ_LAST_BALANCE_MESSAGE);
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
        const message = `Reception de ${transaction.amount} CFA par ${params.dto.sender || partner.name}. ID: ${transaction.transactionId}`;
        const response = await MoovProvider_1.MoovProvider.makeTransferTo(`229${params.dto.phone}`, transaction.amount, transaction.transactionId.toString(), message);
        const statues = this.helper.getStatusAfterExec(response.success ? 'success' : 'failed', this.apiService.sousServices);
        console.log(response, 'sttaus', statues);
        transaction.statut = statues['status'];
        transaction.preStatut = statues['preStatus'];
        transaction.sousServiceTransactionId = response.referenceId;
        await transaction.save();
        await this.helper.setIsCallbackReadyValue(transaction, 5000);
        this.helper.updateApiBalance(this, transaction.phonesId).then();
        if (response.success) {
            transaction.message = main_1.serializeData(response);
            transaction.needCheckTransaction = 0;
            await transaction.save();
            await this.helper.handleSuccessTransactionCreditDebit(transaction);
            console.log('Send OKK');
            return Object.assign({
                status: Enum_entity_1.StatusEnum.PENDING,
                codeHttp: Controller_1.CODE_HTTP.OK_OPERATION,
                partnerMessage: api_manager_interface_service_1.MANAGER_INIT_CASH_IN_SUCCESS_MESSAGE,
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
                partnerMessage: 'Impossible de procéder au transfer: ' + response.message,
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
exports.MoovBjCashInApiManagerService = MoovBjCashInApiManagerService;
MoovBjCashInApiManagerService.MOOV_BJ_LAST_BALANCE_MESSAGE = '';
MoovBjCashInApiManagerService.MOOV_BJ_LAST_BALANCE = undefined;
//# sourceMappingURL=moov-bj-cash-in-api-manager.service.js.map