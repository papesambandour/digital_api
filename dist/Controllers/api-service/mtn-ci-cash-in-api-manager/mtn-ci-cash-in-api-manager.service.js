"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MtnCiCashInApiManagerService = void 0;
const api_manager_interface_service_1 = require("../api-manager-interface/api-manager-interface.service");
const MtnApiProvider_1 = require("../../../sdk/Mtn/MtnApiProvider");
const config_1 = require("../../../sdk/Mtn/config");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
const Controller_1 = require("../../Controller");
const ProviderOrangeMoneyApi_1 = require("../../../sdk/Orange/ProviderOrangeMoneyApi");
const main_1 = require("../../../main");
const Parteners_entity_1 = require("../../../Models/Entities/Parteners.entity");
class MtnCiCashInApiManagerService extends api_manager_interface_service_1.ApiManagerInterface {
    async checkStatusTransaction(params) {
        return await MtnApiProvider_1.MtnApiProvider.checkOperationStatus(this, params, config_1.mtnApiConfig(MtnCiCashInApiManagerService.country).remittance);
    }
    async confirmTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async getBalance(params) {
        return await MtnApiProvider_1.MtnApiProvider.getBalance(config_1.mtnApiConfig(MtnCiCashInApiManagerService.country).remittance);
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
        const referenceUid = this.helper.uuid();
        const partner = await Parteners_entity_1.Parteners.findOne(transaction.partenersId);
        const response = await MtnApiProvider_1.MtnApiProvider.initOperation({
            amount: transaction.amount,
            phoneNumber: transaction.phone,
            externalId: transaction.id.toString(),
            reference: referenceUid,
        }, config_1.mtnApiConfig(MtnCiCashInApiManagerService.country).remittance, `payer: Transfer de ${transaction.amount} CFA par ${partner.name}`, `payee: Transfer de ${transaction.amount} CFA par ${partner.name}`);
        const statues = this.helper.getStatusAfterExec(response.success ? 'success' : 'failed', this.apiService.sousServices);
        transaction.statut = statues['status'];
        transaction.preStatut = statues['preStatus'];
        transaction.sousServiceTransactionId = referenceUid;
        await transaction.save();
        if (response.success) {
            transaction.message = main_1.serializeData(response);
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
        else {
            console.log('error while requesting');
            transaction.errorMessage = main_1.serializeData(response);
            await transaction.save();
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
                partnerMessage: ProviderOrangeMoneyApi_1.default.getMessageFromCode(response.code),
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
exports.MtnCiCashInApiManagerService = MtnCiCashInApiManagerService;
MtnCiCashInApiManagerService.country = 'ci';
//# sourceMappingURL=mtn-ci-cash-in-api-manager.service.js.map