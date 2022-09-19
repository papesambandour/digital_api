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
const typeorm_2 = require("@nestjs/typeorm");
const helper_service_1 = require("../../helper.service");
let ApiServiceService = class ApiServiceService {
    constructor(connection, helper, httpService) {
        this.connection = connection;
        this.helper = helper;
        this.httpService = httpService;
        this.comptePartner = null;
        this.partner = null;
        this.headers = null;
        this.sousServices = null;
        this.sousServicesPartner = null;
        this.comission = null;
        this.feeAmount = 0;
        this.commissionAmount = 0;
        this.feeAmountPsp = 0;
        this.commissionAmountPsp = 0;
        this.isSoldeComm = false;
    }
    async setSoldeTable(value, tableName, id, field = 'solde') {
        console.log('RELEVE-api', ` ${tableName} set ${field} =  ${field} + ${value} where id=${id}`);
        if (this.sousServices.typeOperation == Enum_entity_1.TypeOperationEnum.DEBIT) {
            return this.connection.query(`update ${tableName}
                 set ${field} = ${field} + ${value}
                 where id = ${id}`);
        }
    }
    initFeeCommissionPartner(commission, amount) {
        let amountFee = 0;
        let amountCommssion = 0;
        if (!this.isSoldeComm) {
            amountCommssion =
                (+(commission === null || commission === void 0 ? void 0 : commission.tauxCommission) * amount) / 100 +
                    +(commission === null || commission === void 0 ? void 0 : commission.amountCommssion);
        }
        amountFee = (+(commission === null || commission === void 0 ? void 0 : commission.tauxFee) * amount) / 100 + +(commission === null || commission === void 0 ? void 0 : commission.amountFee);
        this.feeAmount = amountFee;
        this.commissionAmount = amountCommssion;
    }
    async validatorCustomApi(operationInDto) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        const msg = {
            apiKey: [],
            codeService: [],
            errorRedirectUrl: [],
            successRedirectUrl: [],
            customerFirstName: [],
            customerLastName: [],
            merchantName: [],
            customerEmail: [],
            cardNumber: [],
            cardExpireMonth: [],
            cardExpireYear: [],
            cardCVC: [],
            cardType: [],
            amount: [],
            callbackUrl: [],
            phone: [],
        };
        let asError = false;
        this.comptePartner = await PartenerComptes_entity_1.PartenerComptes.findOne({
            where: { appKey: typeorm_1.Equal(operationInDto === null || operationInDto === void 0 ? void 0 : operationInDto.apiKey), state: 'ACTIVED' },
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
        if ((this === null || this === void 0 ? void 0 : this.partner) && ((_c = this === null || this === void 0 ? void 0 : this.partner) === null || _c === void 0 ? void 0 : _c.state) !== Enum_entity_1.StateEnum.ACTIVED) {
            asError = true;
            msg.apiKey.push('Le  parteneur est desactivé');
        }
        if (!(this === null || this === void 0 ? void 0 : this.sousServices)) {
            asError = true;
            msg.codeService.push('Le services est introuvable');
        }
        if (this === null || this === void 0 ? void 0 : this.sousServices) {
            if (((_d = this === null || this === void 0 ? void 0 : this.sousServices) === null || _d === void 0 ? void 0 : _d.state) !== Enum_entity_1.StateEnum.ACTIVED) {
                asError = true;
                msg.codeService.push('Le  services est temporairement desactivé');
            }
            if (+(operationInDto === null || operationInDto === void 0 ? void 0 : operationInDto.amount) > ((_e = this.sousServices) === null || _e === void 0 ? void 0 : _e.maxLimitTransaction) &&
                ((_f = this.sousServices) === null || _f === void 0 ? void 0 : _f.maxLimitTransaction) != -1) {
                asError = true;
                msg.amount.push('limit maximum par transaction est depassé . Max limit : ' +
                    ((_g = this.sousServices) === null || _g === void 0 ? void 0 : _g.maxLimitTransaction));
            }
            console.log(+(operationInDto === null || operationInDto === void 0 ? void 0 : operationInDto.amount), (_h = this.sousServices) === null || _h === void 0 ? void 0 : _h.minLimitTransaction);
            if (+(operationInDto === null || operationInDto === void 0 ? void 0 : operationInDto.amount) < ((_j = this.sousServices) === null || _j === void 0 ? void 0 : _j.minLimitTransaction) &&
                ((_k = this.sousServices) === null || _k === void 0 ? void 0 : _k.minLimitTransaction) != -1) {
                asError = true;
                msg.amount.push("limit minimum par transaction n'est pas atteinds . Min limit : " +
                    ((_l = this.sousServices) === null || _l === void 0 ? void 0 : _l.minLimitTransaction));
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
                ((_m = this === null || this === void 0 ? void 0 : this.sousServicesPartner) === null || _m === void 0 ? void 0 : _m.state) !== Enum_entity_1.StateEnum.ACTIVED) {
                asError = true;
                msg.codeService.push('Le services est temporairement desactivé pour le partenaire');
            }
        }
        if (this.sousServices &&
            this.sousServices.typeOperation === Enum_entity_1.TypeOperationEnum.DEBIT) {
            if (+((_o = this === null || this === void 0 ? void 0 : this.partner) === null || _o === void 0 ? void 0 : _o.solde) < +(operationInDto === null || operationInDto === void 0 ? void 0 : operationInDto.amount)) {
                if (+((_p = this === null || this === void 0 ? void 0 : this.partner) === null || _p === void 0 ? void 0 : _p.soldeCommission) < +(operationInDto === null || operationInDto === void 0 ? void 0 : operationInDto.amount)) {
                    asError = true;
                    msg.apiKey.push('Le solde global du partenaire est infusisant pour effectuer cette operation');
                }
                else {
                    this.isSoldeComm = true;
                }
            }
            else {
                this.isSoldeComm = false;
            }
        }
        if ((this === null || this === void 0 ? void 0 : this.partner) && (this === null || this === void 0 ? void 0 : this.sousServices)) {
            this.comission = await Commission_entity_1.Commission.findOne({
                where: [
                    {
                        sousServicesId: (_q = this === null || this === void 0 ? void 0 : this.sousServices) === null || _q === void 0 ? void 0 : _q.id,
                        partenersId: ((_r = this === null || this === void 0 ? void 0 : this.partner) === null || _r === void 0 ? void 0 : _r.id) || ((_s = this === null || this === void 0 ? void 0 : this.sousServices) === null || _s === void 0 ? void 0 : _s.id),
                        amountStart: typeorm_1.LessThanOrEqual(+(operationInDto === null || operationInDto === void 0 ? void 0 : operationInDto.amount)),
                        amountEnd: typeorm_1.MoreThanOrEqual(+(operationInDto === null || operationInDto === void 0 ? void 0 : operationInDto.amount)),
                    },
                    {
                        sousServicesId: this.sousServices.id,
                        partenersId: ((_t = this === null || this === void 0 ? void 0 : this.partner) === null || _t === void 0 ? void 0 : _t.id) || ((_u = this === null || this === void 0 ? void 0 : this.sousServices) === null || _u === void 0 ? void 0 : _u.id),
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
            this.initFeeCommissionPartner(this.comission, +operationInDto.amount);
        }
        if (this === null || this === void 0 ? void 0 : this.sousServices) {
            this.service = await Services_entity_1.Services.findOne(this.sousServices.servicesId);
            this.operator = await Operators_entity_1.Operators.findOne(this.service.operatorsId);
            this.initFeePsp(this.sousServices, +operationInDto.amount);
            const regexPhone = new RegExp(this.sousServices.regexPhone);
            if (!operationInDto.phone.match(regexPhone)) {
                asError = true;
                msg.phone.push(`Le numéro est incorrecte. Regex: ${this.sousServices.regexPhone}`);
            }
            if (this.sousServices.needPhone &&
                (!this.sousServices.ussdCode ||
                    !this.sousServices.regexMessageValidation ||
                    !this.sousServices.positionValidationIndex ||
                    !this.sousServices.validLength)) {
                asError = true;
                msg.codeService.push("Le service n'est pas configurer complètement");
            }
        }
        const transaction = await Transactions_entity_1.Transactions.findOne({
            where: {
                externalTransactionId: typeorm_1.Equal(operationInDto.externalTransactionId),
                partenerComptesId: typeorm_1.Equal(((_v = this === null || this === void 0 ? void 0 : this.comptePartner) === null || _v === void 0 ? void 0 : _v.id) || 0),
            },
            relations: ['sousServices'],
        });
        if (transaction) {
            asError = true;
            msg.apiKey.push('Duplication du external transaction ID');
        }
        if (this.sousServices && ((_w = this.sousServices) === null || _w === void 0 ? void 0 : _w.limitTimeTransaction) !== -1) {
            const dateTransaction = new Date();
            dateTransaction.setMinutes(dateTransaction.getMinutes() - this.sousServices.limitTimeTransaction);
            const transactionTime = await Transactions_entity_1.Transactions.findOne({
                where: {
                    amount: typeorm_1.Equal(operationInDto.amount),
                    phone: typeorm_1.Equal(operationInDto.phone),
                    codeSousService: typeorm_1.Equal(operationInDto.codeService),
                    statut: typeorm_1.In([Enum_entity_1.StatusEnum.PENDING, Enum_entity_1.StatusEnum.PROCESSING]),
                    createdAt: typeorm_1.MoreThanOrEqual(dateTransaction),
                },
                relations: ['sousServices'],
            });
            if (transactionTime) {
                asError = true;
                msg.apiKey.push(`Une transaction avec le meme numéro et le meme montant est deja en cours, ressayer dans ${this.sousServices.limitTimeTransaction} minutes`);
            }
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
    responseOperation(response, operationInDto, errorType) {
        return Object.assign({
            phone: operationInDto.phone,
            amount: operationInDto.amount,
            codeService: operationInDto.codeService,
            transactionId: (response === null || response === void 0 ? void 0 : response.transactionId) || null,
            status: response.status,
            externalTransactionId: operationInDto.externalTransactionId,
            callbackUrl: operationInDto.callbackUrl,
            errorType: errorType,
        }, (response === null || response === void 0 ? void 0 : response['data']) || {});
    }
    async getPartner(headers) {
        return await PartenerComptes_entity_1.PartenerComptes.findOne({
            where: {
                appKey: typeorm_1.Equal(headers === null || headers === void 0 ? void 0 : headers.secretkey),
                state: 'ACTIVED',
            },
            relations: ['parteners'],
        });
    }
    initFeePsp(sousServices, amount) {
        this.feeAmountPsp =
            ((sousServices === null || sousServices === void 0 ? void 0 : sousServices.tauxFee) * amount) / 100 + +(sousServices === null || sousServices === void 0 ? void 0 : sousServices.amountFee);
        this.commissionAmountPsp =
            (+(sousServices === null || sousServices === void 0 ? void 0 : sousServices.tauxCommission) * amount) / 100 +
                +(sousServices === null || sousServices === void 0 ? void 0 : sousServices.amountCommission);
    }
};
ApiServiceService = __decorate([
    common_1.Injectable({
        scope: common_1.Scope.REQUEST,
    }),
    __param(0, typeorm_2.InjectConnection()),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        helper_service_1.HelperService,
        common_1.HttpService])
], ApiServiceService);
exports.ApiServiceService = ApiServiceService;
//# sourceMappingURL=api-service.service.js.map