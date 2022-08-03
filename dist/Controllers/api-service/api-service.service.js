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
exports.ApiServiceService = void 0;
const common_1 = require("@nestjs/common");
const PartenerComptes_entity_1 = require("../../Models/Entities/PartenerComptes.entity");
const typeorm_1 = require("typeorm");
const SousServices_entity_1 = require("../../Models/Entities/SousServices.entity");
const Enum_entity_1 = require("../../Models/Entities/Enum.entity");
const SousServicesParteners_entity_1 = require("../../Models/Entities/SousServicesParteners.entity");
const Parteners_entity_1 = require("../../Models/Entities/Parteners.entity");
const Commission_entity_1 = require("../../Models/Entities/Commission.entity");
const Transactions_entity_1 = require("../../Models/Entities/Transactions.entity");
const Operators_entity_1 = require("../../Models/Entities/Operators.entity");
const Services_entity_1 = require("../../Models/Entities/Services.entity");
const DtoOperationParteners_1 = require("../../Models/Dto/DtoOperationParteners");
const OperationParteners_entity_1 = require("../../Models/Entities/OperationParteners.entity");
const sockets_gateway_1 = require("../../Sockets/sockets.gateway");
const typeorm_2 = require("@nestjs/typeorm");
const helper_service_1 = require("../../helper.service");
const UssdExecutionMessages_entity_1 = require("../../Models/Entities/UssdExecutionMessages.entity");
let ApiServiceService = class ApiServiceService {
    constructor(connection, helper) {
        this.connection = connection;
        this.helper = helper;
        this.comptePartner = null;
        this.partner = null;
        this.sousServices = null;
        this.sousServicesPartner = null;
        this.comission = null;
        this.feeAmount = 0;
        this.commissionAmount = 0;
    }
    async setSoldeTable(value, tableName, id, field = 'solde') {
        console.log('RELEVE-api', ` ${tableName} set ${field} =  ${field} + ${value} where id=${id}`);
        if (this.sousServices.typeOperation == Enum_entity_1.TypeOperationEnum.DEBIT) {
            return this.connection.query(`update ${tableName} set ${field} =  ${field} + ${value} where id=${id}`);
        }
    }
    initFeeCommission(commission, amount) {
        let amountFee = 0;
        let amountCommssion = 0;
        switch (commission === null || commission === void 0 ? void 0 : commission.commissionIsFixe) {
            case Enum_entity_1.CommissionFeeTypeEnum.FIXE:
                amountCommssion = commission === null || commission === void 0 ? void 0 : commission.amountCommssion;
                break;
            case Enum_entity_1.CommissionFeeTypeEnum.TAUX:
                amountCommssion = ((commission === null || commission === void 0 ? void 0 : commission.tauxCommission) * amount) / 100;
                break;
            case Enum_entity_1.CommissionFeeTypeEnum.BOTH:
                amountCommssion =
                    ((commission === null || commission === void 0 ? void 0 : commission.tauxCommission) * amount) / 100 +
                        (commission === null || commission === void 0 ? void 0 : commission.amountCommssion);
                break;
            default:
                throw new Error('Type Commission non prix en charge');
        }
        switch (commission.feeIsFixe) {
            case Enum_entity_1.CommissionFeeTypeEnum.FIXE:
                amountFee = commission === null || commission === void 0 ? void 0 : commission.amountFee;
                break;
            case Enum_entity_1.CommissionFeeTypeEnum.TAUX:
                amountFee = ((commission === null || commission === void 0 ? void 0 : commission.tauxFee) * amount) / 100;
                break;
            case Enum_entity_1.CommissionFeeTypeEnum.BOTH:
                amountFee =
                    ((commission === null || commission === void 0 ? void 0 : commission.tauxFee) * amount) / 100 + (commission === null || commission === void 0 ? void 0 : commission.amountFee);
                break;
            default:
                throw new Error('Type Frais non prix en charge');
        }
        this.feeAmount = amountFee;
        this.commissionAmount = amountCommssion;
    }
    async validatorCustomApi(operationInDto) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        const msg = {
            apiKey: [],
            codeService: [],
            amount: [],
            callbackUrl: [],
            phone: [],
        };
        let asError = false;
        this.comptePartner = await PartenerComptes_entity_1.PartenerComptes.findOne({
            where: { appKey: typeorm_1.Equal(operationInDto === null || operationInDto === void 0 ? void 0 : operationInDto.apiKey) },
        });
        if (this.comptePartner) {
            this.partner = await Parteners_entity_1.Parteners.findOne((_a = this === null || this === void 0 ? void 0 : this.comptePartner) === null || _a === void 0 ? void 0 : _a.partenersId);
        }
        this.sousServices = await SousServices_entity_1.SousServices.findOne({
            where: { code: typeorm_1.Equal(operationInDto === null || operationInDto === void 0 ? void 0 : operationInDto.codeService) },
        });
        if (+(operationInDto === null || operationInDto === void 0 ? void 0 : operationInDto.amount) < 1) {
            asError = true;
            msg.amount.push('Le montant doit etre positif ( > 1)!');
        }
        if (!(this === null || this === void 0 ? void 0 : this.comptePartner)) {
            asError = true;
            msg.apiKey.push('Le clee API est invalide');
        }
        if ((this === null || this === void 0 ? void 0 : this.comptePartner) &&
            ((_b = this === null || this === void 0 ? void 0 : this.comptePartner) === null || _b === void 0 ? void 0 : _b.state) !== Enum_entity_1.StateEnum.ACTIVED) {
            asError = true;
            msg.apiKey.push('Le compte parteneur est desactivé');
        }
        if (!(this === null || this === void 0 ? void 0 : this.sousServices)) {
            asError = true;
            msg.codeService.push('Le services est introuvable');
        }
        if (this === null || this === void 0 ? void 0 : this.sousServices) {
            if (((_c = this === null || this === void 0 ? void 0 : this.sousServices) === null || _c === void 0 ? void 0 : _c.state) !== Enum_entity_1.StateEnum.ACTIVED) {
                asError = true;
                msg.codeService.push('Le  services est temporairement desactivé');
            }
            if (+(operationInDto === null || operationInDto === void 0 ? void 0 : operationInDto.amount) > ((_d = this.sousServices) === null || _d === void 0 ? void 0 : _d.maxLimitTransaction) &&
                ((_e = this.sousServices) === null || _e === void 0 ? void 0 : _e.maxLimitTransaction) != -1) {
                asError = true;
                msg.amount.push('limit maximum par transaction est depassé . Max limit : ' +
                    ((_f = this.sousServices) === null || _f === void 0 ? void 0 : _f.maxLimitTransaction));
            }
        }
        if ((this === null || this === void 0 ? void 0 : this.comptePartner) && (this === null || this === void 0 ? void 0 : this.sousServices)) {
            this.sousServicesPartner = await SousServicesParteners_entity_1.SousServicesParteners.findOne({
                where: {
                    partenersId: typeorm_1.Equal(this.comptePartner.partenersId),
                    sousServicesId: typeorm_1.Equal(this.sousServices.id),
                    state: typeorm_1.Equal(Enum_entity_1.StateEnum.ACTIVED),
                },
            });
            if (!(this === null || this === void 0 ? void 0 : this.sousServicesPartner)) {
                asError = true;
                msg.codeService.push("Le partenaire n'est pas souscrit au service demandé");
            }
            if ((this === null || this === void 0 ? void 0 : this.sousServicesPartner) &&
                ((_g = this === null || this === void 0 ? void 0 : this.sousServicesPartner) === null || _g === void 0 ? void 0 : _g.state) !== Enum_entity_1.StateEnum.ACTIVED) {
                asError = true;
                msg.codeService.push('Le services est temporairement desactivé pour le partenaire');
            }
        }
        if (+((_h = this === null || this === void 0 ? void 0 : this.partner) === null || _h === void 0 ? void 0 : _h.solde) < +(operationInDto === null || operationInDto === void 0 ? void 0 : operationInDto.amount)) {
            asError = true;
            msg.apiKey.push('Le solde global du partenaire est infusisant pour effectuer cette operation');
        }
        if ((this === null || this === void 0 ? void 0 : this.partner) && (this === null || this === void 0 ? void 0 : this.sousServices)) {
            this.comission = await Commission_entity_1.Commission.findOne({
                where: [
                    {
                        sousServicesId: (_j = this === null || this === void 0 ? void 0 : this.sousServices) === null || _j === void 0 ? void 0 : _j.id,
                        partenersId: ((_k = this === null || this === void 0 ? void 0 : this.partner) === null || _k === void 0 ? void 0 : _k.id) || ((_l = this === null || this === void 0 ? void 0 : this.sousServices) === null || _l === void 0 ? void 0 : _l.id),
                        amountStart: typeorm_1.LessThanOrEqual(+(operationInDto === null || operationInDto === void 0 ? void 0 : operationInDto.amount)),
                        amountEnd: typeorm_1.MoreThanOrEqual(+(operationInDto === null || operationInDto === void 0 ? void 0 : operationInDto.amount)),
                    },
                    {
                        sousServicesId: this.sousServices.id,
                        partenersId: ((_m = this === null || this === void 0 ? void 0 : this.partner) === null || _m === void 0 ? void 0 : _m.id) || ((_o = this === null || this === void 0 ? void 0 : this.sousServices) === null || _o === void 0 ? void 0 : _o.id),
                        amountStart: typeorm_1.LessThanOrEqual(+operationInDto.amount),
                        amountEnd: typeorm_1.Equal('-1'),
                    },
                ],
            });
            if (!(this === null || this === void 0 ? void 0 : this.comission)) {
                asError = true;
                msg.apiKey.push('Les commissions ne sont pas configurées pour ce montant');
            }
        }
        if (this === null || this === void 0 ? void 0 : this.comission) {
            this.initFeeCommission(this.comission, +operationInDto.amount);
        }
        if (this === null || this === void 0 ? void 0 : this.sousServices) {
            this.service = await Services_entity_1.Services.findOne(this.sousServices.servicesId);
            this.operator = await Operators_entity_1.Operators.findOne(this.service.operatorsId);
            const regexPhone = new RegExp(this.sousServices.regexPhone);
            if (!operationInDto.phone.match(regexPhone)) {
                asError = true;
                msg.phone.push('Le numero est incorrecte');
            }
            if (!this.sousServices.ussdCode ||
                !this.sousServices.regexMessageValidation ||
                !this.sousServices.positionValidationIndex ||
                !this.sousServices.validLength) {
                asError = true;
                msg.codeService.push("Le service n'est pas configurer complètement");
            }
        }
        const transaction = await Transactions_entity_1.Transactions.findOne({
            where: {
                externalTransactionId: typeorm_1.Equal(operationInDto.externalTransactionId),
                partenerComptesId: typeorm_1.Equal(((_p = this === null || this === void 0 ? void 0 : this.comptePartner) === null || _p === void 0 ? void 0 : _p.id) || 0),
            },
        });
        if (transaction) {
            asError = true;
            msg.apiKey.push('Duplication du external transaction ID');
        }
        const dateTransaction = new Date();
        dateTransaction.setMinutes(dateTransaction.getMinutes() - Enum_entity_1.CONSTANT.LIMIT_TIME_TRANSACTION);
        const transactionTime = await Transactions_entity_1.Transactions.findOne({
            where: {
                amount: typeorm_1.Equal(operationInDto.amount),
                phone: typeorm_1.Equal(operationInDto.phone),
                statut: typeorm_1.In([Enum_entity_1.StatusEnum.PENDING, Enum_entity_1.StatusEnum.PROCESSING]),
                createdAt: typeorm_1.MoreThanOrEqual(dateTransaction),
            },
        });
        console.log(`TRANSACTION IN LAST ${Enum_entity_1.CONSTANT.LIMIT_TIME_TRANSACTION} MINUTE`, transactionTime);
        if (transactionTime) {
            asError = true;
            msg.apiKey.push('Une transaction avec le meme numero et le meme montant est deja en cours');
        }
        this.operationInDto = operationInDto;
        if (!this.validUrl(operationInDto.callbackUrl.toLowerCase())) {
            asError = true;
            msg.callbackUrl.push("Le callback n'est pas valide");
        }
        else {
            if (process.env.MODE !== 'dev') {
                if (operationInDto.callbackUrl.toLowerCase().split(':')[0] !== 'https') {
                    asError = true;
                    msg.callbackUrl.push('Le callback url dois etre en HTTPS');
                }
            }
        }
        for (const key in msg) {
            if (!msg[key].length) {
                delete msg[key];
            }
        }
        return asError ? msg : false;
    }
    validUrl(str) {
        const pattern = new RegExp('^(https?:\\/\\/)?' +
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
            '((\\d{1,3}\\.){3}\\d{1,3}))' +
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
            '(\\?[;&a-z\\d%_.~+=-]*)?' +
            '(\\#[-a-z\\d_]*)?$', 'i');
        return !!pattern.test(str);
    }
    async initTransaction(phone) {
        const transaction = new Transactions_entity_1.Transactions();
        transaction.codeSousService = this.sousServices.code;
        transaction.phonesId = phone.id;
        transaction.telephoneNumberService = phone.number;
        transaction.partenerComptesId = this.comptePartner.id;
        transaction.partnerCompteName = this.comptePartner.name;
        transaction.partenersId = this.partner.id;
        transaction.sousServicesId = this.sousServices.id;
        transaction.data = JSON.stringify(this.operationInDto.data);
        transaction.statut = Enum_entity_1.StatusEnum.PENDING;
        transaction.partenerName = this.partner.name;
        transaction.createdAt = new Date();
        transaction.dateCreation = new Date();
        transaction.phone = this.operationInDto.phone;
        transaction.amount = this.operationInDto.amount;
        transaction.urlIpn = this.operationInDto.callbackUrl;
        transaction.serviceName = this.service.name;
        transaction.sousServiceName = this.sousServices.name;
        transaction.commissionAmount = this.commissionAmount;
        transaction.feeAmount = this.feeAmount;
        transaction.operateurName = this.operator.name;
        transaction.solde =
            this.partner.solde -
                this.operationInDto.amount -
                this.feeAmount +
                this.commissionAmount;
        transaction.typeOperation = this.sousServices.typeOperation;
        transaction.transactionId = this.generateTransactionId();
        transaction.externalTransactionId = this.operationInDto.externalTransactionId;
        transaction.commentaire = `Opération de  ${this.sousServices.typeOperation} par  ${this.sousServices.name} ${this.operator.name}`;
        const saveTransactions = await Transactions_entity_1.Transactions.insert(transaction, {
            transaction: true,
        });
        this.transactionId = transaction.id = saveTransactions.raw.insertId;
        await this.operationPartnerDoTransaction(transaction);
        return transaction;
    }
    generateTransactionId() {
        return Math.random().toString().substr(5, 25);
    }
    allDataIsOk() {
        const msg = {};
        let error = false;
        if (!this.comptePartner) {
            msg.comptePartner = ['Erreur avec le compte parteneur'];
            error = true;
        }
        if (!this.partner) {
            msg.partner = ['Erreur avec le  parteneur'];
            error = true;
        }
        if (!this.sousServices) {
            msg.sousServices = ['Erreur avec le  sous Service'];
            error = true;
        }
        if (!this.sousServicesPartner) {
            msg.sousServicesPartner = [
                'Erreur avec la  souscription du Sous Service Parteneur',
            ];
            error = true;
        }
        if (!this.comission) {
            msg.comission = ['Erreur avec les commission et frais'];
            error = true;
        }
        if (!this.service) {
            msg.service = ['Service introuvable'];
            error = true;
        }
        if (!this.operator) {
            msg.operator = ['Operateur introuvable'];
            error = true;
        }
        if (error) {
            return msg;
        }
        return false;
    }
    async loadBalancingPhone() {
        return new Promise(async (resolve) => {
            let query = `SELECT phones.* FROM phones , sous_services_phones
                    where phones.id  = sous_services_phones.phones_id
                    AND sous_services_phones.sous_services_id = '${this.sousServices.id}' 
                    AND phones.state = '${Enum_entity_1.StateEnum.ACTIVED}' 
                    AND phones.socket = '${Enum_entity_1.SocketState.CONNECTED}'
                    AND phones.phone_state = '${Enum_entity_1.PhoneState.UNUSED}'
                    AND phones.services_id = ${this.service.id}`;
            if (this.sousServices.typeOperation === Enum_entity_1.TypeOperationEnum.DEBIT) {
                query += ` AND phones.solde >= ${this.operationInDto.amount} `;
            }
            query += `ORDER BY RAND() LIMIT 1;`;
            let res = await this.connection.query(query);
            this.phone = res = (res === null || res === void 0 ? void 0 : res.length) ? res[0] : null;
            if (this.phone) {
                Enum_entity_1.PHONES_HOLDERS.AVALABLITY[this.phone.id] = Enum_entity_1.PHONES_HOLDERS.AVALABLITY[this.phone.id] || {
                    used: false,
                };
            }
            if (res && !Enum_entity_1.PHONES_HOLDERS.AVALABLITY[this.phone.id]['used']) {
                Enum_entity_1.PHONES_HOLDERS.AVALABLITY[this.phone.id]['used'] = true;
                this.disablePhone(res.id).then((value) => value);
                resolve(res);
            }
            else {
                for (let i = 0; i < Enum_entity_1.CONSTANT.TIME_OUT_PHONE_SECOND; i++) {
                    console.log('WAITING PHONE', i, Enum_entity_1.PHONES_HOLDERS.AVALABLITY);
                    await this.waitSome(2);
                    res = await this.connection.query(query);
                    this.phone = res = (res === null || res === void 0 ? void 0 : res.length) ? res[0] : null;
                    if (this.phone) {
                        Enum_entity_1.PHONES_HOLDERS.AVALABLITY[this.phone.id] = Enum_entity_1.PHONES_HOLDERS
                            .AVALABLITY[this.phone.id] || {
                            used: false,
                        };
                    }
                    if (res && !Enum_entity_1.PHONES_HOLDERS.AVALABLITY[this.phone.id]['used']) {
                        Enum_entity_1.PHONES_HOLDERS.AVALABLITY[this.phone.id]['used'] = true;
                        this.disablePhone(res.id).then((value) => value);
                        resolve(res);
                        break;
                    }
                }
                resolve(null);
            }
        });
    }
    async waitSome(seconde) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, seconde * 1000);
        });
    }
    async activePhone(phoneId) {
        await this.waitSome(3);
        Enum_entity_1.PHONES_HOLDERS.AVALABLITY[phoneId]['used'] = false;
        const query = `UPDATE phones set phone_state= '${Enum_entity_1.PhoneState.UNUSED}' , last_unused= '${this.mysqlDate(new Date())}'  where id = ${phoneId}`;
        this.connection.query(query).then((value) => console.log(value));
    }
    async disablePhone(phoneId) {
        const query = `UPDATE phones set phone_state= '${Enum_entity_1.PhoneState.USED}', last_used= '${this.mysqlDate(new Date())}' where id = ${phoneId}`;
        this.connection.query(query).then((value) => console.log(value));
    }
    mysqlDate(d) {
        return d.toISOString().substr(0, 19).replace('T', ' ');
    }
    async finishExecUssd(socketBodyFinish) {
        try {
            socketBodyFinish = JSON.parse(socketBodyFinish + '');
        }
        catch (e) {
            console.log(`Message erreur from Sim USSD`, socketBodyFinish.toString());
            return true;
        }
        UssdExecutionMessages_entity_1.UssdExecutionMessages.insert({
            transationsId: this.transactionId,
            phonesId: this.phone.id,
            createdAt: new Date(),
            updatedAt: new Date(),
            message: JSON.stringify(socketBodyFinish),
            state: Enum_entity_1.StateEnum.ACTIVED,
        }).then((value) => value);
        console.log('ussdMesage-', socketBodyFinish);
        const regex = new RegExp(this.sousServices.messageRetourUssd);
        if (regex.test(socketBodyFinish.data)) {
            console.log('USS RETOUR MATCHED');
            await this.connection.query(`update transactions set statut = '${Enum_entity_1.StatusEnum.PROCESSING}', date_processing= '${this.mysqlDate(new Date())}' where id= ${this.transactionId} AND statut <> '${Enum_entity_1.StatusEnum.SUCCESS}'`);
            return true;
        }
        else {
            if (socketBodyFinish.state === 'FAILED') {
                await Transactions_entity_1.Transactions.update(this.transactionId, {
                    statut: Enum_entity_1.StatusEnum.FAILLED,
                    dateFailled: new Date(),
                    errorMessage: 'Une Erreur Est survenue !!!',
                });
                await this.operationPartnerCancelTransaction(await Transactions_entity_1.Transactions.findOne({
                    where: {
                        id: this.transactionId,
                    },
                }));
                return false;
            }
            return true;
        }
    }
    async callCall(phone, transaction) {
        let ussdCode = this.getUssDCode(this.sousServices.ussdCode, phone);
        ussdCode += `-${transaction.id}`;
        const socket = sockets_gateway_1.SocketsGateway.getSocket(phone.number);
        if (socket) {
            return new Promise(async (resolve) => {
                console.log('SOCKET', socket);
                socket.on('finishExecUssd', async (data) => {
                    console.log('DATA_SOCKET', data);
                    socket.removeAllListeners('finishExecUssd');
                    resolve(await this.finishExecUssd(data));
                    this.activePhone(this.phone.id).then((value) => value);
                });
                socket.emit('execUssd', ussdCode);
                setTimeout(() => {
                    console.log('WAIT RETOUR USSD');
                    resolve(true);
                    this.activePhone(this.phone.id).then((value) => value);
                }, Enum_entity_1.CONSTANT.WAIT_SOCKET_PHONE * 1000);
                console.log('SOCKET CALL', ussdCode);
            });
        }
        console.log('SOCKET INJOIGNABLE');
        this.activePhone(this.phone.id).then((value) => value);
        await Transactions_entity_1.Transactions.update(transaction.id, {
            statut: Enum_entity_1.StatusEnum.FAILLED,
            errorMessage: 'Telephone injoignable',
            dateFailled: new Date(),
        });
        await this.operationPartnerCancelTransaction(transaction);
        return false;
    }
    getUssDCode(regexCodeUss, phone) {
        return regexCodeUss
            .replace('amount', String(this.operationInDto.amount))
            .replace('number', this.operationInDto.phone)
            .replace('code', phone.codeSecret);
    }
    responseOperation(transaction) {
        return {
            phone: transaction.phone,
            amount: transaction.amount,
            codeService: transaction.codeSousService,
            transactionId: transaction.transactionId,
            status: transaction.statut,
            externalTransactionId: transaction.externalTransactionId,
            callbackUrl: transaction.urlIpn,
        };
    }
    async operationPartnerDoTransaction(transaction) {
        await this.setSoldeTable(-this.operationInDto.amount +
            -transaction.feeAmount +
            transaction.commissionAmount, 'parteners', this.partner.id);
        const operationParteners = new DtoOperationParteners_1.DtoOperationParteners();
        operationParteners.commentaire = transaction === null || transaction === void 0 ? void 0 : transaction.commentaire;
        operationParteners.amount = transaction.amount;
        operationParteners.typeOperation = transaction.typeOperation;
        operationParteners.statut = Enum_entity_1.StatusEnum.SUCCESS;
        operationParteners.partenersId = this.partner.id;
        operationParteners.partenersId = this.partner.id;
        operationParteners.transactionsId = transaction.id;
        operationParteners.soldeBefor = this.partner.solde;
        operationParteners.soldeAfter =
            this.partner.solde -
                transaction.amount -
                transaction.feeAmount +
                transaction.commissionAmount;
        operationParteners.fee = transaction.feeAmount;
        operationParteners.commission = transaction.commissionAmount;
        operationParteners.createdAt = new Date();
        operationParteners.operation = Enum_entity_1.OperationEnum.TRANSACTION;
        await OperationParteners_entity_1.OperationParteners.insert(operationParteners, {
            transaction: true,
        });
    }
    async operationPartnerCancelTransaction(transaction) {
        await this.setSoldeTable(this.operationInDto.amount +
            transaction.feeAmount +
            -transaction.commissionAmount, 'parteners', this.partner.id);
        const operationParteners = new DtoOperationParteners_1.DtoOperationParteners();
        operationParteners.commentaire = `Annulation  ${this.sousServices.name} pour l'opérateur ${this.operator.name}`;
        operationParteners.amount = transaction.amount;
        operationParteners.typeOperation = Enum_entity_1.TypeOperationEnum.CREDIT;
        operationParteners.statut = Enum_entity_1.StatusEnum.SUCCESS;
        operationParteners.partenersId = this.partner.id;
        operationParteners.partenersId = this.partner.id;
        operationParteners.transactionsId = transaction.id;
        operationParteners.soldeBefor =
            this.partner.solde -
                transaction.amount -
                transaction.feeAmount +
                transaction.commissionAmount;
        operationParteners.soldeAfter = this.partner.solde;
        operationParteners.fee = transaction.feeAmount;
        operationParteners.commission = transaction.commissionAmount;
        operationParteners.createdAt = new Date();
        operationParteners.operation = Enum_entity_1.OperationEnum.ANNULATION_TRANSACTION;
        await OperationParteners_entity_1.OperationParteners.insert(operationParteners, {
            transaction: true,
        });
    }
    async getPartner(headers) {
        return await PartenerComptes_entity_1.PartenerComptes.findOne({
            where: {
                appKey: typeorm_1.Equal(headers === null || headers === void 0 ? void 0 : headers.secretkey),
            },
            relations: ['parteners'],
        });
    }
};
ApiServiceService = __decorate([
    common_1.Injectable({
        scope: common_1.Scope.REQUEST,
    }),
    __param(0, typeorm_2.InjectConnection()),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        helper_service_1.HelperService])
], ApiServiceService);
exports.ApiServiceService = ApiServiceService;
//# sourceMappingURL=api-service.service.js.map