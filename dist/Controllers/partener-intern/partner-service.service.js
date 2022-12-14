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
const sockets_gateway_1 = require("../../Sockets/sockets.gateway");
const PartenerComptes_entity_1 = require("../../Models/Entities/PartenerComptes.entity");
const operators_1 = require("rxjs/operators");
const Transactions_entity_1 = require("../../Models/Entities/Transactions.entity");
let PartnerServiceService = class PartnerServiceService {
    constructor(helper, httpService) {
        this.helper = helper;
        this.httpService = httpService;
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
                tmp.messageTreatment = `La transaction a d??j?? ??t?? trait??e: statut: ${transaction.statut}`;
                outResult.push(tmp);
                continue;
            }
            if (!['SUCCESS', 'FAILED'].includes(dtoIn.statut)) {
                tmp.statutTreatment = 'FAILED';
                tmp.messageTreatment = `Un statut inconnu a ??t?? donn?? pour le traitement: ${dtoIn.statut}`;
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
        const transaction = await this.helper.getTransactionById(retroDtoIn.transactionId, []);
        if (!transaction) {
            return {
                code: -1,
                msg: 'La transaction est introuvable',
            };
        }
        if (transaction.typeOperation !== Enum_entity_1.TypeOperationEnum.CREDIT) {
            return {
                code: -1,
                msg: 'Seul les operation de CREDIT peuvent faire une retro transaction',
            };
        }
        try {
            const partnerAccount = await PartenerComptes_entity_1.PartenerComptes.findOne({
                where: {
                    id: transaction.partenerComptesId,
                },
                relations: ['parteners'],
            });
            const data = {
                phone: transaction.phone,
                amount: retroDtoIn.amount || transaction.amount,
                codeService: retroDtoIn.codeService,
                motif: `Retro transaction pour #${transaction.transactionId} par partenaire`,
                externalTransactionId: `RETRO_TR${this.helper.generateRandomId('', 5)}_PARTNER_#${transaction.transactionId.toUpperCase()}`,
                callbackUrl: transaction.urlIpn,
                apiKey: partnerAccount.appKey,
                sender: partnerAccount.parteners.name,
                data: '{}',
            };
            console.log('data retro', data);
            return (await this.httpService
                .post('https://api.intech.sn/api-services/operation', data)
                .pipe(operators_1.map((x) => x === null || x === void 0 ? void 0 : x.data))
                .toPromise());
        }
        catch (e) {
            console.log(e);
            return {
                code: -2,
                msg: e.msg,
            };
        }
    }
    async retroAdminTransaction(retroDtoIn) {
        const transaction = await this.helper.getTransactionById(retroDtoIn.transactionId, []);
        if (!transaction) {
            return {
                code: -1,
                msg: 'La transaction est introuvable',
            };
        }
        try {
            const partnerAccount = await PartenerComptes_entity_1.PartenerComptes.findOne({
                where: {
                    id: transaction.partenerComptesId,
                },
                relations: ['parteners'],
            });
            const data = {
                phone: transaction.phone,
                amount: retroDtoIn.amount || transaction.amount,
                codeService: retroDtoIn.codeService,
                motif: `Retro transaction pour #${transaction.transactionId} par Admin:\nMotif: ${retroDtoIn.motif}`,
                externalTransactionId: `RETRO_TR${this.helper.generateRandomId('', 5)}_ADMIN_#${transaction.transactionId.toUpperCase()}`,
                callbackUrl: transaction.urlIpn,
                apiKey: process.env.RETRO_ADMIN_API_KEY,
                sender: partnerAccount.parteners.name,
                data: '{}',
            };
            console.log('data retro', data);
            return (await this.httpService
                .post('https://api.intech.sn/api-services/operation', data)
                .pipe(operators_1.map((x) => x === null || x === void 0 ? void 0 : x.data))
                .toPromise());
        }
        catch (e) {
            console.log(e);
            return {
                code: -2,
                msg: e.msg,
            };
        }
    }
    async executeUssd(executeUssdIn) {
        const phone = await Phones_entity_1.Phones.findOne({
            where: {
                id: executeUssdIn.phoneId,
            },
        });
        const socket = await sockets_gateway_1.SocketsGateway.getSocket(phone === null || phone === void 0 ? void 0 : phone.number);
        if (!phone) {
            return {
                success: false,
                message: "Le t??l??phone avec cet id n'existe pas",
                ussd_response: '',
            };
        }
        else if ((phone === null || phone === void 0 ? void 0 : phone.socket) === 'DISCONNECTED') {
            return {
                success: false,
                message: "Le t??l??phone n'est pas connect??",
                ussd_response: '',
            };
        }
        else if (!socket) {
            return {
                success: false,
                message: 'Socket non trouv??',
                ussd_response: '',
            };
        }
        else {
            return new Promise(async (resolve) => {
                let clearId = null;
                socket.on('finishExecUssd', async (data) => {
                    clearTimeout(clearId);
                    console.log('DATA_SOCKET', data);
                    socket.removeAllListeners('finishExecUssd');
                    resolve({
                        success: true,
                        message: 'Le code a ete execut?? avec success',
                        ussd_response: main_1.serializeData(data),
                    });
                });
                clearId = setTimeout(function () {
                    resolve({
                        success: false,
                        message: 'Ussd Timeout',
                        ussd_response: '',
                    });
                }, Enum_entity_1.CONSTANT.WAIT_SOCKET_PHONE() * 1000);
                let ussdCode = executeUssdIn.ussd
                    .replace(/mvm_number/g, phone.number)
                    .replace(/code/g, phone.codeSecret);
                ussdCode += `-ADMIN`;
                socket.emit('execUssd', ussdCode);
            });
        }
    }
    async rebootPhone(rebootPhoneDtoIn) {
        const phone = await Phones_entity_1.Phones.findOne({
            where: {
                id: rebootPhoneDtoIn.phoneId,
            },
        });
        const socket = await sockets_gateway_1.SocketsGateway.getSocket(phone === null || phone === void 0 ? void 0 : phone.number);
        if (!phone) {
            return {
                success: false,
                message: "Le t??l??phone avec cet id n'existe pas",
            };
        }
        else if ((phone === null || phone === void 0 ? void 0 : phone.socket) === 'DISCONNECTED') {
            return {
                success: false,
                message: "Le t??l??phone n'est pas connect??",
            };
        }
        else if (!socket) {
            return {
                success: false,
                message: 'Socket non trouv??',
            };
        }
        else {
            sockets_gateway_1.SocketsGateway.rebootPhone(phone).then();
            return {
                success: true,
                message: 'La demande de reboot a ??t?? envoy?? au t??l??phone',
            };
        }
    }
    async setRetroParentId(parentId, childTransactionId) {
        const childTransaction = await this.helper.getTransactionByGeneratedId(childTransactionId);
        if (!childTransaction) {
            console.log('No childTransaction, maybe should hit same env api');
            return;
        }
        await Transactions_entity_1.Transactions.update(childTransaction.id, {
            parentRetroTransactionId: parentId,
        });
    }
};
PartnerServiceService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [helper_service_1.HelperService,
        common_1.HttpService])
], PartnerServiceService);
exports.PartnerServiceService = PartnerServiceService;
//# sourceMappingURL=partner-service.service.js.map