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
const Utils = require("util");
const api_manager_interface_service_1 = require("./Controllers/api-service/api-manager-interface/api-manager-interface.service");
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
let HelperService = class HelperService {
    constructor(connection, httpService) {
        this.connection = connection;
        this.httpService = httpService;
    }
    async notifyAdmin(message, typeEvent, data = {}) {
        console.log(`CONTACTA ADMIN TO ${message} for EVEN : ${typeEvent}. Data:`, data);
        if (process.env.MODE === 'production') {
            DiscordApiProvider_1.default.sendMessageStatic({
                message: `NEW ALERT MESSAGE:\n${message}\n EVENT : ${typeEvent}`,
            }).then();
        }
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
        return await Transactions_entity_1.Transactions.findOne({
            where: {
                id: typeorm_2.Equal(transactionId),
            },
            relations: extraRelation.concat(['sousServices']),
        });
    }
    async getTransactionByGeneratedId(transactionId, extraRelation = []) {
        return await Transactions_entity_1.Transactions.findOne({
            where: {
                transactionId: typeorm_2.Equal(transactionId),
            },
            relations: extraRelation.concat(['sousServices']),
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
    async setTimeOutDate(transactionId) {
        if (!transactionId) {
            console.log('no transactionId to set setIsCallbackReadyValue');
            return;
        }
        const transaction = await this.getTransactionById(transactionId);
        if (!transaction) {
            console.log('no transaction to set setIsCallbackReadyValue');
            return;
        }
        if (transaction.sousServices.pendingTimeout != -1) {
            transaction.timeOutAt = this.addMinuteToDate(new Date(), transaction.sousServices.pendingTimeout);
            await transaction.save();
        }
    }
    async sendCallBack(transaction) {
        const errorType = await this.provideErrorType(transaction === null || transaction === void 0 ? void 0 : transaction.id);
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
                status: statut,
                externalTransactionId: transaction.externalTransactionId,
                callbackUrl: transaction.urlIpn,
                data: data,
                errorType: errorType,
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
                nextSendCallbackDate: this.addMinuteToDate(new Date(), Enum_entity_1.CONSTANT.WAIT_TIME_FOR_RETRY_CALLBACK_IN_MINUTE()),
            });
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
        operationParteners.partenersId = partner.id;
        operationParteners.partenersId = partner.id;
        operationParteners.transactionsId = transaction.id;
        operationParteners.soldeBefor = partner.solde;
        if (transaction.typeOperation === Enum_entity_1.TypeOperationEnum.CREDIT) {
            operationParteners.soldeAfter =
                partner.solde + transaction.amount - transaction.feeAmount;
            operationParteners.statut = Enum_entity_1.StatusEnum.SUCCESS;
        }
        else if (transaction.typeOperation === Enum_entity_1.TypeOperationEnum.DEBIT) {
            operationParteners.soldeAfter =
                partner.solde - transaction.amount - transaction.feeAmount;
            operationParteners.statut = Enum_entity_1.StatusEnum.SUCCESS;
        }
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
        if (transaction.transactionIsFinish) {
            console.log('transaction already cancel');
            return false;
        }
        const transactionData = {
            dateCanceled: new Date(),
            transactionIsFinish: 1,
            message: `${Enum_entity_1.CONSTANT.CANCEL_TRANSACTION_PREFIX}${transaction.message}`,
            errorMessage: `${Enum_entity_1.CONSTANT.CANCEL_TRANSACTION_PREFIX}${transaction.errorMessage}`,
        };
        await Transactions_entity_1.Transactions.update(transaction.id, transactionData);
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
        if (transaction.typeOperation == Enum_entity_1.TypeOperationEnum.DEBIT) {
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
            const phone = await Phones_entity_1.Phones.findOne({
                where: { id: typeorm_2.Equal(transaction.phonesId) },
            });
            await this.operationPhone(phone, phone.soldeApi, transaction.amount, transaction.id, transaction.typeOperation, `Annulation  ${sousService.typeOperation} pour ${sousService.name} avec le telephone ${phone.number}`, null, Enum_entity_1.OperationEnumPhone.ANNULATION_TRANSACTION);
            await this.setSoldeTableOnly(+transaction.amount, 'phones', transaction.phonesId, 'solde');
        }
        else if (transaction.typeOperation == Enum_entity_1.TypeOperationEnum.CREDIT) {
            const operationParteners = new DtoOperationParteners_1.DtoOperationParteners();
            operationParteners.commentaire = `Annulation operation non crediteur  ${sousService.name} pour l'opérateur ${operator.name}`;
            operationParteners.amount = transaction.amount;
            operationParteners.typeOperation = Enum_entity_1.TypeOperationEnum.DEBIT;
            operationParteners.statut = Enum_entity_1.StatusEnum.SUCCESS;
            operationParteners.partenersId = partner.id;
            operationParteners.partenersId = partner.id;
            operationParteners.transactionsId = transaction.id;
            operationParteners.soldeBefor = partner.solde;
            operationParteners.soldeAfter =
                partner.solde - transaction.amount + transaction.feeAmount;
            operationParteners.fee = transaction.feeAmount;
            operationParteners.commission = transaction.commissionAmount;
            operationParteners.createdAt = new Date();
            operationParteners.operation = Enum_entity_1.OperationEnum.ANNULATION_TRANSACTION;
            await OperationParteners_entity_1.OperationParteners.insert(operationParteners, {
                transaction: true,
            });
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
    async sendSms(tos, message, sender) {
        console.log('sending smss to ', tos);
        const response = await this.httpService
            .post('https://gateway.intechsms.sn/api/send-sms', {
            app_key: process.env.SMS_API_KEY,
            sender: sender,
            content: message,
            msisdn: tos,
        })
            .toPromise();
        console.log(response.data);
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
    async checkServiceConfig() {
        const correctServiceConfig = require('../service.config.json');
        const mismatch = {};
        const columnInfo = this.connection.getMetadata('SousServices').columns;
        const uniform = (value) => {
            if (value !== null && value !== undefined) {
                return String(value).replace('.0000', '').replace('.0000', '');
            }
            return null;
        };
        for (const serviceConfig of correctServiceConfig) {
            const dbService = await SousServices_entity_1.SousServices.findOne({
                where: {
                    code: typeorm_2.Equal(serviceConfig.code),
                },
            });
            if (!dbService) {
                mismatch[serviceConfig.code] = mismatch[serviceConfig.code] || [];
                mismatch[serviceConfig.code].push({
                    field: serviceConfig.code,
                    dbValue: serviceConfig.code,
                    fileValue: serviceConfig.code,
                });
                continue;
            }
            console.log(dbService);
            for (const key in serviceConfig) {
                if (serviceConfig.hasOwnProperty(key)) {
                    const column = columnInfo.find((c) => c.givenDatabaseName === key);
                    if (uniform(serviceConfig[key]) !==
                        uniform(dbService[column.propertyName])) {
                        console.log(column.givenDatabaseName, 'mapped to => ', column.propertyName, serviceConfig[key], dbService[column.propertyName], 'failed');
                        mismatch[serviceConfig.code] = mismatch[serviceConfig.code] || [];
                        mismatch[serviceConfig.code].push({
                            field: key,
                            dbValue: dbService[key],
                            fileValue: serviceConfig[key],
                        });
                        this.disableSousService(dbService.id, `Le service ${dbService.name} n'est pas bien configuré`, Enum_entity_1.TypeEvenEnum.SERVICE_CONFIG_MISMATCH).then();
                    }
                }
            }
            if (Object.keys(mismatch).length > 0) {
                console.log('---- START SERVICE CONFIG MISMATCH -----');
                console.log(mismatch);
                console.log('---- END SERVICE CONFIG MISMATCH -----');
            }
            else {
                console.log('ALL SERVICE ARE WELL CONFIGURED');
            }
        }
    }
    async disableSousService(serviceId, message, type) {
        await Transactions_entity_1.Transactions.update(serviceId, {
            state: Enum_entity_1.StateEnum.INACTIVED,
        });
        if (message) {
            this.notifyAdmin(message, type).then();
        }
    }
    async handleSuccessTransactionCreditDebit(transaction, sousServiceTransactionId = null) {
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
        await Transactions_entity_1.Transactions.update(transaction.id, transactionData);
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
        }
        else if (sousService.typeOperation == Enum_entity_1.TypeOperationEnum.CREDIT) {
            await this.setSoldeTableOnly(transaction.amount - transaction.feeAmount, 'parteners', transaction.partenersId, 'solde');
            await this.setSoldeTableOnly(transaction.amount, 'phones', transaction.phonesId, 'solde');
            await this.operationPhone(phone, soldeApi, transaction.amount, transaction.id, sousService.typeOperation, `Operation de ${sousService.typeOperation} pour ${sousService.name} avec le telephone ${phone.number}`);
        }
    }
    isNotCancelable(preStatus, status) {
        return ([Enum_entity_1.StatusEnum.SUCCESS, Enum_entity_1.StatusEnum.PROCESSING, Enum_entity_1.StatusEnum.PENDING].includes(preStatus) ||
            [Enum_entity_1.StatusEnum.SUCCESS, Enum_entity_1.StatusEnum.PROCESSING, Enum_entity_1.StatusEnum.PENDING].includes(status));
    }
    appendQueryParams(url, queryParams) {
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
            where: { appKey: typeorm_2.Equal(operationInDto === null || operationInDto === void 0 ? void 0 : operationInDto.apiKey) },
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
        return commission.amountFee || 0;
    }
    async provideErrorType(transactionId, providedErrorMessage = undefined, providedError = undefined) {
        if (!transactionId) {
            console.log('no transactionId to set setIsCallbackReadyValue');
            return null;
        }
        const transaction = await this.getTransactionById(transactionId, [
            'errorTypes',
        ]);
        if (!transaction) {
            console.log('no transaction to set setIsCallbackReadyValue');
            return null;
        }
        if (transaction.errorTypes) {
            return {
                id: transaction.errorTypes.id,
                codeService: transaction.codeSousService,
                code: transaction.errorTypes.code,
                message: transaction.errorTypes.message.replace('__amount__', transaction.amount.toString()),
            };
        }
        if (providedError) {
            transaction.errorTypes = providedError;
            await transaction.save();
            return {
                id: providedError.id,
                codeService: transaction.codeSousService,
                code: providedError.code,
                message: providedError.message.replace('__amount__', transaction.amount.toString()),
            };
        }
        const noError = [
            Enum_entity_1.StatusEnum.SUCCESS.toString(),
            Enum_entity_1.StatusEnum.PROCESSING.toString(),
            Enum_entity_1.StatusEnum.PENDING.toString(),
        ].includes(transaction.statut) ||
            [
                Enum_entity_1.StatusEnum.SUCCESS.toString(),
                Enum_entity_1.StatusEnum.PROCESSING.toString(),
                Enum_entity_1.StatusEnum.PENDING.toString(),
            ].includes(transaction.preStatut);
        if (noError) {
            return null;
        }
        if (!transaction.errorMessage && !providedErrorMessage) {
            return null;
        }
        const error = await this.getErrorType(providedErrorMessage || transaction.errorMessage, transaction.codeSousService, transaction.amount.toString());
        console.log('errror', error);
        if (!error) {
            return {
                id: null,
                codeService: null,
                code: 'unknown_error',
                message: api_manager_interface_service_1.MANAGER_INIT_UNKNOWN_MESSAGE,
            };
        }
        transaction.errorTypes = error;
        await transaction.save();
        return {
            id: error.id,
            codeService: transaction.codeSousService,
            code: error.code,
            message: error.message.replace('__amount__', transaction.amount.toString()),
        };
    }
    async getErrorType(errorMessage, codeSousService, amount) {
        var _a;
        if (!errorMessage) {
            return null;
        }
        console.log(errorMessage, codeSousService);
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
            where: {
                sousServicesId: typeorm_2.Equal(sousServices.id),
            },
        });
        const error = allErrorTypes.find((el) => {
            try {
                let val = ' ';
                if (el.isJson) {
                    val = mapper(errorDataJson, el.index);
                }
                else {
                    val = errorData;
                }
                return new RegExp(noAccent(el.regex), 'i').test(val ? noAccent(val) : '');
            }
            catch (error) {
                console.log(error, 'matching error', error.message);
                return false;
            }
        });
        if (!error) {
            return null;
        }
        return {
            id: error.id,
            codeService: codeSousService,
            code: error.code,
            message: error.message.replace('__amount__', amount === null || amount === void 0 ? void 0 : amount.toString()),
        };
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