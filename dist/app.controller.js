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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const Controller_1 = require("./Controllers/Controller");
const helper_service_1 = require("./helper.service");
const Enum_entity_1 = require("./Models/Entities/Enum.entity");
const typeorm_1 = require("typeorm");
const Confirm3dsInDto_1 = require("./Controllers/api-service/dto/Confirm3dsInDto");
const Parteners_entity_1 = require("./Models/Entities/Parteners.entity");
const Transactions_entity_1 = require("./Models/Entities/Transactions.entity");
const Utils = require("util");
const request_mapping_decorator_1 = require("@nestjs/common/decorators/http/request-mapping.decorator");
let AppController = class AppController extends Controller_1.ControllerBase {
    constructor(appService, helper) {
        super();
        this.appService = appService;
        this.helper = helper;
    }
    async getHello(request) {
        try {
            console.log('REQUEST CALLBACK', request.body);
            return { api: 'SimbotService', body: request.body };
        }
        catch (e) {
            return e.message;
        }
    }
    async apkVersion() {
        try {
            return {
                latest: process.env.APK_VERSION,
                url: process.env.APK_URL,
            };
        }
        catch (e) {
            return e.message;
        }
    }
    async deepLink(transactionId, res) {
        console.log('in deep link method');
        const transaction = await this.helper.getTransactionByGeneratedId(transactionId);
        if (!transaction || !transaction.deepLinkUrl) {
            console.log('herree', process.env.APP_INTERNAL_URL);
            return res.redirect(this.helper.appendQueryParams(process.env.APP_INTERNAL_URL, {
                message: 'Deep link non trouvé',
            }));
        }
        if (transaction.reachedTimeout) {
            return res.redirect(this.helper.appendQueryParams(process.env.APP_INTERNAL_URL, {
                message: 'Lien de paiement expiré',
            }));
        }
        if (transaction.statut !== Enum_entity_1.StatusEnum.PROCESSING &&
            transaction.statut !== Enum_entity_1.StatusEnum.PENDING) {
            if (transaction.statut === Enum_entity_1.StatusEnum.SUCCESS &&
                transaction.successRedirectUrl) {
                console.log('here 2');
                return res.redirect(transaction.successRedirectUrl ||
                    this.helper.appendQueryParams(process.env.APP_INTERNAL_URL, {}));
            }
            else if (transaction.statut === Enum_entity_1.StatusEnum.FAILLED &&
                transaction.errorRedirectUrl) {
                console.log('here 2');
                return res.redirect(transaction.errorRedirectUrl ||
                    this.helper.appendQueryParams(process.env.APP_INTERNAL_URL, {}));
            }
            else {
                return res.redirect(this.helper.appendQueryParams(process.env.APP_INTERNAL_URL, {
                    message: '',
                }));
            }
        }
        console.log('here', transaction.deepLinkUrl);
        const link = transaction.deepLinkUrl;
        return res.render('deep', {
            link,
            currentUrl: `https://api.intech.sn/deep/${transaction.transactionId}`,
            mName: transaction.sousServices.executeSmsSender || '',
            logo: transaction.sousServices.icon,
            title: `Effectuer votre paiement de ${transaction.amount} CFA`,
        });
    }
    async home(res, message) {
        return res.render('home', {
            message: message || 'Des solutions adaptées à notre ère !',
        });
    }
    async confirm3dsAuth(confirm3dsAuthInDto, transactionId, res) {
        var _a, _b, _c, _d, _e, _f, _g;
        const transaction = await Transactions_entity_1.Transactions.findOne({
            where: {
                transactionId: typeorm_1.Equal(transactionId),
                codeSousService: Enum_entity_1.SOUS_SERVICE_ENUM.BANK_CARD_API_CASH_OUT,
            },
            relations: ['sousServices', 'partenerComptes'],
        });
        if (!transaction) {
            return res.send('Aucune transaction en attente de validation  trouvé');
        }
        if (transaction.statut !== Enum_entity_1.StatusEnum.PROCESSING &&
            transaction.statut !== Enum_entity_1.StatusEnum.PENDING) {
            if (transaction.statut === Enum_entity_1.StatusEnum.SUCCESS) {
                console.log('here 2');
                return res.redirect(this.helper.appendQueryParams(transaction.successRedirectUrl, {
                    message: 'Déja traité',
                    approvalCode: transaction.approvalCode || '',
                    cardMask: transaction.cardMask || '',
                    orderId: transaction.sousServiceTransactionId,
                }));
            }
            else {
                console.log('here 2');
                return res.redirect(this.helper.appendQueryParams(transaction.errorRedirectUrl, {
                    message: 'Déja traité',
                    approvalCode: transaction.approvalCode || '',
                    cardMask: transaction.cardMask || '',
                    orderId: transaction.sousServiceTransactionId,
                }));
            }
        }
        const comptePartner = transaction.partenerComptes;
        let partner;
        if (comptePartner) {
            partner = await Parteners_entity_1.Parteners.findOne(comptePartner === null || comptePartner === void 0 ? void 0 : comptePartner.partenersId);
        }
        if (!partner) {
            return res.send('Compte partnaire non trouvé');
        }
        const apiManagerService = await this.helper.getApiManagerInterface(transaction.codeSousService, null);
        if (!apiManagerService) {
            return this.response(this.CODE_HTTP.SERVICE_DOWN, {}, 'Api Service Manager non configuré', true);
        }
        const checkResult = await apiManagerService.confirmTransaction({
            transaction: transaction,
            meta: {
                paRes: confirm3dsAuthInDto.PaRes,
                orderId: transaction.sousServiceTransactionId,
            },
        });
        const meta = checkResult === null || checkResult === void 0 ? void 0 : checkResult.meta;
        if ((checkResult === null || checkResult === void 0 ? void 0 : checkResult.status) === 'SUCCESS') {
            transaction.statut = Enum_entity_1.StatusEnum.SUCCESS;
            transaction.preStatut = Enum_entity_1.StatusEnum.SUCCESS;
        }
        else {
            transaction.statut = Enum_entity_1.StatusEnum.FAILLED;
            transaction.preStatut = Enum_entity_1.StatusEnum.FAILLED;
            transaction.errorMessage = (_a = meta === null || meta === void 0 ? void 0 : meta.checkResponse) === null || _a === void 0 ? void 0 : _a.message_fr;
        }
        transaction.approvalCode =
            (_c = (_b = meta === null || meta === void 0 ? void 0 : meta.checkResponse) === null || _b === void 0 ? void 0 : _b.processorInformation) === null || _c === void 0 ? void 0 : _c.approvalCode;
        transaction.cardMask = (_e = (_d = meta === null || meta === void 0 ? void 0 : meta.checkResponse) === null || _d === void 0 ? void 0 : _d.payment) === null || _e === void 0 ? void 0 : _e.cardMask;
        transaction.shipCardType = (_g = (_f = meta === null || meta === void 0 ? void 0 : meta.checkResponse) === null || _f === void 0 ? void 0 : _f.payment) === null || _g === void 0 ? void 0 : _g.shipCardType;
        transaction.checkTransactionResponse = Utils.inspect(meta);
        await transaction.save();
        await apiManagerService.helper.handleSuccessTransactionCreditDebit(transaction);
        await apiManagerService.helper.setIsCallbackReadyValue(transaction);
        console.log(checkResult.meta, 'meta__check');
        if ((checkResult === null || checkResult === void 0 ? void 0 : checkResult.status) === 'SUCCESS') {
            return res.redirect(this.helper.appendQueryParams(transaction.successRedirectUrl, {
                message: checkResult === null || checkResult === void 0 ? void 0 : checkResult.partnerMessage,
                approvalCode: transaction.approvalCode,
                cardMask: transaction.cardMask,
                orderId: transaction.sousServiceTransactionId,
            }));
        }
        else {
            await apiManagerService.helper.operationPartnerCancelTransaction(transaction);
            return res.redirect(this.helper.appendQueryParams(transaction.errorRedirectUrl, {
                message: checkResult === null || checkResult === void 0 ? void 0 : checkResult.partnerMessage,
                approvalCode: transaction.approvalCode,
                cardMask: transaction.cardMask,
                orderId: transaction.sousServiceTransactionId,
            }));
        }
    }
};
__decorate([
    common_1.Post('/callback'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getHello", null);
__decorate([
    common_1.Get('/checkVersion'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "apkVersion", null);
__decorate([
    request_mapping_decorator_1.All('deep/:transactionId'),
    __param(0, common_1.Param('transactionId')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deepLink", null);
__decorate([
    common_1.Get('/'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "home", null);
__decorate([
    request_mapping_decorator_1.All('auth_3ds_callback/:transactionId'),
    __param(0, common_1.Body()),
    __param(1, common_1.Param('transactionId')),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Confirm3dsInDto_1.Confirm3dsInDto, String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "confirm3dsAuth", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        helper_service_1.HelperService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map