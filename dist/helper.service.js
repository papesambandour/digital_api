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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperService = void 0;
const common_1 = require("@nestjs/common");
const Enum_entity_1 = require("./Models/Entities/Enum.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Phones_entity_1 = require("./Models/Entities/Phones.entity");
const OperationPhones_entity_1 = require("./Models/Entities/OperationPhones.entity");
const DtoOperationPhones_1 = require("./Models/Dto/DtoOperationPhones");
const Transactions_entity_1 = require("./Models/Entities/Transactions.entity");
const SousServices_entity_1 = require("./Models/Entities/SousServices.entity");
const DtoOperationParteners_1 = require("./Models/Dto/DtoOperationParteners");
const OperationParteners_entity_1 = require("./Models/Entities/OperationParteners.entity");
const Parteners_entity_1 = require("./Models/Entities/Parteners.entity");
const Operators_entity_1 = require("./Models/Entities/Operators.entity");
const crypto = require("crypto");
const os = require("os");
const fs = require("fs");
const Commission_entity_1 = require("./Models/Entities/Commission.entity");
const PartenerComptes_entity_1 = require("./Models/Entities/PartenerComptes.entity");
const DiscordApiProvider_1 = require("./sdk/Discord/DiscordApiProvider");
const ErrorTypes_entity_1 = require("./Models/Entities/ErrorTypes.entity");
const main_1 = require("./main");
const WhatsAppApiProvider_1 = require("./sdk/WhatsApp/WhatsAppApiProvider");
const Claim_entity_1 = require("./Models/Entities/Claim.entity");
const Services_entity_1 = require("./Models/Entities/Services.entity");
const config_1 = require("./sdk/Discord/config");
let HelperService = class HelperService {
    constructor(connection, httpService) {
        this.connection = connection;
        this.httpService = httpService;
    }
    async refund(refundDtoIn, typeId, partnerAccount = null) {
        const transaction = typeId === 'admin'
            ? await this.getTransactionById(refundDtoIn.transactionId, [])
            : await Transactions_entity_1.Transactions.findOne({
                where: {
                    transactionId: typeorm_2.Equal(refundDtoIn.transactionId),
                    partenerComptesId: partnerAccount.id,
                },
                relations: ['sousServices'],
            });
        const canRefund = await this.canRefundOperation(transaction);
        if (!canRefund.allow) {
            return {
                status: Enum_entity_1.StatusEnum.FAILLED,
                message: canRefund.message,
            };
        }
        const apiManager = (await this.getApiManagerInterface(transaction.codeSousService, null));
        const refund = await apiManager.refundTransaction({
            transaction: transaction,
        });
        transaction.refundResponse = main_1.serializeData(refund);
        await transaction.save();
        if (refund.status === Enum_entity_1.StatusEnum.SUCCESS) {
            await this.handleTransactionRefundSuccess(transaction);
        }
        return {
            status: refund.status,
            message: refund.partnerMessage,
        };
    }
    async notifyAdmin(message, typeEvent, data = {}, isCritic = false, channelName = undefined) {
        console.log(`CONTACTA ADMIN TO ${message} for EVENT: ${typeEvent}. Data:`, data, isCritic);
        if (typeEvent === Enum_entity_1.TypeEvenEnum.SOLDE_PARTNER ||
            typeEvent === Enum_entity_1.TypeEvenEnum.SOLDE_SERVICE) {
            await this.sleep(Math.random() * 5000);
        }
        if (parseInt(process.env.SEND_NOTIFY) === 1) {
            const sendedMessage = `NEW ALERT MESSAGE:\n${message}\nEVENT : ${typeEvent}\nDATA: ${main_1.serializeData(data)}`;
            const messageChunks = this.splitMessage(sendedMessage, 1800);
            for (const chunk of messageChunks) {
                await DiscordApiProvider_1.default.sendMessageStatic({
                    message: chunk,
                }, channelName);
                await this.sleep(Math.random() * 1000);
            }
        }
    }
    splitMessage(message, chunkSize) {
        const chunks = [];
        for (let i = 0; i < message.length; i += chunkSize) {
            chunks.push(message.substring(i, i + chunkSize));
        }
        return chunks;
    }
    async setSoldeTableOnly(value, tableName, id, field) {
        const query = `
    UPDATE ${tableName}
      SET ${field} = ${field} + ${value}
      WHERE id = ${id};
    `;
        try {
            if (tableName !== 'parteners') {
                return await this.connection.query(query);
            }
            else {
                return await this.connection.transaction('SERIALIZABLE', async (transactionalEntityManager) => {
                    try {
                        console.log('running query in serialize mode', query);
                        await transactionalEntityManager.query(query);
                    }
                    catch (e) {
                        this.notifyAdmin(`Partner solde query transaction fail: "${query}"`, Enum_entity_1.TypeEvenEnum.UPDATE_SOLDE_ERROR, {
                            query: query,
                        }, true).then();
                    }
                });
            }
        }
        catch (e) {
            this.notifyAdmin(`Partner solde query fail: "${query}"`, Enum_entity_1.TypeEvenEnum.UPDATE_SOLDE_ERROR, {
                query: query,
            }, true).then();
        }
    }
    async setSoldeTableFromValue(value, tableName, id, field) {
        return this.connection.query(`update ${tableName} set ${field} =  ${value} where id=${id}`);
    }
    async incrementSolde(value, tableName, id, field) {
        return this.connection.query(`update ${tableName} set ${field} = field +  ${value} where id=${id}`);
    }
    async operationPhone(phone, soldeApi, amount, transactionId, typeOperation, comment, operationId = null, operation = Enum_entity_1.OperationEnumPhone.TRANSACTION) {
        const operationPhones = new DtoOperationPhones_1.DtoOperationPhones();
        operationPhones.commentaire = comment;
        operationPhones.amount = amount;
        operationPhones.statut = Enum_entity_1.StatusEnum.SUCCESS;
        operationPhones.createdAt = new Date();
        operationPhones.dateCreation = new Date();
        operationPhones.dateSuccess = new Date();
        operationPhones.dateProcessing = new Date();
        operationPhones.typeOperation = typeOperation;
        operationPhones.phonesId = phone.id;
        operationPhones.operation = operation;
        operationPhones.operationPhonesId = operationId;
        operationPhones.soldeBefor = phone.solde;
        operationPhones.soldeAfter = phone.solde + amount;
        operationPhones.soldeApiBefor = phone.soldeApi;
        operationPhones.soldeApiAfter = soldeApi;
        operationPhones.transactionsId = transactionId;
        await OperationPhones_entity_1.OperationPhones.insert(operationPhones, {
            transaction: true,
        });
    }
    async waitSome(second) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, second * 1000);
        });
    }
    async waitSomeMs(ms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, ms);
        });
    }
    mysqlDate(d) {
        return d.toISOString().substr(0, 19).replace('T', ' ');
    }
    async getApiManagerInterface(codeService, apiService) {
        try {
            console.log(codeService, String(apiService));
            const service = await SousServices_entity_1.SousServices.findOne({
                where: { code: typeorm_2.Equal(codeService) },
            });
            const className = service.apiManagerClassName;
            const namespace = service.apiManagerNamespace;
            const exec = `
          new (require('${namespace}').${className})(
              this.connection,
              this,
              this.httpService,
              apiService
          )
      `;
            const apiInterface = eval(exec);
            console.log('dynamic instance class');
            return apiInterface;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
    async getTransactionById(transactionId, extraRelation = []) {
        if (!transactionId) {
            return null;
        }
        return await Transactions_entity_1.Transactions.findOne({
            where: {
                id: typeorm_2.Equal(transactionId),
            },
            relations: extraRelation.concat(['sousServices']),
        });
    }
    async getTransactionByGeneratedId(transactionId, extraRelation = []) {
        if (!transactionId) {
            return null;
        }
        return await Transactions_entity_1.Transactions.findOne({
            where: {
                transactionId: typeorm_2.Equal(transactionId),
            },
            relations: extraRelation.concat(['sousServices']),
        });
    }
    async setIsCallbackReadyValue(transaction, delaySendCallBackMs = 0) {
        var _a, _b, _c, _d;
        if (!transaction) {
            console.log('no transaction to set setIsCallbackReadyValue');
            return;
        }
        const transactionPreStatus = transaction.preStatut;
        const transactionStatus = transaction.statut;
        let value = 0;
        if (((_b = (_a = transaction.sousServices.whenPreStatusForCallback) === null || _a === void 0 ? void 0 : _a.split('|')) === null || _b === void 0 ? void 0 : _b.includes(transactionPreStatus)) ||
            ((_d = (_c = transaction.sousServices.whenStatusForCallback) === null || _c === void 0 ? void 0 : _c.split('|')) === null || _d === void 0 ? void 0 : _d.includes(transactionStatus))) {
            value = 1;
        }
        console.log('setting callback', value);
        if (transaction.callbackReady !== value) {
            if (value) {
                transaction.nextSendCallbackDate = this.addMinuteToDate(new Date(), Enum_entity_1.CONSTANT.WAIT_TIME_FOR_RETRY_CALLBACK_IN_MINUTE());
                this.sendCallBack(transaction, delaySendCallBackMs).then();
                transaction.callbackReady = value;
                await transaction.save();
            }
        }
    }
    async setTimeOutDate(transaction) {
        if (!transaction) {
            console.log('no transaction to set setIsCallbackReadyValue');
            return;
        }
        if (transaction.sousServices.pendingTimeout != -1) {
            transaction.timeOutAt = this.addMinuteToDate(new Date(), transaction.sousServices.pendingTimeout);
            await transaction.save();
        }
    }
    async sendCallBack(transaction, delayMs = 0) {
        var _a;
        await this.waitSomeMs(delayMs);
        const errorType = await this.provideErrorType(transaction);
        let data = {};
        try {
            data = JSON.parse(transaction.data);
        }
        catch (e) {
            data = {};
        }
        const statut = [Enum_entity_1.StatusEnum.SUCCESS.toString()].includes(transaction.statut) ||
            [Enum_entity_1.StatusEnum.SUCCESS.toString()].includes(transaction.preStatut)
            ? Enum_entity_1.StatusEnum.SUCCESS
            : Enum_entity_1.StatusEnum.FAILLED;
        const partner = await Parteners_entity_1.Parteners.findOne(transaction.partenersId);
        const dataSended = {
            code: 2000,
            msg: transaction.commentaire,
            error: false,
            status: statut,
            sha256Hash: await this.getTransactionCallBackHash(transaction),
            transaction: {
                phone: transaction.phone,
                amount: transaction.amount,
                codeService: transaction.codeSousService,
                nameService: transaction.sousServiceName,
                commission: transaction.commissionAmount,
                transactionId: transaction.transactionId,
                sousServiceTransactionId: transaction.sousServiceTransactionId,
                currentBalance: partner.solde + partner.soldeCommission,
                balanceBeforeTransactionInit: transaction.partnerSolde + transaction.partnerSoldeCommission,
                balanceAfterTransactionInit: transaction.solde + transaction.soldeCommission,
                status: statut,
                externalTransactionId: transaction.externalTransactionId,
                callbackUrl: transaction.urlIpn,
                data: data,
                errorType: errorType,
            },
        };
        await transaction.reload();
        if (transaction.callbackIsSend === 1) {
            return Promise.resolve({ alreadySend: true });
        }
        try {
            await Transactions_entity_1.Transactions.update(transaction.id, {
                callbackIsSend: 1,
                callbackSendedAt: new Date(),
            });
            const dataResponse = await this.httpService
                .post(transaction.urlIpn, dataSended)
                .toPromise();
            await Transactions_entity_1.Transactions.update(transaction.id, {
                dataSended: JSON.stringify(dataSended),
                dataResponseCallback: JSON.stringify({
                    statusCode: dataResponse.status,
                    data: main_1.serializeData(dataResponse.data),
                }),
                callbackIsSend: 1,
                callbackSendedAt: new Date(),
            });
            await transaction.reload();
            return dataResponse.data;
        }
        catch (e) {
            console.log('Erreur callback', e);
            await Transactions_entity_1.Transactions.update(transaction.id, {
                dataSended: JSON.stringify(dataSended),
                dataResponseCallback: `${e.message}|${main_1.serializeData((_a = e.response) === null || _a === void 0 ? void 0 : _a.data)}`,
                callbackIsSend: 2,
                callbackReady: transaction.callBackRetryCount + 1 < Enum_entity_1.CONSTANT.MAX_RETRY_CALLBACK()
                    ? 1
                    : 2,
                callBackRetryCount: transaction.callBackRetryCount + 1,
                nextSendCallbackDate: this.addMinuteToDate(new Date(), Enum_entity_1.CONSTANT.WAIT_TIME_FOR_RETRY_CALLBACK_IN_MINUTE()),
            });
            await transaction.reload();
            return e.message || 'error';
        }
    }
    addMinuteToDate(date, minutes) {
        const newDate = new Date(date);
        newDate.setMinutes(newDate.getMinutes() + minutes);
        return newDate;
    }
    async setSoldeTableForDebitOnly(sousServices, value, tableName, id, field = 'solde') {
        console.log('RELEVE-api', ` ${tableName} set ${field} =  ${field} + ${value} where id=${id}`);
        if (sousServices.typeOperation == Enum_entity_1.TypeOperationEnum.DEBIT) {
            return this.connection.query(`update ${tableName}
                 set ${field} = ${field} + ${value}
                 where id = ${id}`);
        }
    }
    async setSoldeTableForCreditOnly(sousServices, value, tableName, id, field = 'solde') {
        console.log('RELEVE-api', ` ${tableName} set ${field} =  ${field} + ${value} where id=${id}`);
        if (sousServices.typeOperation == Enum_entity_1.TypeOperationEnum.CREDIT) {
            return this.connection.query(`update ${tableName}
                 set ${field} = ${field} + ${value}
                 where id = ${id}`);
        }
    }
    generateTransactionId() {
        return 'T' + Math.random().toString().substr(5, 25);
    }
    generateRandomId(prefix, length = 25) {
        return prefix + Math.random().toString().substr(5, length);
    }
    async operationPartnerDoTransaction(transaction) {
        const sousService = await SousServices_entity_1.SousServices.findOne({
            where: {
                id: typeorm_2.Equal(transaction.sousServicesId),
            },
        });
        const partner = await Parteners_entity_1.Parteners.findOne({
            where: {
                id: typeorm_2.Equal(transaction.partenersId),
            },
        });
        const phone = await Phones_entity_1.Phones.findOne({
            where: { id: typeorm_2.Equal(transaction.phonesId) },
        });
        if (transaction.typeOperation === Enum_entity_1.TypeOperationEnum.DEBIT) {
            const amountPartnerDebit = -((transaction.amount + transaction.feeAmount));
            const operationParteners = new DtoOperationParteners_1.DtoOperationParteners();
            operationParteners.commentaire = transaction === null || transaction === void 0 ? void 0 : transaction.commentaire;
            operationParteners.amount = amountPartnerDebit;
            operationParteners.typeOperation = transaction.typeOperation;
            operationParteners.partenersId = partner.id;
            operationParteners.partenersId = partner.id;
            operationParteners.transactionsId = transaction.id;
            operationParteners.soldeBefor = partner.solde + partner.soldeCommission;
            operationParteners.soldeAfter =
                partner.solde + partner.soldeCommission + amountPartnerDebit;
            operationParteners.statut = Enum_entity_1.StatusEnum.SUCCESS;
            operationParteners.fee = transaction.feeAmount;
            operationParteners.commission = transaction.commissionAmount;
            operationParteners.createdAt = new Date();
            operationParteners.operation = Enum_entity_1.OperationEnum.TRANSACTION;
            await OperationParteners_entity_1.OperationParteners.insert(operationParteners, {
                transaction: true,
            });
            await this.setSoldeTableOnly(amountPartnerDebit, 'parteners', partner.id, transaction.isSoldeCommission ? 'solde_commission' : 'solde');
            const amountPhoneDebit = -(transaction.amount + transaction.feeAmountPsn);
            await this.operationPhone(phone, phone.soldeApi, amountPhoneDebit, transaction.id, transaction.typeOperation, `Operation de ${sousService.typeOperation} pour ${sousService.name} avec le telephone ${phone.number}`);
            await this.setSoldeTableOnly(amountPhoneDebit, 'phones', transaction.phonesId, 'solde');
        }
        else if (transaction.typeOperation === Enum_entity_1.TypeOperationEnum.CREDIT) {
        }
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    async operationPartnerCancelTransaction(transaction, isRefund = false) {
        if (!transaction) {
            console.log('No transaction for operation cancel');
            return;
        }
        await transaction.reload();
        console.log('before', transaction === null || transaction === void 0 ? void 0 : transaction.transactionRefundFinished);
        console.log('caling refund', transaction.transactionRefundFinished, isRefund);
        if (!isRefund && transaction.transactionIsFinish) {
            console.log('transaction already cancel');
            return false;
        }
        if (isRefund && transaction.transactionRefundFinished) {
            console.log('transaction refunded cancel');
            return false;
        }
        let transactionData;
        await this.sleep(Math.random() * 500);
        if (!isRefund) {
            transactionData = {
                dateCanceled: new Date(),
                transactionIsFinish: 1,
                canceled: 1,
            };
            const rows = await Transactions_entity_1.Transactions.update({
                id: transaction.id,
                transactionIsFinish: 0,
            }, transactionData);
            console.log(rows, rows.affected, 'affected cancel');
            if (rows.affected == 0) {
                return;
            }
        }
        else {
            transactionData = {
                dateRefunded: new Date(),
                transactionRefundFinished: 1,
                statut: Enum_entity_1.StatusEnum.REFUNDED,
                preStatut: Enum_entity_1.StatusEnum.REFUNDED,
            };
            const rows = await Transactions_entity_1.Transactions.update({
                id: transaction.id,
                transactionRefundFinished: 0,
            }, transactionData);
            console.log(rows, rows.affected, 'affected cancel refund');
            if (rows.affected == 0) {
                return;
            }
        }
        await transaction.reload();
        console.log('updating refund finish ok', transactionData);
        const sousService = await SousServices_entity_1.SousServices.findOne({
            where: {
                id: typeorm_2.Equal(transaction.sousServicesId),
            },
            relations: ['services'],
        });
        const operator = await Operators_entity_1.Operators.findOne(sousService.services.operatorsId);
        const partner = await Parteners_entity_1.Parteners.findOne({
            where: {
                id: typeorm_2.Equal(transaction.partenersId),
            },
        });
        if (transaction.typeOperation == Enum_entity_1.TypeOperationEnum.DEBIT) {
            if (isRefund) {
                const amountPartner = transaction.amount;
                await this.setSoldeTableOnly(amountPartner, 'parteners', partner.id, transaction.isSoldeCommission ? 'solde_commission' : 'solde');
                const operationParteners = new DtoOperationParteners_1.DtoOperationParteners();
                operationParteners.commentaire = `Annulation  ${sousService.name} pour l'opérateur ${operator.name}`;
                operationParteners.amount = amountPartner;
                operationParteners.typeOperation = Enum_entity_1.TypeOperationEnum.CREDIT;
                operationParteners.statut = Enum_entity_1.StatusEnum.SUCCESS;
                operationParteners.partenersId = partner.id;
                operationParteners.partenersId = partner.id;
                operationParteners.transactionsId = transaction.id;
                operationParteners.soldeBefor = partner.solde + partner.soldeCommission;
                operationParteners.soldeAfter =
                    partner.solde + partner.soldeCommission + amountPartner;
                operationParteners.fee = transaction.feeAmount;
                operationParteners.commission = transaction.commissionAmount;
                operationParteners.createdAt = new Date();
                operationParteners.operation = Enum_entity_1.OperationEnum.ANNULATION_TRANSACTION;
                await OperationParteners_entity_1.OperationParteners.insert(operationParteners, {
                    transaction: true,
                });
                const phone = await Phones_entity_1.Phones.findOne({
                    where: { id: typeorm_2.Equal(transaction.phonesId) },
                });
                await this.operationPhone(phone, phone.soldeApi, transaction.amount + transaction.feeAmountPsn, transaction.id, Enum_entity_1.TypeOperationEnum.CREDIT, `Remboursement  ${sousService.typeOperation} pour ${sousService.name} avec le telephone ${phone.number}`, null, Enum_entity_1.OperationEnumPhone.REFUND_TRANSACTION);
                await this.setSoldeTableOnly(transaction.amount + transaction.feeAmountPsn, 'phones', transaction.phonesId, 'solde');
            }
            else {
                const amountPartner = transaction.amount +
                    transaction.feeAmount;
                await this.setSoldeTableOnly(amountPartner, 'parteners', partner.id, transaction.isSoldeCommission ? 'solde_commission' : 'solde');
                const operationParteners = new DtoOperationParteners_1.DtoOperationParteners();
                operationParteners.commentaire = `Annulation  ${sousService.name} pour l'opérateur ${operator.name}`;
                operationParteners.amount = amountPartner;
                operationParteners.typeOperation = Enum_entity_1.TypeOperationEnum.CREDIT;
                operationParteners.statut = Enum_entity_1.StatusEnum.SUCCESS;
                operationParteners.partenersId = partner.id;
                operationParteners.partenersId = partner.id;
                operationParteners.transactionsId = transaction.id;
                operationParteners.soldeBefor = partner.solde + partner.soldeCommission;
                operationParteners.soldeAfter =
                    partner.solde + partner.soldeCommission + amountPartner;
                operationParteners.fee = transaction.feeAmount;
                operationParteners.commission = transaction.commissionAmount;
                operationParteners.createdAt = new Date();
                operationParteners.operation = Enum_entity_1.OperationEnum.ANNULATION_TRANSACTION;
                await OperationParteners_entity_1.OperationParteners.insert(operationParteners, {
                    transaction: true,
                });
                const phone = await Phones_entity_1.Phones.findOne({
                    where: { id: typeorm_2.Equal(transaction.phonesId) },
                });
                await this.operationPhone(phone, phone.soldeApi, transaction.amount + transaction.feeAmountPsn, transaction.id, Enum_entity_1.TypeOperationEnum.CREDIT, `Annulation  ${sousService.typeOperation} pour ${sousService.name} avec le telephone ${phone.number}`, null, Enum_entity_1.OperationEnumPhone.ANNULATION_TRANSACTION);
                await this.setSoldeTableOnly(transaction.amount + transaction.feeAmountPsn, 'phones', transaction.phonesId, 'solde');
            }
        }
        else if (transaction.typeOperation == Enum_entity_1.TypeOperationEnum.CREDIT) {
            if (isRefund) {
                const amountPartner = -(transaction.amount -
                    transaction.feeAmount +
                    transaction.commissionAmount);
                await this.setSoldeTableOnly(amountPartner, 'parteners', partner.id, transaction.isSoldeCommission ? 'solde_commission' : 'solde');
                const operationParteners = new DtoOperationParteners_1.DtoOperationParteners();
                operationParteners.commentaire = `Remboursement operation  ${sousService.name} pour l'opérateur ${operator.name}`;
                operationParteners.amount = amountPartner;
                operationParteners.typeOperation = Enum_entity_1.TypeOperationEnum.DEBIT;
                operationParteners.statut = Enum_entity_1.StatusEnum.SUCCESS;
                operationParteners.partenersId = partner.id;
                operationParteners.partenersId = partner.id;
                operationParteners.transactionsId = transaction.id;
                operationParteners.soldeBefor = partner.solde + partner.soldeCommission;
                operationParteners.soldeAfter =
                    partner.solde + partner.soldeCommission + amountPartner;
                operationParteners.fee = transaction.feeAmount;
                operationParteners.commission = transaction.commissionAmount;
                operationParteners.createdAt = new Date();
                operationParteners.operation = Enum_entity_1.OperationEnum.REFUND_TRANSACTION;
                await OperationParteners_entity_1.OperationParteners.insert(operationParteners, {
                    transaction: true,
                });
                const phone = await Phones_entity_1.Phones.findOne({
                    where: { id: typeorm_2.Equal(transaction.phonesId) },
                });
                const amountPhone = -(transaction.amount - transaction.feeAmountPsn);
                await this.operationPhone(phone, phone.soldeApi, amountPhone, transaction.id, Enum_entity_1.TypeOperationEnum.DEBIT, `Remboursement  ${sousService.typeOperation} pour ${sousService.name} avec le telephone ${phone.number}`, null, Enum_entity_1.OperationEnumPhone.REFUND_TRANSACTION);
                await this.setSoldeTableOnly(amountPhone, 'phones', transaction.phonesId, 'solde');
            }
        }
    }
    async updateApiBalance(apiManager, usedPhoneId) {
        var _a;
        if (!usedPhoneId) {
            return;
        }
        const balanceInfo = await apiManager.getBalance({});
        console.log('Balance', (_a = apiManager === null || apiManager === void 0 ? void 0 : apiManager.constructor) === null || _a === void 0 ? void 0 : _a.name, balanceInfo);
        if (balanceInfo.success) {
            console.log('fetch success');
            await this.setSoldeTableFromValue(balanceInfo.newBalance, 'phones', usedPhoneId, 'solde_api');
        }
    }
    async base64(str) {
        const buff = Buffer.from(str);
        return buff.toString('base64');
    }
    async sendSms(tos, message, sender, whatsappAlso = false, whatsAppDelaySecond = 0) {
        try {
            console.log('sending smss to ', tos);
            const response = await this.httpService
                .post('https://gateway.intechsms.sn/api/send-sms', {
                app_key: process.env.SMS_API_KEY,
                sender: sender,
                content: message,
                msisdn: tos,
            })
                .toPromise();
            if (whatsappAlso) {
                await this.waitSome(whatsAppDelaySecond);
                for (const to of tos) {
                    WhatsAppApiProvider_1.default.sendMessageToOne(to, `${sender}:\n\n${message}`).then();
                }
            }
            console.log(response.data);
            return true;
        }
        catch (e) {
            console.log(e);
        }
        return false;
    }
    getStatusAfterExec(execResult, service) {
        let preStatus = null;
        let status = null;
        if (execResult === 'success') {
            if (service.preStatusSuccessType === 'PENDING_ON_SUCCESS') {
                preStatus = Enum_entity_1.StatusEnum.PENDING;
            }
            else if (service.preStatusSuccessType === 'SUCCESS_ON_SUCCESS') {
                preStatus = Enum_entity_1.StatusEnum.SUCCESS;
            }
            else if (service.preStatusSuccessType === 'PROCESSING_ON_SUCCESS') {
                preStatus = Enum_entity_1.StatusEnum.PROCESSING;
            }
            else {
                throw new Error('unknow preStatusSuccessType');
            }
            if (service.statusSuccessType === 'PENDING_ON_SUCCESS') {
                status = Enum_entity_1.StatusEnum.PENDING;
            }
            else if (service.statusSuccessType === 'SUCCESS_ON_SUCCESS') {
                status = Enum_entity_1.StatusEnum.SUCCESS;
            }
            else if (service.statusSuccessType === 'PROCESSING_ON_SUCCESS') {
                status = Enum_entity_1.StatusEnum.PROCESSING;
            }
            else {
                throw new Error('unknow statusSuccessType');
            }
        }
        else if (execResult === 'failed') {
            if (service.preStatusErrorType === 'FAILED_ON_ERROR') {
                preStatus = Enum_entity_1.StatusEnum.FAILLED;
            }
            else if (service.preStatusErrorType === 'PENDING_ON_ERROR') {
                preStatus = Enum_entity_1.StatusEnum.PENDING;
            }
            else if (service.preStatusErrorType === 'PROCESSING_ON_ERROR') {
                preStatus = Enum_entity_1.StatusEnum.PROCESSING;
            }
            else if (service.preStatusErrorType === 'SUCCESS_ON_ERROR') {
                preStatus = Enum_entity_1.StatusEnum.SUCCESS;
            }
            else {
                throw new Error('unknow preStatusErrorType');
            }
            if (service.statusErrorType === 'SUCCESS_ON_ERROR') {
                status = Enum_entity_1.StatusEnum.SUCCESS;
            }
            if (service.statusErrorType === 'PROCESSING_ON_ERROR') {
                status = Enum_entity_1.StatusEnum.PROCESSING;
            }
            else if (service.statusErrorType === 'PENDING_ON_ERROR') {
                status = Enum_entity_1.StatusEnum.PENDING;
            }
            else if (service.statusErrorType === 'FAILED_ON_ERROR') {
                status = Enum_entity_1.StatusEnum.FAILLED;
            }
            else {
                throw new Error('unknow statusErrorType');
            }
        }
        else if (execResult === 'timeout') {
            if (service.preStatusTimeOutType === 'FAILED_ON_TIMEOUT') {
                preStatus = Enum_entity_1.StatusEnum.FAILLED;
            }
            else if (service.preStatusTimeOutType === 'PENDING_ON_TIMEOUT') {
                preStatus = Enum_entity_1.StatusEnum.PENDING;
            }
            else if (service.preStatusTimeOutType === 'PROCESSING_ON_TIMEOUT') {
                preStatus = Enum_entity_1.StatusEnum.PROCESSING;
            }
            else if (service.preStatusTimeOutType === 'SUCCESS_ON_TIMEOUT') {
                preStatus = Enum_entity_1.StatusEnum.SUCCESS;
            }
            else {
                throw new Error('unknow preStatusErrorType');
            }
            if (service.statusTimeOutType === 'SUCCESS_ON_TIMEOUT') {
                status = Enum_entity_1.StatusEnum.SUCCESS;
            }
            if (service.statusTimeOutType === 'PROCESSING_ON_TIMEOUT') {
                status = Enum_entity_1.StatusEnum.PROCESSING;
            }
            else if (service.statusTimeOutType === 'PENDING_ON_TIMEOUT') {
                status = Enum_entity_1.StatusEnum.PENDING;
            }
            else if (service.statusTimeOutType === 'FAILED_ON_TIMEOUT') {
                status = Enum_entity_1.StatusEnum.FAILLED;
            }
            else {
                throw new Error('unknow statusErrorType');
            }
        }
        return {
            preStatus: preStatus,
            status: status,
        };
    }
    async getColumnMap(model, dbKeyName) {
        const columnInfo = this.connection.getMetadata(model).columns;
        const column = columnInfo.find((c) => c.givenDatabaseName === dbKeyName);
        return column;
    }
    async disableSousService(serviceId, message, type) {
        if (message) {
            this.notifyAdmin(message, type).then();
        }
    }
    async handleSuccessTransactionCreditDebit(transaction, sousServiceTransactionId = null) {
        console.log('_handleSuccessTransactionCreditDebit');
        const partner = await Parteners_entity_1.Parteners.findOne({
            where: {
                id: typeorm_2.Equal(transaction.partenersId),
            },
        });
        await transaction.reload();
        if (transaction.transactionIsFinish) {
            return false;
        }
        const transactionData = {
            dateSuccess: new Date(),
            transactionIsFinish: 1,
        };
        if (sousServiceTransactionId) {
            transactionData['sousServiceTransactionId'] = sousServiceTransactionId;
        }
        await this.sleep(Math.random() * 500);
        const rows = await Transactions_entity_1.Transactions.update({
            transactionIsFinish: 0,
            id: transaction.id,
        }, transactionData);
        console.log(rows, rows.affected, 'affected');
        if (rows.affected == 0) {
            return;
        }
        await transaction.reload();
        const phone = await Phones_entity_1.Phones.findOne({
            where: {
                id: typeorm_2.Equal(transaction.phonesId),
            },
        });
        const sousService = await SousServices_entity_1.SousServices.findOne({
            where: {
                id: typeorm_2.Equal(transaction.sousServicesId),
            },
        });
        const apiManager = await this.getApiManagerInterface(transaction.codeSousService, null);
        let soldeApi;
        const soldeApiRes = await apiManager.getBalance({});
        if (soldeApiRes.success) {
            soldeApi = soldeApiRes.newBalance;
        }
        else {
            soldeApi = phone.soldeApi;
        }
        if (sousService.typeOperation == Enum_entity_1.TypeOperationEnum.DEBIT) {
            if (sousService.hasSoldeApi) {
                await this.setSoldeTableFromValue(soldeApi, 'phones', phone.id, 'solde_api');
            }
            await this.verseComissionForTransaction(transaction, partner);
        }
        else if (sousService.typeOperation == Enum_entity_1.TypeOperationEnum.CREDIT) {
            if (sousService.hasSoldeApi) {
                await this.setSoldeTableFromValue(soldeApi, 'phones', phone.id, 'solde_api');
            }
            const amountPartnerWithoutCommision = transaction.amount - transaction.feeAmount;
            await this.setSoldeTableOnly(amountPartnerWithoutCommision, 'parteners', transaction.partenersId, 'solde');
            const operationParteners = new DtoOperationParteners_1.DtoOperationParteners();
            operationParteners.commentaire = transaction === null || transaction === void 0 ? void 0 : transaction.commentaire;
            operationParteners.amount = amountPartnerWithoutCommision;
            operationParteners.typeOperation = transaction.typeOperation;
            operationParteners.partenersId = transaction.partenersId;
            operationParteners.transactionsId = transaction.id;
            operationParteners.soldeBefor = partner.solde + partner.soldeCommission;
            operationParteners.soldeAfter =
                partner.solde + partner.soldeCommission + amountPartnerWithoutCommision;
            operationParteners.statut = Enum_entity_1.StatusEnum.SUCCESS;
            operationParteners.fee = transaction.feeAmount;
            operationParteners.commission = transaction.commissionAmount;
            operationParteners.createdAt = new Date();
            operationParteners.operation = Enum_entity_1.OperationEnum.TRANSACTION;
            await OperationParteners_entity_1.OperationParteners.insert(operationParteners, {
                transaction: true,
            });
            const amountPhone = transaction.amount - transaction.feeAmountPsn;
            await this.setSoldeTableOnly(amountPhone, 'phones', transaction.phonesId, 'solde');
            await this.operationPhone(phone, soldeApi, amountPhone, transaction.id, sousService.typeOperation, `Operation de ${sousService.typeOperation} pour ${sousService.name} avec le telephone ${phone.number}`);
            await this.verseComissionForTransaction(transaction, partner);
        }
    }
    isNotCancelable(preStatus, status) {
        return ([Enum_entity_1.StatusEnum.SUCCESS, Enum_entity_1.StatusEnum.PROCESSING, Enum_entity_1.StatusEnum.PENDING].includes(preStatus) ||
            [Enum_entity_1.StatusEnum.SUCCESS, Enum_entity_1.StatusEnum.PROCESSING, Enum_entity_1.StatusEnum.PENDING].includes(status));
    }
    appendQueryParams(url, queryParams = {}) {
        if (!Object.keys(queryParams) || !queryParams) {
            queryParams = {};
            queryParams['_'] = '_';
        }
        const serialize = function (obj) {
            const str = [];
            for (const p in obj)
                if (obj.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                }
            return str.join('&');
        };
        url += (url.split('?')[1] ? '&' : '?') + serialize(queryParams);
        return url;
    }
    async getTransactionCallBackHash(transaction) {
        transaction = await this.getTransactionById(transaction.id, [
            'partenerComptes',
        ]);
        return this.sha256(`${transaction.transactionId}|${transaction.externalTransactionId}|${transaction.partenerComptes.appKey}`);
    }
    sha256(data) {
        if (!data) {
            return null;
        }
        return crypto.createHash('sha256').update(data).digest('hex').toString();
    }
    async b64ToFilePath(attachedMedia, attachedMediaExtension, attachedMediaName) {
        if (!attachedMedia) {
            return null;
        }
        let filename = attachedMediaName || `${(Math.random() + '').substring(2)}`;
        filename += attachedMediaExtension;
        const fullPath = `${os.tmpdir()}/${filename}`;
        console.log('fullPath', fullPath);
        fs.writeFileSync(fullPath, Buffer.from(attachedMedia, 'base64'), {
            encoding: 'binary',
        });
        return fullPath;
    }
    async getAmountForMessenger(operationInDto) {
        const comptePartner = await PartenerComptes_entity_1.PartenerComptes.findOne({
            where: { appKey: typeorm_2.Equal(operationInDto === null || operationInDto === void 0 ? void 0 : operationInDto.apiKey), state: 'ACTIVED' },
        });
        if (!comptePartner) {
            return 0;
        }
        const sousServices = await SousServices_entity_1.SousServices.findOne({
            where: { code: typeorm_2.Equal(operationInDto === null || operationInDto === void 0 ? void 0 : operationInDto.codeService) },
        });
        if (!sousServices) {
            return 0;
        }
        const commission = await Commission_entity_1.Commission.findOne({
            where: {
                partenersId: typeorm_2.Equal(comptePartner.partenersId),
                sousServicesId: sousServices.id,
            },
        });
        return (commission === null || commission === void 0 ? void 0 : commission.amountFee) || 0;
    }
    async provideErrorType(transaction, providedErrorMessage = undefined, providedError = undefined, defaultMessageIfUnknowNoError = undefined) {
        if (!transaction) {
            console.log('no transaction to set setIsCallbackReadyValue');
            return null;
        }
        const errorTypes = await ErrorTypes_entity_1.ErrorTypes.findOne({
            where: {
                id: typeorm_2.Equal(transaction.errorTypesId),
            },
        });
        if (errorTypes) {
            return {
                id: errorTypes.id,
                codeService: errorTypes.sousServicesId
                    ? transaction.codeSousService
                    : null,
                code: errorTypes.code,
                message: errorTypes.message.replace('__amount__', transaction.amount.toString()),
            };
        }
        if (providedError) {
            transaction.errorTypes = providedError;
            await transaction.save();
            return {
                id: providedError.id,
                codeService: providedError.sousServicesId
                    ? transaction.codeSousService
                    : null,
                code: providedError.code,
                message: providedError.message.replace('__amount__', transaction.amount.toString()),
            };
        }
        const noError = this.isNotCancelable(transaction.preStatut, transaction.statut);
        if (noError) {
            return null;
        }
        if (!transaction.errorMessage && !providedErrorMessage) {
            return null;
        }
        const foundError = await this.getErrorType(providedErrorMessage || transaction.errorMessage, transaction.codeSousService, transaction.amount.toString());
        console.log('errror', foundError);
        if (!foundError) {
            this.alertForUnknownResponse(providedErrorMessage || transaction.errorMessage, transaction.codeSousService, transaction.id);
            return {
                id: null,
                codeService: null,
                code: 'unknown_error',
                message: defaultMessageIfUnknowNoError,
            };
        }
        transaction.errorTypes = foundError;
        await transaction.save();
        return {
            id: foundError.id,
            codeService: foundError.sousServicesId
                ? transaction.codeSousService
                : null,
            code: foundError.code,
            message: foundError.message.replace('__amount__', transaction.amount.toString()),
        };
    }
    async getErrorType(errorMessage, codeSousService, amount) {
        var _a;
        if (!errorMessage) {
            return null;
        }
        console.log(errorMessage, codeSousService, 'mmmmmm');
        const noAccent = (str) => `${str}`
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
        const mapper = (value, key) => {
            return key.split('.').reduce((p, c) => p[c], value);
        };
        const errorData = errorMessage;
        let errorDataJson = {};
        let cpError = errorData;
        const sep = '|||';
        if (cpError.includes(sep)) {
            cpError = (_a = cpError === null || cpError === void 0 ? void 0 : cpError.split(sep)) === null || _a === void 0 ? void 0 : _a[1];
        }
        try {
            errorDataJson = JSON.parse(cpError) || {};
        }
        catch (e) { }
        const sousServices = await SousServices_entity_1.SousServices.findOne({
            where: { code: typeorm_2.Equal(codeSousService) },
        });
        const allErrorTypes = await ErrorTypes_entity_1.ErrorTypes.find({
            where: {},
        });
        const error = allErrorTypes
            .sort((a, b) => {
            if (!a.sousServicesId && !b.sousServicesId)
                return 0;
            if (!a.sousServicesId)
                return 1;
            if (!b.sousServicesId)
                return -1;
            return b.sousServicesId - a.sousServicesId;
        })
            .find((el) => {
            try {
                if (el.sousServicesId && el.sousServicesId !== sousServices.id) {
                    return false;
                }
                let val = ' ';
                if (el.isJson) {
                    val = mapper(errorDataJson, el.index);
                }
                else {
                    val = errorData;
                }
                return new RegExp(this.regexEscape(noAccent(el.regex)), 'i').test(val ? noAccent(val) : '');
            }
            catch (error) {
                console.log(error, 'matching error', error.message);
                return false;
            }
        });
        if (!error) {
            return null;
        }
        if (error.isCritic) {
            this.notifyAdmin(`Une erreur critique c'est produit pour le service ${codeSousService}: ${error.id}/${error.code}\n${error.regex} ${error.message}`, Enum_entity_1.TypeEvenEnum.CRITICAL_ERROR, {}, true, config_1.discordApiConfig().noSimAndCriticAlertChanelName).then();
        }
        error.message = error.message.replace('__amount__', amount === null || amount === void 0 ? void 0 : amount.toString());
        return error;
    }
    alertForUnknownResponse(responseData, codeService, transactionId) {
        this.notifyAdmin(`Nouvelle réponse Inconnu pour la transaction N#${transactionId} du service ${codeService}: ${responseData}`, Enum_entity_1.TypeEvenEnum.UNKNOWN_RESPONSE_INIT).then();
    }
    ribFromString(rib, country = undefined) {
        if (!rib || typeof rib !== 'string') {
            return {
                rib: {
                    value: rib,
                    isValid: false,
                },
                accountNumber: {
                    value: null,
                    isValid: false,
                },
                ribKey: {
                    value: null,
                    isValid: false,
                },
                bankCode: {
                    value: null,
                    isValid: false,
                },
                branchCode: {
                    value: null,
                    isValid: false,
                },
            };
        }
        function substr(str, offset, length = undefined) {
            if (length === undefined) {
                length = str.length;
            }
            return str.substr(offset, length);
        }
        function slice(str, offset, length = undefined) {
            if (length === undefined) {
                length = str.length;
            }
            return str.slice(offset, length);
        }
        function str_replace(search, replace, subject) {
            return subject.replace(search, replace);
        }
        function ctype_alpha(input) {
            return /^[a-zA-Z]+$/.test(input);
        }
        function is_numeric(input) {
            return /^-?([0-9]\d+|\d)(\.\d+)?$/.test(input);
        }
        function strlen(str) {
            return str.length;
        }
        function str_starts_with(str, start_with) {
            return str.startsWith(start_with);
        }
        rib = rib.replace(/\s/g, '');
        const bankCode = substr(rib, 0, 5);
        const branchCode = substr(rib, 5, 5);
        const ribKey = slice(rib, -2);
        let accountNumber = str_replace(bankCode + branchCode, '', rib);
        accountNumber = slice(accountNumber, 0, -2);
        let accountNumberValid = !(strlen(accountNumber) < 10 ||
            strlen(accountNumber) > 20 ||
            !is_numeric(accountNumber));
        if ((str_starts_with(bankCode, 'SN') || country == 'sn') &&
            strlen(accountNumber) !== 12) {
            accountNumberValid = false;
        }
        if (str_starts_with(bankCode, 'SN') && strlen(accountNumber) !== 12) {
            accountNumberValid = false;
        }
        const cleanRib = {
            rib: {
                value: `${bankCode} ${branchCode} ${accountNumber} ${ribKey}`,
                isValid: false,
            },
            accountNumber: {
                value: accountNumber,
                isValid: accountNumberValid,
            },
            ribKey: {
                value: ribKey,
                isValid: !(strlen(ribKey) !== 2 || !is_numeric(ribKey)),
            },
            bankCode: {
                value: bankCode,
                isValid: !(strlen(bankCode) !== 5 || !ctype_alpha(substr(bankCode, 0, 2))),
            },
            branchCode: {
                value: branchCode,
                isValid: !(strlen(branchCode) !== 5 || !is_numeric(branchCode)),
            },
        };
        cleanRib.rib.isValid =
            cleanRib.accountNumber.isValid &&
                cleanRib.branchCode.isValid &&
                cleanRib.bankCode.isValid &&
                cleanRib.ribKey.isValid;
        return cleanRib;
    }
    async getDeepLinkNotificationMessage(transaction, deepLink) {
        const partner = await Parteners_entity_1.Parteners.findOne(transaction.partenersId);
        return `Cliquez sur le lien suivant pour valider le paiement de ${transaction.amount} CFA sur ${partner.name}.\n\n${deepLink}\n\nExpire dans 15 minutes`;
    }
    async canRefundOperation(transaction) {
        if (!transaction) {
            return {
                allow: false,
                message: 'La transaction est introuvable',
            };
        }
        if (transaction.statut !== Enum_entity_1.StatusEnum.SUCCESS) {
            return {
                allow: false,
                message: 'Le statut de la transaction ne permet pas de proceder a son remboursmeent',
            };
        }
        if (transaction.transactionRefundFinished) {
            return {
                allow: false,
                message: 'Le transaction a deja ete rembourse',
            };
        }
        const partner = await Parteners_entity_1.Parteners.findOne(transaction === null || transaction === void 0 ? void 0 : transaction.partenersId);
        if (transaction.typeOperation === Enum_entity_1.TypeOperationEnum.CREDIT &&
            partner.solde < transaction.amount + transaction.feeAmount) {
            return {
                allow: false,
                message: 'Le solde du compte du partenaire  permet pas de faire ce remboursement',
            };
        }
        return {
            allow: true,
            message: 'OK',
        };
    }
    async handleTransactionRefundSuccess(transaction) {
        await this.operationPartnerCancelTransaction(transaction, true);
    }
    escapeMysql(val) {
        val = val.replace(/[\0\n\r\b\t\\'"\x1a]/g, function (s) {
            switch (s) {
                case '\0':
                    return '\\0';
                case '\n':
                    return '\\n';
                case '\r':
                    return '\\r';
                case '\b':
                    return '\\b';
                case '\t':
                    return '\\t';
                case '\x1a':
                    return '\\Z';
                case "'":
                    return "''";
                case '"':
                    return '""';
                default:
                    return '\\' + s;
            }
        });
        return val;
    }
    async createClaimForTransaction(transaction, subject, content) {
        const claim = new Claim_entity_1.Claim();
        claim.statut = Enum_entity_1.ClaimStatut.OPENED;
        claim.subject = subject;
        claim.message = content;
        claim.transactionId = transaction.id;
        claim.openedAt = new Date();
        claim.createdAt = new Date();
        claim.partenersId = transaction.partenersId;
        claim.claimRef = this.generateRandomId('C');
        await claim.save();
        this.notifyAdmin(content, Enum_entity_1.TypeEvenEnum.NEW_CLAIM, {}, true, config_1.discordApiConfig().delayedConfirmationSmsCashoutAlertChanelName).then();
        return claim;
    }
    async verseComissionForTransaction(transaction, partner) {
        await partner.reload();
        if (transaction.commissionAmount > 0 && !transaction.isSoldeCommission) {
            await this.setSoldeTableOnly(transaction.commissionAmount, 'parteners', transaction.partenersId, 'solde_commission');
            const operationParteners = new DtoOperationParteners_1.DtoOperationParteners();
            operationParteners.commentaire = `Versement comission pour la transaction #${transaction.transactionId}`;
            operationParteners.amount = transaction.commissionAmount;
            operationParteners.typeOperation = Enum_entity_1.TypeOperationEnum.CREDIT;
            operationParteners.statut = Enum_entity_1.StatusEnum.SUCCESS;
            operationParteners.partenersId = partner.id;
            operationParteners.partenersId = partner.id;
            operationParteners.transactionsId = transaction.id;
            operationParteners.soldeBefor = partner.solde + partner.soldeCommission;
            operationParteners.soldeAfter =
                partner.solde + partner.soldeCommission + transaction.commissionAmount;
            operationParteners.fee = transaction.feeAmount;
            operationParteners.commission = 0;
            operationParteners.createdAt = new Date();
            operationParteners.operation = Enum_entity_1.OperationEnum.COMMISSION;
            await OperationParteners_entity_1.OperationParteners.insert(operationParteners, {
                transaction: true,
            });
        }
    }
    uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
    formatMoney(number, decimals = 1, dec_point = '.', thousands_sep = ' ') {
        number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
        const n = !isFinite(+number) ? 0 : +number, prec = !isFinite(+decimals) ? 0 : Math.abs(decimals), sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep, dec = typeof dec_point === 'undefined' ? '.' : dec_point;
        let s = '';
        const toFixedFix = function (n, prec) {
            const k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    }
    regexEscape(s) {
        return s.replace(/[-[\]{}()*+?.,\\^$|]/g, '\\$&');
    }
    getNowDateWithoutSubUnity() {
        return new Date(new Date().toISOString().substring(0, 19).replace('T', ' '));
    }
    getNowDateWithoutSecond() {
        return new Date(new Date().toISOString().substring(0, 16).replace('T', ' '));
    }
    async waitUntilSecondBetween(min, max) {
        return new Promise((resolve) => {
            const intervalId = setInterval(() => {
                const now = new Date();
                if (now.getSeconds() >= min && now.getSeconds() <= max) {
                    resolve(new Date());
                    clearInterval(intervalId);
                }
            }, 300);
        });
    }
    convertCurrency(from, to, amount) {
        const fromCurrency = Enum_entity_1.Currencies.rates[from];
        const toCurrency = Enum_entity_1.Currencies.rates[to];
        if (!fromCurrency || !toCurrency) {
            throw new Error(`Currency est invalide' ${from}-${to}`);
        }
        const amountToBaseConvertedAmount = amount / fromCurrency;
        return Math.round(amountToBaseConvertedAmount * toCurrency);
    }
    getCurrencyList() {
        return Object.keys(Enum_entity_1.Currencies.rates);
    }
    runWithMaxWaitMs(call, maxWaitMs) {
        return new Promise(async (resolve, reject) => {
            try {
                const clearId = setTimeout(() => {
                    resolve(true);
                    console.log('runWithMaxWaitMs delay arrived');
                }, maxWaitMs);
                const result = await call();
                clearTimeout(clearId);
                resolve(result);
            }
            catch (e) {
                console.log(e);
                reject(e);
            }
        });
    }
    getBalanceAlertTo() {
        return process.env.SERVICE_DAILY_BALANCE_ALERT_PHONE.split(';');
    }
    getSimDisconnectSenegalTo() {
        return process.env.SEND_SIM_DISCONNECTED_ALERT_SENEGAL.split(';');
    }
    getSimDisconnectIvoryCoastTo() {
        return process.env.SEND_SIM_DISCONNECTED_ALERT_IVORY_COST.split(';');
    }
    async notifySimDisconnected(phone) {
        var _a, _b;
        await this.waitSome(60 * 3);
        phone = await Phones_entity_1.Phones.findOne({
            where: {
                id: phone.id,
            },
        });
        if (phone.socket === Enum_entity_1.SocketState.CONNECTED) {
            return;
        }
        const message = `Le téléphone ${phone.number} c'est déconnecté à ${new Date().toISOString().substring(11, 16)}`;
        this.notifyAdmin(message, Enum_entity_1.TypeEvenEnum.PHONE_DISCONNECTED, {}, false, config_1.discordApiConfig().simDisconnectedConnectedAlertChanelName).then();
        const service = await Services_entity_1.Services.findOne({
            where: {
                id: phone.servicesId,
            },
            relations: ['operators', 'operators.country'],
        });
        let tos = [];
        if (((_a = service === null || service === void 0 ? void 0 : service.operators) === null || _a === void 0 ? void 0 : _a.country.code) === 'SEN') {
            tos = this.getSimDisconnectSenegalTo();
        }
        else if (((_b = service === null || service === void 0 ? void 0 : service.operators) === null || _b === void 0 ? void 0 : _b.country.code) === 'CIV') {
            tos = this.getSimDisconnectIvoryCoastTo();
        }
        if (tos.length) {
            for (const to of tos) {
            }
        }
    }
    async notifySimConnected(phone) {
        var _a, _b;
        const message = `Le téléphone ${phone.number} est de nouveau reconnecté à ${new Date()
            .toISOString()
            .substring(11, 16)}h`;
        this.notifyAdmin(message, Enum_entity_1.TypeEvenEnum.PHONE_CONNECTED, {}, false, config_1.discordApiConfig().simDisconnectedConnectedAlertChanelName).then();
        const service = await Services_entity_1.Services.findOne({
            where: {
                id: phone.servicesId,
            },
            relations: ['operators', 'operators.country'],
        });
        let tos = [];
        if (((_a = service === null || service === void 0 ? void 0 : service.operators) === null || _a === void 0 ? void 0 : _a.country.code) === 'SEN') {
            tos = this.getSimDisconnectSenegalTo();
        }
        else if (((_b = service === null || service === void 0 ? void 0 : service.operators) === null || _b === void 0 ? void 0 : _b.country.code) === 'CIV') {
            tos = this.getSimDisconnectIvoryCoastTo();
        }
        if (tos.length) {
            for (const to of tos) {
            }
        }
    }
};
HelperService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectConnection()),
    __metadata("design:paramtypes", [typeorm_2.Connection,
        common_1.HttpService])
], HelperService);
exports.HelperService = HelperService;
//# sourceMappingURL=helper.service.js.map