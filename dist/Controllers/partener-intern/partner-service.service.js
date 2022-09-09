"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerServiceService = void 0;
const common_1 = require("@nestjs/common");
const helper_service_1 = require("../../helper.service");
const Enum_entity_1 = require("../../Models/Entities/Enum.entity");
const main_1 = require("../../main");
let PartnerServiceService = class PartnerServiceService {
    constructor(helper) {
        this.helper = helper;
    }
    async refund(refundDtoIn) {
        const transaction = await this.helper.getTransactionById(refundDtoIn.transactionId, []);
        const canRefund = await this.helper.canRefundOperation(transaction);
        if (!canRefund.allow) {
            return {
                status: Enum_entity_1.StatusEnum.FAILLED,
                message: canRefund.message,
            };
        }
        const apiManager = (await this.helper.getApiManagerInterface(transaction.codeSousService, null));
        const refund = await apiManager.refundTransaction({
            transaction: transaction,
        });
        transaction.refundResponse = main_1.serializeData(refund);
        await transaction.save();
        if (refund.status === Enum_entity_1.StatusEnum.SUCCESS) {
            await this.helper.handleTransactionRefundSuccess(transaction);
        }
        return {
            status: refund.status,
            message: refund.partnerMessage,
        };
    }
    async importBankTransfer(importBankTransferBulkDto) {
        const outResult = [];
        const batchId = this.helper.generateTransactionId();
        for (const dtoIn of importBankTransferBulkDto) {
            const transaction = await this.helper.getTransactionById(dtoIn.id);
            const tmp = Object.assign({}, dtoIn);
            if (!transaction) {
                tmp.statutTreatment = 'FAILED';
                tmp.messageTreatment = `La transaction est introuvable`;
                outResult.push(tmp);
                continue;
            }
            if (transaction.codeSousService !==
                Enum_entity_1.SOUS_SERVICE_ENUM.BANK_TRANSFER_SN_API_CASH_IN) {
                tmp.statutTreatment = 'FAILED';
                tmp.messageTreatment = `La transaction n'est pas un transfert bancaire: ${transaction.codeSousService}`;
                outResult.push(tmp);
                continue;
            }
            if (transaction.statut !== Enum_entity_1.StatusEnum.PROCESSING) {
                tmp.statutTreatment = 'FAILED';
                tmp.messageTreatment = `La transaction a déjà été traitée: statut: ${transaction.statut}`;
                outResult.push(tmp);
                continue;
            }
            if (!['SUCCESS', 'FAILED'].includes(dtoIn.statut)) {
                tmp.statutTreatment = 'FAILED';
                tmp.messageTreatment = `Un statut inconnu a été donné pour le traitement: ${dtoIn.statut}`;
                outResult.push(tmp);
                continue;
            }
            if (dtoIn.statut === 'SUCCESS') {
                transaction.statut = Enum_entity_1.StatusEnum.SUCCESS;
                transaction.preStatut = Enum_entity_1.StatusEnum.SUCCESS;
                transaction.importBatchId = batchId;
                await transaction.save();
                await this.helper.handleSuccessTransactionCreditDebit(transaction);
                await this.helper.setIsCallbackReadyValue(transaction.id);
                tmp.statutTreatment = 'SUCCESS';
                tmp.messageTreatment = `OK`;
                outResult.push(tmp);
            }
            else {
                transaction.statut = Enum_entity_1.StatusEnum.FAILLED;
                transaction.preStatut = Enum_entity_1.StatusEnum.FAILLED;
                transaction.errorMessage = dtoIn.message;
                transaction.importBatchId = batchId;
                await transaction.save();
                await this.helper.provideErrorType(transaction === null || transaction === void 0 ? void 0 : transaction.id);
                await this.helper.operationPartnerCancelTransaction(transaction);
                await this.helper.setIsCallbackReadyValue(transaction.id);
                tmp.statutTreatment = 'FAILED';
                tmp.messageTreatment = `KO`;
                outResult.push(tmp);
            }
        }
        return outResult;
    }
};
PartnerServiceService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [helper_service_1.HelperService])
], PartnerServiceService);
exports.PartnerServiceService = PartnerServiceService;
//# sourceMappingURL=partner-service.service.js.map