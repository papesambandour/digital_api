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
const SousServices_entity_1 = require("../../Models/Entities/SousServices.entity");
const Phones_entity_1 = require("../../Models/Entities/Phones.entity");
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
        const batchId = this.helper.generateRandomId('B_');
        const dateExport = new Date();
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
                transaction.exportBankAt = dateExport;
                await transaction.save();
                await this.helper.handleSuccessTransactionCreditDebit(transaction);
                await this.helper.setIsCallbackReadyValue(transaction);
                tmp.statutTreatment = 'SUCCESS';
                tmp.messageTreatment = `OK`;
                outResult.push(tmp);
            }
            else {
                transaction.statut = Enum_entity_1.StatusEnum.FAILLED;
                transaction.preStatut = Enum_entity_1.StatusEnum.FAILLED;
                transaction.errorMessage = dtoIn.message;
                transaction.importBatchId = batchId;
                transaction.exportBankAt = dateExport;
                await transaction.save();
                await this.helper.provideErrorType(transaction);
                await this.helper.operationPartnerCancelTransaction(transaction);
                await this.helper.setIsCallbackReadyValue(transaction);
                tmp.statutTreatment = 'FAILED';
                tmp.messageTreatment = `KO`;
                outResult.push(tmp);
            }
        }
        return outResult;
    }
    async servicesBalance() {
        const sousServices = await SousServices_entity_1.SousServices.find({});
        const balances = [];
        for (const s of sousServices) {
            const phonesService = await Phones_entity_1.Phones.find({
                where: {
                    servicesId: s.servicesId,
                },
            });
            balances.push({
                codeService: s.code,
                balance: phonesService.reduce((acc, cur) => acc + cur.solde, 0),
                balanceApi: phonesService.reduce((acc, cur) => acc + cur.soldeApi, 0),
            });
        }
        return balances;
    }
    async setSuccessOrFailed(setStatusDtoIn, status) {
        const transaction = await this.helper.getTransactionById(setStatusDtoIn.id);
        if (!transaction) {
            return {
                id: setStatusDtoIn.id,
                statutTreatment: 'FAILED',
                messageTreatment: 'La transaction est introuvable',
            };
        }
        if (![
            Enum_entity_1.StatusEnum.PROCESSING.toString(),
            Enum_entity_1.StatusEnum.PENDING.toString(),
        ].includes(transaction.statut)) {
            return {
                id: setStatusDtoIn.id,
                statutTreatment: 'FAILED',
                messageTreatment: `Le statut transaction (${transaction.statut}) ne permet pas de changer son etat`,
            };
        }
        let treatmentMessage = '';
        if (status === 'failed') {
            transaction.statut = Enum_entity_1.StatusEnum.FAILLED;
            transaction.preStatut = Enum_entity_1.StatusEnum.FAILLED;
            transaction.errorMessage = setStatusDtoIn.message;
            transaction.needCheckTransaction = 0;
            treatmentMessage = `Le statut transaction a ete marque comme echec`;
            await transaction.save();
            await this.helper.operationPartnerCancelTransaction(transaction);
        }
        else if (status === 'success') {
            transaction.statut = Enum_entity_1.StatusEnum.SUCCESS;
            transaction.preStatut = Enum_entity_1.StatusEnum.SUCCESS;
            transaction.message = setStatusDtoIn.message;
            transaction.needCheckTransaction = 0;
            treatmentMessage = `Le statut transaction a ete marque comme reussi`;
            await transaction.save();
            await this.helper.handleSuccessTransactionCreditDebit(transaction);
        }
        await this.helper.setIsCallbackReadyValue(transaction);
        return {
            id: setStatusDtoIn.id,
            statutTreatment: 'SUCCESS',
            messageTreatment: treatmentMessage,
        };
    }
    async sendNotification(sendNotificationDtoIn) {
        this.helper
            .notifyAdmin(sendNotificationDtoIn.message, sendNotificationDtoIn.event, null, sendNotificationDtoIn.isCritic)
            .then();
        return {
            channel: sendNotificationDtoIn.channel,
            message: sendNotificationDtoIn.message,
            statutTreatment: 'SUCCESS',
        };
    }
    async retroTransaction(retroDtoIn) {
        return {
            code: 2000,
            msg: "Votre opération s'est effectuée sans erreur. Veuillez attendre le callback pour avoir l'état final de la transaction",
            error: false,
            data: {
                phone: '0170393568',
                amount: 250,
                codeService: 'MOOV_CI_API_CASH_OUT',
                transactionId: 'T64469458190757',
                status: 'PENDING',
                externalTransactionId: 'CXDSpC.FkdrdGF',
                callbackUrl: 'https://secure-3ds.intech.sn/ping',
                errorType: null,
                notificationMessage: 'Cliquez sur le lien suivant pour valider le paiement de 250 CFA sur Intech Group.\nhttps://api.intech.sn/deep/T64469458190757\nExpire dans 15 minutes',
                deepLinkUrl: 'https://api.intech.sn/deep/T64469458190757',
                _be_removed_deepLinkUrl: 'tel:*155*2*1*0141324245*250%23',
            },
        };
    }
    async executeUssd(executeUssdIn) {
        return {
            success: true,
            message: '',
            ussd_response: 'Fake Ussd Response',
        };
    }
};
PartnerServiceService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [helper_service_1.HelperService])
], PartnerServiceService);
exports.PartnerServiceService = PartnerServiceService;
//# sourceMappingURL=partner-service.service.js.map