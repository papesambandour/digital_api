"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankTransferSnCashInApiManagerService = void 0;
const api_manager_interface_service_1 = require("../api-manager-interface/api-manager-interface.service");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
const Controller_1 = require("../../Controller");
class BankTransferSnCashInApiManagerService extends api_manager_interface_service_1.ApiManagerInterface {
    async checkStatusTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async confirmTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async getBalance(params) {
        return Promise.resolve({
            success: false,
            newBalance: null,
        });
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
        const ribData = this.helper.ribFromString(params.dto.rib, 'sn');
        if (!ribData.rib.isValid) {
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.SERVICE_DOWN,
                partnerMessage: "Le rib saisie n'est pas un rib valid pour le Sénégal, veuillez respecter ce format: SN000 00000 000000000000 00",
            }, baseResponse);
        }
        const transaction = await this.createTransaction(api);
        const statues = this.helper.getStatusAfterExec('success', this.apiService.sousServices);
        transaction.statut = statues['status'];
        transaction.preStatut = statues['preStatus'];
        transaction.rib = ribData.rib.value;
        transaction.customerFirstName = params.dto.customerFirstName;
        transaction.customerLastName = params.dto.customerLastName;
        transaction.customerEmail = params.dto.customerEmail || null;
        await transaction.save();
        transaction.message = JSON.stringify(ribData);
        await transaction.save();
        console.log('Send OKK');
        return Object.assign({
            status: Enum_entity_1.StatusEnum.PENDING,
            codeHttp: Controller_1.CODE_HTTP.OK_OPERATION,
            partnerMessage: `Le virement de ${transaction.amount} CFA vers ${ribData.rib.value} est en cours de traitement`,
            transaction: transaction,
            transactionId: transaction.transactionId,
            usedPhoneId: api.id,
        }, baseResponse);
    }
    async refundTransaction(params) {
        return await this.notImplementedYet(params);
    }
}
exports.BankTransferSnCashInApiManagerService = BankTransferSnCashInApiManagerService;
//# sourceMappingURL=bank-transfer-sn-cash-in-api-manager.service.js.map