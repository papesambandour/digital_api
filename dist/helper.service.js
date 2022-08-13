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
var HelperService_1;
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
const Utils = require("util");
const SousServices_entity_1 = require("./Models/Entities/SousServices.entity");
const DtoOperationParteners_1 = require("./Models/Dto/DtoOperationParteners");
const OperationParteners_entity_1 = require("./Models/Entities/OperationParteners.entity");
const Parteners_entity_1 = require("./Models/Entities/Parteners.entity");
const Operators_entity_1 = require("./Models/Entities/Operators.entity");
let HelperService = HelperService_1 = class HelperService {
    constructor(connection, httpService) {
        this.connection = connection;
        this.httpService = httpService;
    }
    async notifyAdmin(message, typeEvent, data = {}) {
        console.log(`CONTACTA ADMIN TO ${message} for EVEN : ${typeEvent}. Data:`, data);
    }
    async setSoldeTableOnly(value, tableName, id, field) {
        return this.connection.query(`update ${tableName} set ${field} =  ${field} + ${value} where id=${id}`);
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
        operationPhones.amount = Math.abs(amount);
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
    async waitSome(seconde) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, seconde * 1000);
        });
    }
    mysqlDate(d) {
        return d.toISOString().substr(0, 19).replace('T', ' ');
    }
    async getApiManagerInterface(codeService, apiService) {
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
    async getTransactionById(transactionId) {
        return await Transactions_entity_1.Transactions.findOne({
            where: {
                id: typeorm_2.Equal(transactionId),
            },
            relations: ['sousServices'],
        });
    }
    async setIsCallbackReadyValue(transactionId) {
        var _a, _b, _c, _d;
        if (!transactionId) {
            console.log('no transactionId to set setIsCallbackReadyValue');
            return;
        }
        const transaction = await this.getTransactionById(transactionId);
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
        if (transaction.callbackIsSend !== value) {
            if (value) {
                transaction.nextSendCallbackDate = new Date();
            }
            transaction.callbackReady = value;
            await transaction.save();
        }
    }
    async sendCallBack(transaction) {
        let data = {};
        try {
            data = JSON.parse(transaction.data);
        }
        catch (e) {
            data = {};
        }
        const statut = ['SUCCESS'].includes(transaction.statut) ||
            ['SUCCESS'].includes(transaction.preStatut)
            ? Enum_entity_1.StatusEnum.SUCCESS
            : Enum_entity_1.StatusEnum.FAILLED;
        const dataSended = {
            code: 2000,
            msg: transaction.commentaire,
            error: false,
            status: statut,
            transaction: {
                phone: transaction.phone,
                amount: transaction.amount,
                codeService: transaction.codeSousService,
                nameService: transaction.sousServiceName,
                commission: transaction.commissionAmount,
                transactionId: transaction.transactionId,
                status: statut,
                externalTransactionId: transaction.externalTransactionId,
                callbackUrl: transaction.urlIpn,
                data: data,
            },
        };
        try {
            const dataResponse = await this.httpService
                .post(transaction.urlIpn, dataSended)
                .toPromise();
            await Transactions_entity_1.Transactions.update(transaction.id, {
                dataSended: JSON.stringify(dataSended),
                dataResponseCallback: JSON.stringify({
                    statusCode: dataResponse.status,
                    data: Utils.inspect(dataResponse.data),
                }),
                callbackIsSend: 1,
                callbackSendedAt: new Date(),
            });
            return dataResponse.data;
        }
        catch (e) {
            console.log('Erreur callback', e);
            await Transactions_entity_1.Transactions.update(transaction.id, {
                dataSended: JSON.stringify(dataSended),
                dataResponseCallback: e === null || e === void 0 ? void 0 : e.message,
                callbackIsSend: 2,
                nextSendCallbackDate: HelperService_1.addMinuteToDate(new Date(), Enum_entity_1.CONSTANT.WAIT_TIME_FOR_RETRY_CALLBACK_IN_MINUTE()),
            });
            return e.message || 'error';
        }
    }
    static addMinuteToDate(date, minutes) {
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
        await this.setSoldeTableForDebitOnly(sousService, -transaction.amount + -transaction.feeAmount, 'parteners', partner.id, transaction.isSoldeCommission ? 'solde_commission' : 'solde');
        if (!transaction.isSoldeCommission) {
            await this.setSoldeTableForDebitOnly(sousService, transaction.commissionAmount, 'parteners', partner.id, 'solde_commission');
        }
        const operationParteners = new DtoOperationParteners_1.DtoOperationParteners();
        operationParteners.commentaire = transaction === null || transaction === void 0 ? void 0 : transaction.commentaire;
        operationParteners.amount = transaction.amount;
        operationParteners.typeOperation = transaction.typeOperation;
        operationParteners.statut = Enum_entity_1.StatusEnum.SUCCESS;
        operationParteners.partenersId = partner.id;
        operationParteners.partenersId = partner.id;
        operationParteners.transactionsId = transaction.id;
        operationParteners.soldeBefor = partner.solde;
        operationParteners.soldeAfter =
            partner.solde - transaction.amount - transaction.feeAmount;
        operationParteners.fee = transaction.feeAmount;
        operationParteners.commission = transaction.commissionAmount;
        operationParteners.createdAt = new Date();
        operationParteners.operation = Enum_entity_1.OperationEnum.TRANSACTION;
        await OperationParteners_entity_1.OperationParteners.insert(operationParteners, {
            transaction: true,
        });
        if (transaction.typeOperation == Enum_entity_1.TypeOperationEnum.DEBIT) {
            const phone = await Phones_entity_1.Phones.findOne({
                where: { id: typeorm_2.Equal(transaction.phonesId) },
            });
            await this.operationPhone(phone, phone.soldeApi, -transaction.amount, transaction.id, transaction.typeOperation, `Operation de ${sousService.typeOperation} pour ${sousService.name} avec le telephone ${phone.number}`);
            await this.setSoldeTableOnly(-transaction.amount, 'phones', transaction.phonesId, 'solde');
        }
    }
    async operationPartnerCancelTransaction(transaction) {
        if (!transaction) {
            console.log('No transaction for operation cancel');
            return;
        }
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
        await this.setSoldeTableForDebitOnly(sousService, transaction.amount + transaction.feeAmount, 'parteners', partner.id, transaction.isSoldeCommission ? 'solde_commission' : 'solde');
        if (!transaction.isSoldeCommission) {
            await this.setSoldeTableForDebitOnly(sousService, -transaction.commissionAmount, 'parteners', partner.id, 'solde_commission');
        }
        const operationParteners = new DtoOperationParteners_1.DtoOperationParteners();
        operationParteners.commentaire = `Annulation  ${sousService.name} pour l'opérateur ${operator.name}`;
        operationParteners.amount = transaction.amount;
        operationParteners.typeOperation = Enum_entity_1.TypeOperationEnum.CREDIT;
        operationParteners.statut = Enum_entity_1.StatusEnum.SUCCESS;
        operationParteners.partenersId = partner.id;
        operationParteners.partenersId = partner.id;
        operationParteners.transactionsId = transaction.id;
        operationParteners.soldeBefor = partner.solde;
        operationParteners.soldeAfter =
            partner.solde + transaction.amount + transaction.feeAmount;
        operationParteners.fee = transaction.feeAmount;
        operationParteners.commission = transaction.commissionAmount;
        operationParteners.createdAt = new Date();
        operationParteners.operation = Enum_entity_1.OperationEnum.ANNULATION_TRANSACTION;
        await OperationParteners_entity_1.OperationParteners.insert(operationParteners, {
            transaction: true,
        });
        if (transaction.typeOperation == Enum_entity_1.TypeOperationEnum.DEBIT) {
            const phone = await Phones_entity_1.Phones.findOne({
                where: { id: typeorm_2.Equal(transaction.phonesId) },
            });
            await this.operationPhone(phone, phone.soldeApi, transaction.amount, transaction.id, transaction.typeOperation, `Annulation  ${sousService.typeOperation} pour ${sousService.name} avec le telephone ${phone.number}`, null, Enum_entity_1.OperationEnumPhone.ANNULATION_TRANSACTION);
            await this.setSoldeTableOnly(+transaction.amount, 'phones', transaction.phonesId, 'solde');
        }
    }
    async updateApiBalance(apiManager, usedPhoneId) {
        if (!usedPhoneId) {
            return;
        }
        const balanceInfo = await apiManager.getBalance({});
        if (balanceInfo.success) {
            const balanceInfo = await apiManager.getBalance({});
            await this.setSoldeTableFromValue(balanceInfo.newBalance, 'phones', usedPhoneId, 'solde_api');
        }
    }
    async base64(str) {
        const buff = Buffer.from(str);
        return buff.toString('base64');
    }
    async sendSms(to, message, sender) {
        console.log('sending smss to ', to);
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
};
HelperService = HelperService_1 = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectConnection()),
    __metadata("design:paramtypes", [typeorm_2.Connection,
        common_1.HttpService])
], HelperService);
exports.HelperService = HelperService;
//# sourceMappingURL=helper.service.js.map