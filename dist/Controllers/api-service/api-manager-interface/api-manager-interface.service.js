"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiManagerInterface = exports.MANAGER_INIT_UNKNOWN_MESSAGE = exports.MANAGER_INIT_DOWN_MESSAGE = exports.MANAGER_INIT_CASH_OUT_SUCCESS_MESSAGE = exports.MANAGER_INIT_CASH_IN_SUCCESS_MESSAGE = void 0;
const Transactions_entity_1 = require("../../../Models/Entities/Transactions.entity");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
const typeorm_1 = require("typeorm");
const Controller_1 = require("../../Controller");
const sockets_gateway_1 = require("../../../Sockets/sockets.gateway");
const config_1 = require("../../../sdk/Discord/config");
exports.MANAGER_INIT_CASH_IN_SUCCESS_MESSAGE = `Votre opération s'est effectuée sans erreur. Veuillez attendre le callback pour avoir l'état final de la transaction`;
exports.MANAGER_INIT_CASH_OUT_SUCCESS_MESSAGE = `Votre opération s'est effectuée sans erreur, Vous allez recevoir un message de confirmation`;
exports.MANAGER_INIT_DOWN_MESSAGE = `Le services est indisponible pour le moment(pho)`;
exports.MANAGER_INIT_UNKNOWN_MESSAGE = `Votre opération n'a pas pu être traitée pour le moment, réessayez plus tard.`;
class ApiManagerInterface {
    constructor(connection, helper, httpService, apiService) {
        this.connection = connection;
        this.helper = helper;
        this.httpService = httpService;
        this.apiService = apiService;
    }
    async getPendingBillTransaction(params) {
        return {
            success: false,
            message: 'No implemented',
            pendingBills: [],
            billAccountNumber: '',
        };
    }
    async notImplementedYet(params) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        const response = {
            phone: (_b = (_a = params.transaction) === null || _a === void 0 ? void 0 : _a.phone) !== null && _b !== void 0 ? _b : null,
            amount: (_e = (_d = (_c = params.transaction) === null || _c === void 0 ? void 0 : _c.amount) === null || _d === void 0 ? void 0 : _d.toString()) !== null && _e !== void 0 ? _e : null,
            status: Enum_entity_1.StatusEnum.FAILLED,
            externalTransactionId: (_g = (_f = params.transaction) === null || _f === void 0 ? void 0 : _f.externalTransactionId) !== null && _g !== void 0 ? _g : null,
            codeService: (_j = (_h = params.transaction) === null || _h === void 0 ? void 0 : _h.codeSousService) !== null && _j !== void 0 ? _j : null,
            callbackUrl: (_l = (_k = params.transaction) === null || _k === void 0 ? void 0 : _k.urlIpn) !== null && _l !== void 0 ? _l : null,
            transactionId: (_o = (_m = params.transaction) === null || _m === void 0 ? void 0 : _m.transactionId) !== null && _o !== void 0 ? _o : null,
            partnerMessage: "Cette fonctionnalité n'est pas encore disponible pour ce Service",
            codeHttp: Controller_1.CODE_HTTP.NOT_IMPLEMENTED,
        };
        return Promise.resolve(response);
    }
    async createTransaction(phone) {
        let transaction = new Transactions_entity_1.Transactions();
        transaction.isSoldeCommission = +this.apiService.isSoldeComm;
        transaction.codeSousService = this.apiService.sousServices.code;
        transaction.phonesId = phone.id;
        transaction.telephoneNumberService = phone.number;
        transaction.partenerComptesId = this.apiService.comptePartner.id;
        transaction.motif = this.apiService.operationInDto.motif || '';
        transaction.partnerCompteName = this.apiService.comptePartner.name;
        transaction.partenersId = this.apiService.partner.id;
        transaction.sousServicesId = this.apiService.sousServices.id;
        transaction.data = ApiManagerInterface.stringify(this.apiService.operationInDto.data);
        transaction.statut = Enum_entity_1.StatusEnum.PENDING;
        transaction.partenerName = this.apiService.partner.name;
        transaction.createdAt = new Date();
        transaction.dateCreation = new Date();
        transaction.phone = this.apiService.operationInDto.phone;
        transaction.amount = this.apiService.operationInDto.amount;
        transaction.amountInCurrency = this.apiService.operationInDto.amountInCurrency;
        transaction.currency = this.apiService.operationInDto.currency;
        transaction.urlIpn = this.apiService.operationInDto.callbackUrl;
        transaction.serviceName = this.apiService.service.name;
        transaction.sousServiceName = this.apiService.sousServices.name;
        transaction.partnerSolde = this.apiService.partner.solde;
        transaction.partnerSoldeCommission = this.apiService.partner.soldeCommission;
        transaction.phoneSolde = phone.solde;
        transaction.phoneSoldeApi = phone.soldeApi;
        transaction.userAgent = this.apiService.headers['user-agent'];
        transaction.ipAddress = this.apiService.headers['x-forwarded-for'] || '';
        transaction.feeAmount = this.apiService.feeAmount;
        transaction.commissionAmountPsp = this.apiService.commissionAmountPsp;
        transaction.feeAmountPsn = this.apiService.feeAmountPsp;
        if (this.apiService.isSoldeComm) {
            transaction.commissionAmount = 0;
            transaction.soldeCommission =
                this.apiService.partner.soldeCommission -
                    this.apiService.operationInDto.amount -
                    this.apiService.feeAmount;
            transaction.solde = this.apiService.partner.solde;
        }
        else {
            transaction.commissionAmount = this.apiService.commissionAmount;
            if (this.apiService.isSoldeComm) {
                if (this.apiService.sousServices.typeOperation === Enum_entity_1.TypeOperationEnum.DEBIT) {
                    transaction.solde = this.apiService.partner.solde;
                    transaction.soldeCommission =
                        this.apiService.partner.soldeCommission -
                            this.apiService.operationInDto.amount -
                            this.apiService.feeAmount;
                }
                else {
                    transaction.solde = this.apiService.partner.solde;
                    transaction.soldeCommission = this.apiService.partner.soldeCommission;
                }
            }
            else {
                if (this.apiService.sousServices.typeOperation === Enum_entity_1.TypeOperationEnum.DEBIT) {
                    transaction.solde =
                        this.apiService.partner.solde -
                            this.apiService.operationInDto.amount -
                            this.apiService.feeAmount;
                    transaction.soldeCommission = this.apiService.partner.soldeCommission;
                }
                else {
                    transaction.solde = this.apiService.partner.solde;
                    transaction.soldeCommission = this.apiService.partner.soldeCommission;
                }
            }
        }
        transaction.commissionAmountOwner =
            this.apiService.commissionAmountPsp - this.apiService.commissionAmount;
        transaction.feeAmountOwner =
            this.apiService.feeAmount - this.apiService.feeAmountPsp;
        transaction.win =
            transaction.commissionAmountOwner + transaction.feeAmountOwner;
        transaction.operateurName = this.apiService.operator.name;
        transaction.typeOperation = this.apiService.sousServices.typeOperation;
        transaction.transactionId = this.helper.generateTransactionId();
        transaction.externalTransactionId = this.apiService.operationInDto.externalTransactionId;
        transaction.commentaire = `Opération de  ${this.apiService.sousServices.typeOperation} par  ${this.apiService.sousServices.name} ${this.apiService.operator.name}`;
        const saveTransactions = await Transactions_entity_1.Transactions.insert(transaction, {
            transaction: true,
        });
        this.apiService.transactionId = transaction.id =
            saveTransactions.raw.insertId;
        transaction = await this.helper.getTransactionById(transaction.id);
        await this.helper.operationPartnerDoTransaction(transaction);
        await this.helper.setTimeOutDate(transaction);
        return transaction;
    }
    async loadBalancingPhone() {
        const phone = await new Promise(async (resolve) => {
            const phoneStateWhere = this.apiService.sousServices.needPhone
                ? ` AND phones.phone_state = '${Enum_entity_1.PhoneState.UNUSED}' AND phones.socket = '${Enum_entity_1.SocketState.CONNECTED}' `
                : '';
            let query = `SELECT phones.*
                         FROM phones,
                              sous_services_phones
                         where phones.id = sous_services_phones.phones_id
                           AND sous_services_phones.sous_services_id = '${this.apiService.sousServices.id}'
                           AND phones.state = '${Enum_entity_1.StateEnum.ACTIVED}' ${phoneStateWhere}
                           AND phones.services_id = ${this.apiService.service.id}`;
            if (this.apiService.sousServices.typeOperation ===
                Enum_entity_1.TypeOperationEnum.DEBIT &&
                this.apiService.sousServices.needSolde) {
                query += ` AND phones.solde >= ${this.apiService.operationInDto.amount} `;
            }
            if (this.apiService.sousServices.typeOperation === Enum_entity_1.TypeOperationEnum.DEBIT) {
                query += ` ORDER BY solde DESC`;
            }
            else {
                query += ` ORDER BY solde ASC`;
            }
            let res = await this.apiService.connection.query(query);
            this.apiService.phone = await this.selectPhoneFromBalanceResult(res);
            if (this.apiService.phone) {
                resolve(this.apiService.phone);
            }
            else {
                for (let i = 0; i < Enum_entity_1.CONSTANT.TIME_OUT_PHONE_SECOND(); i++) {
                    console.log('WAITING PHONE', i, Enum_entity_1.PHONES_HOLDERS.AVALABLITY);
                    await this.helper.waitSome(2);
                    res = await this.apiService.connection.query(query);
                    this.apiService.phone = await this.selectPhoneFromBalanceResult(res);
                    if (this.apiService.phone) {
                        resolve(this.apiService.phone);
                        break;
                    }
                }
                resolve(null);
            }
        });
        if (!phone) {
            this.helper
                .notifyAdmin(`Pas de canal disponible pour le service ${this.apiService.sousServices.code}`, Enum_entity_1.TypeEvenEnum.NO_CANAL_AVAILABLE, {}, true, config_1.discordApiConfig().noSimAndCriticAlertChanelName)
                .then();
        }
        return phone;
    }
    async activePhone(phoneId, phoneNumber) {
        console.log('activing phone', phoneId, phoneNumber);
        await this.helper.waitSome(0.5);
        console.log('after wait');
        Enum_entity_1.PHONES_HOLDERS.AVALABLITY[phoneNumber]['used'] = false;
        const query = `UPDATE phones
                       set phone_state= '${Enum_entity_1.PhoneState.UNUSED}',
                           last_unused= '${this.helper.mysqlDate(new Date())}'
                       where number = '${phoneNumber}'`;
        console.log('updating query');
        await this.apiService.connection.query(query);
        console.log('updated query phone active ok');
    }
    async disablePhone(phoneId, phoneNumber) {
        const query = `UPDATE phones
                       set phone_state= '${Enum_entity_1.PhoneState.USED}',
                           last_used= '${this.helper.mysqlDate(new Date())}'
                       where number = '${phoneNumber}'`;
        this.apiService.connection.query(query).then((value) => console.log(value));
    }
    async selectPhoneFromBalanceResult(phones) {
        if (!(phones === null || phones === void 0 ? void 0 : phones.length)) {
            return null;
        }
        for (const phone of phones) {
            Enum_entity_1.PHONES_HOLDERS.AVALABLITY[phone.number] = Enum_entity_1.PHONES_HOLDERS.AVALABLITY[phone.number] || {
                used: false,
            };
            const limitNotReached = await this.checkServiceSimLimit(['daily', 'weekly', 'monthly'], phone, this.apiService.sousServices, this.apiService.operationInDto.amount);
            const isFree = !Enum_entity_1.PHONES_HOLDERS.AVALABLITY[phone.number]['used'] ||
                !this.apiService.sousServices.needPhone;
            if (limitNotReached && isFree) {
                Enum_entity_1.PHONES_HOLDERS.AVALABLITY[phone.number]['used'] = true;
                await this.disablePhone(phone.id, phone.number).then((value) => value);
                return phone;
            }
        }
        return null;
    }
    async checkServiceSimLimit(intervalsTime, phone, sousService, nextAmount) {
        for (const interval of intervalsTime) {
            const countField = `${interval}_count_limit`;
            const amountField = `${interval}_amount_limit`;
            const maxTrCount = phone[countField];
            const maxTrAmount = phone[amountField];
            console.log(maxTrCount, countField, 'okk');
            console.log(maxTrAmount, amountField, 'okk');
            if (maxTrAmount === -1 && maxTrCount === -1) {
                console.log('pass if -1', interval, countField, amountField, maxTrAmount, maxTrCount);
                continue;
            }
            const between = this.getBetweenForInterval(interval);
            const transactionWhere = {
                sousServicesId: sousService.id,
                phonesId: phone.id,
                statut: typeorm_1.In([
                    Enum_entity_1.StatusEnum.PENDING,
                    Enum_entity_1.StatusEnum.PROCESSING,
                    Enum_entity_1.StatusEnum.SUCCESS,
                ]),
                createdAt: typeorm_1.Between(between.from, between.to),
            };
            const [, countUsage] = await Transactions_entity_1.Transactions.findAndCount({
                where: transactionWhere,
            });
            const trx = await Transactions_entity_1.Transactions.find({
                where: transactionWhere,
            });
            const amountUsage = trx.reduce((acc, cur) => acc + cur.amount, 0);
            console.log(interval, countField, countUsage);
            console.log(interval, amountField, amountUsage);
            if (maxTrAmount !== -1 && amountUsage + nextAmount > maxTrAmount) {
                console.error('passCheckLimit ailed  max amount', interval, amountUsage + nextAmount, maxTrAmount);
                return false;
            }
            if (maxTrCount !== -1 && countUsage > maxTrCount) {
                console.error('passCheckLimit ailed  max count', interval, countUsage, maxTrCount);
                return false;
            }
            console.info(`Phone ${phone.number} passCheckLimit Success `, countUsage, amountUsage, maxTrAmount, maxTrCount, interval);
        }
        console.log('Pass all Check');
        return true;
    }
    static stringify(data) {
        if (typeof data === 'string') {
            return data;
        }
        try {
            return JSON.stringify(data);
        }
        catch (e) {
            return '';
        }
    }
    getBetweenForInterval(interval) {
        const now = new Date();
        const to = new Date(now);
        let from;
        switch (interval) {
            case 'daily':
                from = new Date(now);
                from.setHours(0, 0, 0, 0);
                break;
            case 'weekly':
                const getMonday = (d) => {
                    d = new Date(d);
                    const day = d.getDay(), diff = d.getDate() - day + (day == 0 ? -6 : 1);
                    return new Date(d.setDate(diff));
                };
                from = getMonday(now);
                break;
            case 'monthly':
                from = new Date(now.getFullYear(), now.getMonth(), 1);
                break;
        }
        return {
            from: from,
            to: to,
        };
    }
    async rebootPhoneIfTimeOutAck(phone, lastTrId, ackReceive, limit = 3) {
        const transactionWhere = {
            phonesId: phone.id,
            id: typeorm_1.LessThanOrEqual(lastTrId),
            statut: typeorm_1.In([Enum_entity_1.StatusEnum.PENDING, Enum_entity_1.StatusEnum.PROCESSING]),
        };
        const trx = await Transactions_entity_1.Transactions.find({
            where: transactionWhere,
            order: {
                createdAt: 'DESC',
            },
            take: limit,
        });
        if (!(trx === null || trx === void 0 ? void 0 : trx.length)) {
            return;
        }
        for (const tr of trx) {
            if (tr.codeUssdResponse === Enum_entity_1.EnumCodeUssdResponse.SUCCESS) {
                console.log('here if have at leas one with success ussd code if limit last');
                return;
            }
        }
        console.log('reboot not match success succesive');
        this.helper
            .notifyAdmin(`Reboot Phone ${phone.number} Because ${limit} transaction with non success ussd code  occcured`, Enum_entity_1.TypeEvenEnum.SUCCESSIVE_USSD_FAIL)
            .then();
        sockets_gateway_1.SocketsGateway.rebootPhone(phone).then();
    }
}
exports.ApiManagerInterface = ApiManagerInterface;
//# sourceMappingURL=api-manager-interface.service.js.map