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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        const msg = {
            apiKey: [],
            codeService: [],
            errorRedirectUrl: [],
            successRedirectUrl: [],
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
            if (+((_j = this === null || this === void 0 ? void 0 : this.partner) === null || _j === void 0 ? void 0 : _j.soldeCommission) < +(operationInDto === null || operationInDto === void 0 ? void 0 : operationInDto.amount)) {
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
        if ((this === null || this === void 0 ? void 0 : this.partner) && (this === null || this === void 0 ? void 0 : this.sousServices)) {
            this.comission = await Commission_entity_1.Commission.findOne({
                where: [
                    {
                        sousServicesId: (_k = this === null || this === void 0 ? void 0 : this.sousServices) === null || _k === void 0 ? void 0 : _k.id,
                        partenersId: ((_l = this === null || this === void 0 ? void 0 : this.partner) === null || _l === void 0 ? void 0 : _l.id) || ((_m = this === null || this === void 0 ? void 0 : this.sousServices) === null || _m === void 0 ? void 0 : _m.id),
                        amountStart: typeorm_1.LessThanOrEqual(+(operationInDto === null || operationInDto === void 0 ? void 0 : operationInDto.amount)),
                        amountEnd: typeorm_1.MoreThanOrEqual(+(operationInDto === null || operationInDto === void 0 ? void 0 : operationInDto.amount)),
                    },
                    {
                        sousServicesId: this.sousServices.id,
                        partenersId: ((_o = this === null || this === void 0 ? void 0 : this.partner) === null || _o === void 0 ? void 0 : _o.id) || ((_p = this === null || this === void 0 ? void 0 : this.sousServices) === null || _p === void 0 ? void 0 : _p.id),
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
            this.initFeePartner(this.sousServices, +operationInDto.amount);
            const regexPhone = new RegExp(this.sousServices.regexPhone);
            if (!operationInDto.phone.match(regexPhone)) {
                asError = true;
                msg.phone.push('Le numero est incorrecte');
            }
            if (this.sousServices.needPhone &&
                (!this.sousServices.ussdCode ||
                    !this.sousServices.regexMessageValidation ||
                    !this.sousServices.positionValidationIndex ||
                    !this.sousServices.validLength)) {
                asError = true;
                msg.codeService.push("Le service n'est pas configurer complètement");
            }
            if (this.sousServices.code === Enum_entity_1.SOUS_SERVICE_ENUM.WAVE_SN_API_CASH_OUT) {
                if (!operationInDto.successRedirectUrl) {
                    asError = true;
                    msg.successRedirectUrl.push('Le  champs successRedirectUrl est obligatoire pour ce service');
                }
                if (!operationInDto.errorRedirectUrl) {
                    asError = true;
                    msg.errorRedirectUrl.push('Le  champs errorRedirectUrl est obligatoire pour ce service');
                }
            }
        }
        const transaction = await Transactions_entity_1.Transactions.findOne({
            where: {
                externalTransactionId: typeorm_1.Equal(operationInDto.externalTransactionId),
                partenerComptesId: typeorm_1.Equal(((_q = this === null || this === void 0 ? void 0 : this.comptePartner) === null || _q === void 0 ? void 0 : _q.id) || 0),
            },
        });
        if (transaction) {
            asError = true;
            msg.apiKey.push('Duplication du external transaction ID');
        }
        const dateTransaction = new Date();
        dateTransaction.setMinutes(dateTransaction.getMinutes() - Enum_entity_1.CONSTANT.LIMIT_TIME_TRANSACTION());
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
    responseOperation(response, operationInDto) {
        var _a, _b;
        return {
            phone: operationInDto.phone,
            amount: operationInDto.amount,
            codeService: operationInDto.codeService,
            transactionId: (response === null || response === void 0 ? void 0 : response.transactionId) || null,
            status: response.status,
            externalTransactionId: operationInDto.externalTransactionId,
            callbackUrl: operationInDto.callbackUrl,
            deep_link_url: (_a = response === null || response === void 0 ? void 0 : response['data']) === null || _a === void 0 ? void 0 : _a.url,
            notification_message: (_b = response === null || response === void 0 ? void 0 : response['data']) === null || _b === void 0 ? void 0 : _b.message,
        };
    }
    async getPartner(headers) {
        return await PartenerComptes_entity_1.PartenerComptes.findOne({
            where: {
                appKey: typeorm_1.Equal(headers === null || headers === void 0 ? void 0 : headers.secretkey),
            },
            relations: ['parteners'],
        });
    }
    initFeePartner(sousServices, amount) {
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