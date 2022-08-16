"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiManagerInterface = exports.MANAGER_INIT_UNKNOWN_MESSAGE = exports.MANAGER_INIT_DOWN_MESSAGE = exports.MANAGER_INIT_CASH_OUT_SUCCESS_MESSAGE = exports.MANAGER_INIT_CASH_IN_SUCCESS_MESSAGE = void 0;
const Transactions_entity_1 = require("../../../Models/Entities/Transactions.entity");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
const Controller_1 = require("../../Controller");
exports.MANAGER_INIT_CASH_IN_SUCCESS_MESSAGE = `Votre opération s'est effectuée sans erreur. Veuillez attendre le callback pour avoir l'état final de la transaction`;
exports.MANAGER_INIT_CASH_OUT_SUCCESS_MESSAGE = `Votre opération s'est effectuée sans erreur, Vous allez recevoir un message de confirmation`;
exports.MANAGER_INIT_DOWN_MESSAGE = `Le services est indisponible pour le moment(pho)`;
exports.MANAGER_INIT_UNKNOWN_MESSAGE = `Une erreur inconnue s'est produite`;
class ApiManagerInterface {
    constructor(connection, helper, httpService, apiService) {
        this.connection = connection;
        this.helper = helper;
        this.httpService = httpService;
        this.apiService = apiService;
    }
    async notImplementedYet(params) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        const response = {
            phone: (_b = (_a = params.transaction) === null || _a === void 0 ? void 0 : _a.phone) !== null && _b !== void 0 ? _b : null,
            amount: (_e = (_d = (_c = params.transaction) === null || _c === void 0 ? void 0 : _c.amount) === null || _d === void 0 ? void 0 : _d.toString()) !== null && _e !== void 0 ? _e : null,
            status: 'NOT_IMPLEMENTED',
            externalTransactionId: (_g = (_f = params.transaction) === null || _f === void 0 ? void 0 : _f.externalTransactionId) !== null && _g !== void 0 ? _g : null,
            codeService: (_j = (_h = params.transaction) === null || _h === void 0 ? void 0 : _h.codeSousService) !== null && _j !== void 0 ? _j : null,
            callbackUrl: (_l = (_k = params.transaction) === null || _k === void 0 ? void 0 : _k.urlIpn) !== null && _l !== void 0 ? _l : null,
            transactionId: (_o = (_m = params.transaction) === null || _m === void 0 ? void 0 : _m.transactionId) !== null && _o !== void 0 ? _o : null,
            partnerMessage: 'Service non implementé encore',
            codeHttp: Controller_1.CODE_HTTP.NOT_IMPLEMENTED,
        };
        return Promise.resolve(response);
    }
    async createTransaction(phone) {
        const transaction = new Transactions_entity_1.Transactions();
        transaction.isSoldeCommission = +this.apiService.isSoldeComm;
        transaction.codeSousService = this.apiService.sousServices.code;
        transaction.phonesId = phone.id;
        transaction.telephoneNumberService = phone.number;
        transaction.partenerComptesId = this.apiService.comptePartner.id;
        transaction.partnerCompteName = this.apiService.comptePartner.name;
        transaction.partenersId = this.apiService.partner.id;
        transaction.sousServicesId = this.apiService.sousServices.id;
        transaction.data = JSON.stringify(this.apiService.operationInDto.data);
        transaction.statut = Enum_entity_1.StatusEnum.PENDING;
        transaction.partenerName = this.apiService.partner.name;
        transaction.createdAt = new Date();
        transaction.dateCreation = new Date();
        transaction.phone = this.apiService.operationInDto.phone;
        transaction.amount = this.apiService.operationInDto.amount;
        transaction.urlIpn = this.apiService.operationInDto.callbackUrl;
        transaction.serviceName = this.apiService.service.name;
        transaction.sousServiceName = this.apiService.sousServices.name;
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
            transaction.solde =
                this.apiService.partner.solde -
                    this.apiService.operationInDto.amount -
                    this.apiService.feeAmount;
            transaction.soldeCommission = this.apiService.partner.soldeCommission;
        }
        transaction.commissionAmountOwner =
            this.apiService.commissionAmountPsp - this.apiService.commissionAmount;
        transaction.feeAmountOwner =
            this.apiService.feeAmount - this.apiService.feeAmountPsp;
        transaction.operateurName = this.apiService.operator.name;
        transaction.typeOperation = this.apiService.sousServices.typeOperation;
        transaction.transactionId = this.apiService.generateTransactionId();
        transaction.externalTransactionId = this.apiService.operationInDto.externalTransactionId;
        transaction.commentaire = `Opération de  ${this.apiService.sousServices.typeOperation} par  ${this.apiService.sousServices.name} ${this.apiService.operator.name}`;
        const saveTransactions = await Transactions_entity_1.Transactions.insert(transaction, {
            transaction: true,
        });
        this.apiService.transactionId = transaction.id =
            saveTransactions.raw.insertId;
        this.helper
            .operationPartnerDoTransaction(transaction)
            .then((value) => value);
        return transaction;
    }
    async loadBalancingPhone() {
        return new Promise(async (resolve) => {
            const phoneStateWhere = this.apiService.sousServices.needPhone
                ? ` AND phones.phone_state = '${Enum_entity_1.PhoneState.UNUSED}' AND phones.socket = '${Enum_entity_1.SocketState.CONNECTED}' `
                : '';
            let query = `SELECT phones.*
                         FROM phones,
                              sous_services_phones
                         where phones.id = sous_services_phones.phones_id
                           AND sous_services_phones.sous_services_id = '${this.apiService.sousServices.id}'
                           AND phones.state = '${Enum_entity_1.StateEnum.ACTIVED}'
                           ${phoneStateWhere}
                           AND phones.services_id = ${this.apiService.service.id}`;
            if (this.apiService.sousServices.typeOperation === Enum_entity_1.TypeOperationEnum.DEBIT) {
                query += ` AND phones.solde >= ${this.apiService.operationInDto.amount} `;
            }
            query += ` ORDER BY RAND() LIMIT 1;`;
            let res = await this.apiService.connection.query(query);
            this.apiService.phone = res = (res === null || res === void 0 ? void 0 : res.length) ? res[0] : null;
            if (this.apiService.phone) {
                Enum_entity_1.PHONES_HOLDERS.AVALABLITY[this.apiService.phone.number] = Enum_entity_1.PHONES_HOLDERS
                    .AVALABLITY[this.apiService.phone.number] || {
                    used: false,
                };
            }
            if (res &&
                (!Enum_entity_1.PHONES_HOLDERS.AVALABLITY[this.apiService.phone.number]['used'] ||
                    !this.apiService.sousServices.needPhone)) {
                Enum_entity_1.PHONES_HOLDERS.AVALABLITY[this.apiService.phone.number]['used'] = true;
                this.disablePhone(res.id, res.number).then((value) => value);
                resolve(res);
            }
            else {
                for (let i = 0; i < Enum_entity_1.CONSTANT.TIME_OUT_PHONE_SECOND(); i++) {
                    console.log('WAITING PHONE', i, Enum_entity_1.PHONES_HOLDERS.AVALABLITY);
                    await this.helper.waitSome(2);
                    res = await this.apiService.connection.query(query);
                    this.apiService.phone = res = (res === null || res === void 0 ? void 0 : res.length) ? res[0] : null;
                    if (this.apiService.phone) {
                        Enum_entity_1.PHONES_HOLDERS.AVALABLITY[this.apiService.phone.number] = Enum_entity_1.PHONES_HOLDERS.AVALABLITY[this.apiService.phone.number] || {
                            used: false,
                        };
                    }
                    if (res &&
                        (!Enum_entity_1.PHONES_HOLDERS.AVALABLITY[this.apiService.phone.number]['used'] ||
                            !this.apiService.sousServices.needPhone)) {
                        Enum_entity_1.PHONES_HOLDERS.AVALABLITY[this.apiService.phone.number]['used'] = true;
                        this.disablePhone(res.id, res.number).then((value) => value);
                        resolve(res);
                        break;
                    }
                }
                resolve(null);
            }
        });
    }
    async activePhone(phoneId, phoneNumber) {
        await this.helper.waitSome(3);
        Enum_entity_1.PHONES_HOLDERS.AVALABLITY[phoneNumber]['used'] = false;
        const query = `UPDATE phones
                       set phone_state= '${Enum_entity_1.PhoneState.UNUSED}',
                           last_unused= '${this.helper.mysqlDate(new Date())}'
                       where number = '${phoneNumber}'`;
        this.apiService.connection.query(query).then((value) => console.log(value));
    }
    async disablePhone(phoneId, phoneNumber) {
        const query = `UPDATE phones
                       set phone_state= '${Enum_entity_1.PhoneState.USED}',
                           last_used= '${this.helper.mysqlDate(new Date())}'
                       where number = '${phoneNumber}'`;
        this.apiService.connection.query(query).then((value) => console.log(value));
    }
}
exports.ApiManagerInterface = ApiManagerInterface;
//# sourceMappingURL=api-manager-interface.service.js.map