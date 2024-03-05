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
exports.ApiServiceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ResponseDecorateur_1 = require("../../Models/Decorateurs/ResponseDecorateur");
const OperationOutDto_1 = require("./dto/OperationOutDto");
const OperationInDto_1 = require("./dto/OperationInDto");
const OperationBadParamsDto_1 = require("./dto/OperationBadParamsDto");
const ResponseHttpPaginationDecorateur_1 = require("../../Models/Decorateurs/ResponseHttpPaginationDecorateur");
const DtoTransactions_1 = require("../../Models/Dto/DtoTransactions");
const ResponseDetailsDecorateur_1 = require("../../Models/Decorateurs/ResponseDetailsDecorateur");
const ResponseForbidenDecorateur_1 = require("../../Models/Decorateurs/ResponseForbidenDecorateur");
const ResponseForbidden_1 = require("../../Models/Response/ResponseForbidden");
const ResponseHttp_1 = require("../../Models/Response/ResponseHttp");
const PaginatedDto_1 = require("../../Models/Response/PaginatedDto");
const Controller_1 = require("../Controller");
const api_service_service_1 = require("./api-service.service");
const OperationDictionaryDto_1 = require("./dto/OperationDictionaryDto");
const ResponseHttpDefaultData_1 = require("../../Models/Response/ResponseHttpDefaultData");
const DtoBalance_1 = require("../../Models/Dto/DtoBalance");
const PartenerComptes_entity_1 = require("../../Models/Entities/PartenerComptes.entity");
const crypto_1 = require("crypto");
const api_manager_interface_service_1 = require("./api-manager-interface/api-manager-interface.service");
const helper_service_1 = require("../../helper.service");
const Enum_entity_1 = require("../../Models/Entities/Enum.entity");
const typeorm_1 = require("typeorm");
const Parteners_entity_1 = require("../../Models/Entities/Parteners.entity");
const Transactions_entity_1 = require("../../Models/Entities/Transactions.entity");
const SousServices_entity_1 = require("../../Models/Entities/SousServices.entity");
const ListPendingBillInDto_1 = require("./dto/ListPendingBillInDto");
const ErrorTypes_entity_1 = require("../../Models/Entities/ErrorTypes.entity");
const request_mapping_decorator_1 = require("@nestjs/common/decorators/http/request-mapping.decorator");
const NewClaim_1 = require("./dto/NewClaim");
const Claim_entity_1 = require("../../Models/Entities/Claim.entity");
const DtoGetTransactionStatus_1 = require("../../Models/Dto/DtoGetTransactionStatus");
const ConfirmKPay_1 = require("./dto/ConfirmKPay");
const main_1 = require("../../main");
const FreeCallback_1 = require("./dto/FreeCallback");
const process = require("process");
const MtnBjCallback_1 = require("./dto/MtnBjCallback");
const MtnApiProvider_1 = require("../../sdk/Mtn/MtnApiProvider");
const refund_dto_out_1 = require("../partener-intern/dto/refund-dto-out");
const Hub2Callback_1 = require("./dto/Hub2Callback");
const Hub2Provider_1 = require("../../sdk/Hub2/Hub2Provider");
let ApiServiceController = class ApiServiceController extends Controller_1.ControllerBase {
    constructor(apiServiceService, helper) {
        super();
        this.apiServiceService = apiServiceService;
        this.helper = helper;
    }
    async operation(operationInDto, req) {
        var _a, _b, _c;
        if ([Enum_entity_1.SOUS_SERVICE_ENUM.WHATSAPP_MESSAGING].includes(operationInDto.codeService)) {
            operationInDto.amount = await this.helper.getAmountForMessenger(operationInDto);
        }
        operationInDto.currency = (operationInDto.currency || 'XOF').toUpperCase();
        operationInDto.amountInCurrency = operationInDto.amount;
        operationInDto.amount = this.helper.convertCurrency(operationInDto.currency, 'XOF', operationInDto.amount);
        const isNotValid = await this.validator(this.getInstanceObject(operationInDto, new OperationInDto_1.OperationInDto()));
        if (isNotValid) {
            return this.response(this.CODE_HTTP.OPERATION_BADREQUEST, isNotValid, '', true);
        }
        const isNotValidLevel2 = await this.apiServiceService.validatorCustomApi(operationInDto);
        if (isNotValidLevel2) {
            return this.response(this.CODE_HTTP.OPERATION_BADREQUEST, isNotValidLevel2, '', true);
        }
        const isNotConform = this.apiServiceService.allDataIsOk();
        if (isNotConform) {
            return this.response(this.CODE_HTTP.OPERATION_BADREQUEST, isNotConform, '', true);
        }
        this.apiServiceService.headers = req.headers;
        const allowedIp = ((_c = (_b = (_a = this.apiServiceService.partner.allowIp) === null || _a === void 0 ? void 0 : _a.replace(/\s/g, '')) === null || _b === void 0 ? void 0 : _b.split(/[,;\n]/)) === null || _c === void 0 ? void 0 : _c.filter((ip) => ip)) || [];
        if ((allowedIp === null || allowedIp === void 0 ? void 0 : allowedIp.length) &&
            !allowedIp.includes(this.apiServiceService.headers['x-forwarded-for'])) {
            return this.response(this.CODE_HTTP.IP_NOT_ALLOWED, {}, `Cette addresse IP (${this.apiServiceService.headers['x-forwarded-for']}) n'est pas autorisé á acceder l'API`, true);
        }
        console.log(this.apiServiceService.headers);
        const apiManager = await this.helper.getApiManagerInterface(operationInDto.codeService, this.apiServiceService);
        if (!apiManager) {
            return this.response(this.CODE_HTTP.SERVICE_DOWN, {}, 'Api Service Manager non configuré', true);
        }
        const response = await apiManager.initTransaction({
            dto: operationInDto,
        });
        await this.helper.setIsCallbackReadyValue(response.transaction);
        console.log('checking errorType', response.partnerMessage);
        const errorType = await this.helper.provideErrorType(response.transaction, null, null, response.partnerMessage);
        console.log(errorType);
        this.helper.updateApiBalance(apiManager, response.usedPhoneId).then();
        console.log('response', response.partnerMessage);
        if (response.status === Enum_entity_1.StatusEnum.FAILLED) {
            await this.helper.operationPartnerCancelTransaction(response.transaction);
        }
        if (response.transaction) {
            response.transaction.initResponseEndAt = new Date();
            response.transaction.save().then();
        }
        return this.response(response.codeHttp, this.apiServiceService.responseOperation(response, operationInDto, errorType), (errorType === null || errorType === void 0 ? void 0 : errorType.message) || response.partnerMessage, response.codeHttp !== Controller_1.CODE_HTTP.OK_OPERATION);
    }
    async transaction(id) {
        return {
            msg: 'Acces',
        };
    }
    async confirmKPayDto(confirmKPayDto) {
        const isNotValid = await this.validator(this.getInstanceObject(confirmKPayDto, new ConfirmKPay_1.ConfirmKPayDto()));
        if (isNotValid) {
            return this.response(this.CODE_HTTP.OPERATION_BADREQUEST, isNotValid, '', true);
        }
        const comptePartner = await PartenerComptes_entity_1.PartenerComptes.findOne({
            where: { appKey: typeorm_1.Equal(confirmKPayDto === null || confirmKPayDto === void 0 ? void 0 : confirmKPayDto.apiKey) },
        });
        let partner;
        if (comptePartner) {
            partner = await Parteners_entity_1.Parteners.findOne(comptePartner === null || comptePartner === void 0 ? void 0 : comptePartner.partenersId);
        }
        if (!partner || !comptePartner) {
            return this.response(Controller_1.CODE_HTTP.OPERATION_BADREQUEST, {
                status: Enum_entity_1.StatusEnum.FAILLED,
                message: 'Non authentifié',
                transactionId: confirmKPayDto.transactionId,
            }, 'Non authentifié', true);
        }
        const transaction = await Transactions_entity_1.Transactions.findOne({
            where: {
                transactionId: confirmKPayDto.transactionId,
                partenerComptesId: comptePartner.id,
                statut: typeorm_1.In([Enum_entity_1.StatusEnum.PENDING, Enum_entity_1.StatusEnum.PROCESSING]),
            },
            relations: ['sousServices'],
        });
        if (!transaction) {
            return this.response(Controller_1.CODE_HTTP.OPERATION_BADREQUEST, {
                status: Enum_entity_1.StatusEnum.FAILLED,
                message: 'Aucune transaction en attente de validation  trouvé',
                transactionId: confirmKPayDto.transactionId,
            }, 'Aucune transaction en attente de validation  trouvé', true);
        }
        const apiManagerService = await this.helper.getApiManagerInterface(transaction.codeSousService, null);
        if (!apiManagerService) {
            return this.response(this.CODE_HTTP.SERVICE_DOWN, {
                message: 'Api Service Manager non configuré',
            }, 'Api Service Manager non configuré', true);
        }
        const checkResult = await apiManagerService.confirmTransaction({
            transaction: transaction,
            meta: {
                otp: confirmKPayDto.otp,
            },
        });
        if ((checkResult === null || checkResult === void 0 ? void 0 : checkResult.status) === 'SUCCESS') {
            transaction.statut = Enum_entity_1.StatusEnum.SUCCESS;
            transaction.preStatut = Enum_entity_1.StatusEnum.SUCCESS;
            transaction.checkTransactionResponse = main_1.serializeData(checkResult.meta);
        }
        else {
            transaction.statut = Enum_entity_1.StatusEnum.FAILLED;
            transaction.preStatut = Enum_entity_1.StatusEnum.FAILLED;
            transaction.errorMessage = transaction.checkTransactionResponse = main_1.serializeData(checkResult.meta);
        }
        await transaction.save();
        await apiManagerService.helper.setIsCallbackReadyValue(transaction, 0);
        apiManagerService.helper
            .updateApiBalance(apiManagerService, transaction.phonesId)
            .then();
        if ((checkResult === null || checkResult === void 0 ? void 0 : checkResult.status) === 'SUCCESS') {
            await apiManagerService.helper.handleSuccessTransactionCreditDebit(transaction);
            return this.response(Controller_1.CODE_HTTP.OK_OPERATION, {
                status: Enum_entity_1.StatusEnum.SUCCESS,
                transactionId: confirmKPayDto.transactionId,
                message: checkResult === null || checkResult === void 0 ? void 0 : checkResult.partnerMessage,
            }, checkResult.partnerMessage, false);
        }
        else {
            await apiManagerService.helper.operationPartnerCancelTransaction(transaction);
            return this.response(Controller_1.CODE_HTTP.FAILLED, {
                status: Enum_entity_1.StatusEnum.FAILLED,
                message: checkResult === null || checkResult === void 0 ? void 0 : checkResult.partnerMessage,
            }, checkResult.partnerMessage, true);
        }
    }
    async transactions() {
        return {
            message: 'List Transaction',
        };
    }
    async dictionary() {
        return this.response(this.CODE_HTTP.OK, this.getCodeOperation());
    }
    async balance(headers) {
        const partnerAccoune = await this.apiServiceService.getPartner(headers);
        if (!partnerAccoune) {
            return this.response(this.CODE_HTTP.OPERATION_AUTH_NEED, { secreteKey: 'Invalide secrete key' }, '', true);
        }
        return this.response(this.CODE_HTTP.OK_OPERATION, {
            currency: 'XOF',
            balance: partnerAccoune.parteners.solde +
                partnerAccoune.parteners.soldeCommission,
        });
    }
    async getTransactionStatus(headers, dto) {
        const partnerAccount = await this.apiServiceService.getPartner(headers);
        console.log('call get-transaction-status ', dto, partnerAccount === null || partnerAccount === void 0 ? void 0 : partnerAccount.name);
        if (!partnerAccount) {
            return this.response(this.CODE_HTTP.OPERATION_AUTH_NEED, { secreteKey: 'Invalide secrete key' }, '', true);
        }
        const transaction = await Transactions_entity_1.Transactions.findOne({
            where: {
                externalTransactionId: typeorm_1.Equal(dto.externalTransactionId || ''),
                partenerComptesId: partnerAccount.id,
            },
            relations: ['errorTypes'],
        });
        if (!transaction) {
            return this.response(this.CODE_HTTP.NOTFOUND, { externalTransactionId: 'Transaction partnaire non trouvé' }, '', true);
        }
        return this.response(this.CODE_HTTP.OK_OPERATION, {
            transactionId: transaction.transactionId,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt,
            externalTransactionId: transaction.externalTransactionId,
            status: transaction.statut,
            errorType: transaction.errorTypes
                ? {
                    code: transaction.errorTypes.code,
                    message: transaction.errorTypes.message,
                }
                : null,
        });
    }
    async refund(refundDtoIn) {
        const partnerAccount = await PartenerComptes_entity_1.PartenerComptes.findOne({
            where: {
                appKey: typeorm_1.Equal(refundDtoIn.apiKey),
                state: 'ACTIVED',
            },
            relations: ['parteners'],
        });
        if (!partnerAccount) {
            return this.response(this.CODE_HTTP.OPERATION_AUTH_NEED, { secreteKey: 'Invalide secrete key' }, '', true);
        }
        const refund = await this.helper.refund(refundDtoIn, 'partner', partnerAccount);
        if (refund.status === Enum_entity_1.StatusEnum.SUCCESS) {
            return {
                status: undefined,
                message: refund.message,
                statutTreatment: 'SUCCESS',
            };
        }
        else {
            return {
                status: undefined,
                message: refund.message,
                statutTreatment: 'FAILED',
            };
        }
    }
    async newClaim(newClaimInDtoIn) {
        const partnerAccount = await PartenerComptes_entity_1.PartenerComptes.findOne({
            where: {
                appKey: typeorm_1.Equal(newClaimInDtoIn.apiKey),
                state: 'ACTIVED',
            },
            relations: ['parteners'],
        });
        if (!partnerAccount) {
            return this.response(this.CODE_HTTP.OPERATION_AUTH_NEED, { secreteKey: 'Invalide secrete key' }, '', true);
        }
        const transaction = await Transactions_entity_1.Transactions.findOne({
            where: {
                transactionId: newClaimInDtoIn.transactionId,
                partenersId: partnerAccount.partenersId,
            },
            relations: ['sousServices'],
        });
        if (!transaction) {
            return this.response(this.CODE_HTTP.TRANSACTION_NOT_FOUND, {}, '', true);
        }
        const findClaim = await Claim_entity_1.Claim.findOne({
            where: {
                transactionId: transaction.id,
                statut: Enum_entity_1.ClaimStatut.OPENED,
            },
        });
        if (findClaim) {
            return this.response(this.CODE_HTTP.ALREADY_OPENED_CLAIM, {}, '', true);
        }
        const claim = await this.helper.createClaimForTransaction(transaction, newClaimInDtoIn.subject, newClaimInDtoIn.message);
        console.log(transaction);
        return this.response(this.CODE_HTTP.OK_OPERATION, {
            claim: claim,
        });
    }
    async mtnCallback(req, mtnCallbackData) {
        var _a;
        const fromIp = (_a = req.headers['x-forwarded-for']) !== null && _a !== void 0 ? _a : '';
        const correctIps = process.env.MTN_BJ_WHITELIST_IPS.split(';').filter((ip) => ip);
        this.helper
            .notifyAdmin('New Mtn Money callback', Enum_entity_1.TypeEvenEnum.MTN_MONEY_CALLBACK, {
            mtnCallbackData: mtnCallbackData,
            correctIps,
            fromIp,
            headers_forwarded: req.headers['x-forwarded-for'],
        })
            .then();
        if (!correctIps.some((ip) => ip.startsWith(fromIp.substring(0, fromIp.lastIndexOf('.'))))) {
            console.log('in ip mismatch');
            return {
                success: false,
                message: `ip mismatch got ${fromIp}, want ${correctIps.join('|')}`,
            };
        }
        const transaction = await Transactions_entity_1.Transactions.findOne({
            where: {
                transactionId: mtnCallbackData.externalId,
                statut: typeorm_1.In([Enum_entity_1.StatusEnum.PENDING, Enum_entity_1.StatusEnum.PROCESSING]),
                codeSousService: typeorm_1.In([
                    Enum_entity_1.SOUS_SERVICE_ENUM.MTN_BJ_API_CASH_IN,
                    Enum_entity_1.SOUS_SERVICE_ENUM.MTN_BJ_API_CASH_OUT,
                    Enum_entity_1.SOUS_SERVICE_ENUM.MTN_CI_API_CASH_IN,
                    Enum_entity_1.SOUS_SERVICE_ENUM.MTN_CI_API_CASH_OUT,
                ]),
            },
            relations: ['sousServices'],
        });
        if (!transaction) {
            return this.response(Controller_1.CODE_HTTP.OPERATION_BADREQUEST, {
                status: Enum_entity_1.StatusEnum.FAILLED,
                message: 'Aucune transaction en attente de validation  trouvé',
                transactionId: mtnCallbackData.externalId,
            }, 'Aucune transaction en attente de validation  trouvé', true);
        }
        const apiManagerService = await this.helper.getApiManagerInterface(transaction.codeSousService, null);
        if (!apiManagerService) {
            return this.response(this.CODE_HTTP.SERVICE_DOWN, {
                message: 'Api Service Manager non configuré',
            }, 'Api Service Manager non configuré', true);
        }
        const success = mtnCallbackData.status === 'SUCCESSFUL';
        if (success) {
            transaction.statut = Enum_entity_1.StatusEnum.SUCCESS;
            transaction.preStatut = Enum_entity_1.StatusEnum.SUCCESS;
            transaction.checkTransactionResponse = main_1.serializeData(Object.assign({
                fromIp,
            }, mtnCallbackData));
        }
        else {
            transaction.statut = Enum_entity_1.StatusEnum.FAILLED;
            transaction.preStatut = Enum_entity_1.StatusEnum.FAILLED;
            transaction.checkTransactionResponse = main_1.serializeData(Object.assign({
                fromIp,
            }, mtnCallbackData));
            transaction.errorMessage = MtnApiProvider_1.MtnApiProvider.getMessageFromCode(mtnCallbackData.reason);
            await transaction.save();
        }
        transaction.sousServiceTransactionId = transaction.sousServiceTransactionId
            ? `${transaction.sousServiceTransactionId}|${mtnCallbackData.financialTransactionId}`
            : `none|${mtnCallbackData.financialTransactionId}`;
        await transaction.save();
        await apiManagerService.helper.setIsCallbackReadyValue(transaction, 0);
        apiManagerService.helper
            .updateApiBalance(apiManagerService, transaction.phonesId)
            .then();
        if (success) {
            await apiManagerService.helper.handleSuccessTransactionCreditDebit(transaction);
            return this.response(Controller_1.CODE_HTTP.OK_OPERATION, {
                status: Enum_entity_1.StatusEnum.SUCCESS,
                transactionId: mtnCallbackData.externalId,
                message: 'OK_CALLBACK',
            }, 'OK_CALLBACK', false);
        }
        else {
            apiManagerService.helper
                .updateApiBalance(apiManagerService, transaction.phonesId)
                .then();
            await apiManagerService.helper.operationPartnerCancelTransaction(transaction);
            return this.response(Controller_1.CODE_HTTP.FAILLED, {
                status: Enum_entity_1.StatusEnum.FAILLED,
                message: 'FAILED_CALLBACK',
            }, 'FAILED_CALLBACK', true);
        }
    }
    async hub2Callback(req, hub2CallbackData) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const fromIp = (_a = req.headers['x-forwarded-for']) !== null && _a !== void 0 ? _a : '';
        await this.helper.sleep(2000 + Math.random() * 500);
        function sign(json, secret) {
            const hmac = crypto_1.createHmac('sha256', secret);
            hmac.update(json);
            return hmac.digest('hex');
        }
        const hub2Header = (_d = (_c = (_b = (req.headers['Hub2-Signature'] ||
            req.headers['hub2-signature'] ||
            '')
            .split(',')) === null || _b === void 0 ? void 0 : _b.map((pair) => pair.split('='))) === null || _c === void 0 ? void 0 : _c.find((pair) => pair[0] === 's1')) === null || _d === void 0 ? void 0 : _d[1];
        const signedData = sign(JSON.stringify(hub2CallbackData), process.env.HUB_2_LIVE_WEBHOOK_KEY);
        this.helper
            .notifyAdmin('New Hub 2  callback', Enum_entity_1.TypeEvenEnum.HUB2_CALLBACK, {
            hub2CallbackData: hub2CallbackData,
            fromIp,
            headers_forwarded: req.headers['x-forwarded-for'],
            sign: req.headers['Hub2-Signature'] || req.headers['hub2-signature'],
            signedData,
            hub2Header,
        })
            .then();
        if (![
            'transfer.succeeded',
            'transfer.failed',
            'payment.succeeded',
            'payment.failed',
            'payment_intent.succeeded',
        ].includes(hub2CallbackData.type)) {
            return {
                success: true,
                message: `callback received`,
            };
        }
        if (hub2Header !== signedData) {
            this.helper
                .notifyAdmin('New Hub2 callback WITH MISMATCH KEY', Enum_entity_1.TypeEvenEnum.HUB2_CALLBACK_SIGN_MISMATCH, {
                hub2CallbackData: hub2CallbackData,
                fromIp,
                headers_forwarded: req.headers['x-forwarded-for'],
            })
                .then();
            console.log('secret ip mismatch');
            return {
                success: false,
                message: `hash mismatch, receved from hub2 : ${hub2Header}, intech sign: ${signedData}`,
            };
        }
        const transaction = await Transactions_entity_1.Transactions.findOne({
            where: {
                transactionId: ((_e = hub2CallbackData === null || hub2CallbackData === void 0 ? void 0 : hub2CallbackData.data) === null || _e === void 0 ? void 0 : _e.reference) ||
                    ((_f = hub2CallbackData === null || hub2CallbackData === void 0 ? void 0 : hub2CallbackData.data) === null || _f === void 0 ? void 0 : _f.purchaseReference),
                statut: typeorm_1.In([Enum_entity_1.StatusEnum.PENDING, Enum_entity_1.StatusEnum.PROCESSING]),
            },
            relations: ['sousServices'],
        });
        if (!transaction) {
            return this.response(Controller_1.CODE_HTTP.OPERATION_BADREQUEST, {
                status: Enum_entity_1.StatusEnum.FAILLED,
                message: 'Aucune transaction en attente de validation  trouvé',
                transactionId: (_g = hub2CallbackData === null || hub2CallbackData === void 0 ? void 0 : hub2CallbackData.data) === null || _g === void 0 ? void 0 : _g.reference,
            }, 'Aucune transaction en attente de validation  trouvé', true);
        }
        const apiManagerService = await this.helper.getApiManagerInterface(transaction.codeSousService, null);
        if (!apiManagerService) {
            return this.response(this.CODE_HTTP.SERVICE_DOWN, {
                message: 'Api Service Manager non configuré',
            }, 'Api Service Manager non configuré', true);
        }
        const success = ((_h = hub2CallbackData === null || hub2CallbackData === void 0 ? void 0 : hub2CallbackData.data) === null || _h === void 0 ? void 0 : _h.status) === 'successful' &&
            ((hub2CallbackData === null || hub2CallbackData === void 0 ? void 0 : hub2CallbackData.type) === 'payment.succeeded' ||
                (hub2CallbackData === null || hub2CallbackData === void 0 ? void 0 : hub2CallbackData.type) === 'payment_intent.succeeded' ||
                (hub2CallbackData === null || hub2CallbackData === void 0 ? void 0 : hub2CallbackData.type) === 'transfer.succeeded');
        if (success) {
            transaction.statut = Enum_entity_1.StatusEnum.SUCCESS;
            transaction.preStatut = Enum_entity_1.StatusEnum.SUCCESS;
            transaction.checkTransactionResponse = main_1.serializeData(hub2CallbackData);
        }
        else {
            transaction.statut = Enum_entity_1.StatusEnum.FAILLED;
            transaction.preStatut = Enum_entity_1.StatusEnum.FAILLED;
            transaction.checkTransactionResponse = main_1.serializeData(hub2CallbackData);
            transaction.errorMessage = Hub2Provider_1.default.getMessageFromResponse(hub2CallbackData);
        }
        await transaction.save();
        await apiManagerService.helper.setIsCallbackReadyValue(transaction, 0);
        apiManagerService.helper
            .updateApiBalance(apiManagerService, transaction.phonesId)
            .then();
        if (success) {
            await apiManagerService.helper.handleSuccessTransactionCreditDebit(transaction);
            return this.response(Controller_1.CODE_HTTP.OK_OPERATION, {
                status: Enum_entity_1.StatusEnum.SUCCESS,
                transactionId: (_j = hub2CallbackData === null || hub2CallbackData === void 0 ? void 0 : hub2CallbackData.data) === null || _j === void 0 ? void 0 : _j.reference,
                message: 'OK_CALLBACK',
            }, 'OK_CALLBACK', false);
        }
        else {
            apiManagerService.helper
                .updateApiBalance(apiManagerService, transaction.phonesId)
                .then();
            await apiManagerService.helper.operationPartnerCancelTransaction(transaction);
            return this.response(Controller_1.CODE_HTTP.FAILLED, {
                status: Enum_entity_1.StatusEnum.FAILLED,
                message: 'FAILED_CALLBACK',
            }, 'FAILED_CALLBACK', true);
        }
    }
    async FreeCallback(mode, freeCallbackData, req) {
        var _a;
        const fromIp = (_a = req.headers['x-forwarded-for']) !== null && _a !== void 0 ? _a : '';
        const correctIps = process.env.FREE_WHITELIST_IPS.split(';').filter((ip) => ip);
        console.log('IN FreeCallbackData', freeCallbackData, fromIp, correctIps, 'p', req.headers['x-forwarded-for']);
        this.helper
            .notifyAdmin('New Free Money callback', Enum_entity_1.TypeEvenEnum.FREE_MONEY_CALLBACK, {
            freeCallbackData,
            fromIp,
            correctIps,
            headers_forwarded: req.headers['x-forwarded-for'],
        })
            .then();
        if (!correctIps.some((ip) => ip.startsWith(fromIp.substring(0, fromIp.lastIndexOf('.'))))) {
            console.log('in ip mismatch');
            return {
                success: false,
                message: `ip mismatch got ${fromIp}, want ${correctIps.join('|')}`,
            };
        }
        if (mode !== 'live') {
            return this.response(Controller_1.CODE_HTTP.OK_OPERATION, {
                status: Enum_entity_1.StatusEnum.SUCCESS,
                transactionId: freeCallbackData.externalId,
                message: 'OK_CALLBACK_IGNORE_TEST',
            }, 'OK_CALLBACK_IGNORE_TEST', false);
        }
        const transaction = await Transactions_entity_1.Transactions.findOne({
            where: {
                transactionId: freeCallbackData.externalId,
                statut: typeorm_1.In([Enum_entity_1.StatusEnum.PENDING, Enum_entity_1.StatusEnum.PROCESSING]),
                codeSousService: typeorm_1.In([
                    Enum_entity_1.SOUS_SERVICE_ENUM.FREE_SN_WALLET_CASH_OUT,
                    Enum_entity_1.SOUS_SERVICE_ENUM.FREE_SN_WALLET_CASH_IN,
                ]),
            },
            relations: ['sousServices'],
        });
        if (!transaction) {
            return this.response(Controller_1.CODE_HTTP.OPERATION_BADREQUEST, {
                status: Enum_entity_1.StatusEnum.FAILLED,
                message: 'Aucune transaction en attente de validation  trouvé',
                transactionId: freeCallbackData.externalId,
            }, 'Aucune transaction en attente de validation  trouvé', true);
        }
        const apiManagerService = await this.helper.getApiManagerInterface(transaction.codeSousService, null);
        if (!apiManagerService) {
            return this.response(this.CODE_HTTP.SERVICE_DOWN, {
                message: 'Api Service Manager non configuré',
            }, 'Api Service Manager non configuré', true);
        }
        const success = freeCallbackData.status === 'APPROVED';
        if (success) {
            transaction.statut = Enum_entity_1.StatusEnum.SUCCESS;
            transaction.preStatut = Enum_entity_1.StatusEnum.SUCCESS;
            transaction.checkTransactionResponse = main_1.serializeData(Object.assign({
                mode,
                fromIp,
            }, freeCallbackData));
        }
        else {
            transaction.statut = Enum_entity_1.StatusEnum.FAILLED;
            transaction.preStatut = Enum_entity_1.StatusEnum.FAILLED;
            transaction.errorMessage = transaction.checkTransactionResponse = main_1.serializeData(Object.assign({
                mode,
                fromIp,
            }, freeCallbackData));
        }
        transaction.sousServiceTransactionId = freeCallbackData.fId;
        await transaction.save();
        await apiManagerService.helper.setIsCallbackReadyValue(transaction, 0);
        apiManagerService.helper
            .updateApiBalance(apiManagerService, transaction.phonesId)
            .then();
        if (success) {
            await apiManagerService.helper.handleSuccessTransactionCreditDebit(transaction);
            return this.response(Controller_1.CODE_HTTP.OK_OPERATION, {
                status: Enum_entity_1.StatusEnum.SUCCESS,
                transactionId: freeCallbackData.externalId,
                message: 'OK_CALLBACK',
            }, 'OK_CALLBACK', false);
        }
        else {
            apiManagerService.helper
                .updateApiBalance(apiManagerService, transaction.phonesId)
                .then();
            await apiManagerService.helper.operationPartnerCancelTransaction(transaction);
            return this.response(Controller_1.CODE_HTTP.FAILLED, {
                status: Enum_entity_1.StatusEnum.FAILLED,
                message: 'FAILED_CALLBACK',
            }, 'FAILED_CALLBACK', true);
        }
    }
    async waveCICallback(waveCallbackData) {
        console.log(waveCallbackData);
        return {
            success: 'ok',
        };
    }
    async waveSNCallback(waveCallbackData) {
        console.log(waveCallbackData);
        return {
            success: 'ok',
        };
    }
    async OmSnQrCodeCallback() {
        return {
            success: 'ok',
        };
    }
    async services() {
        const services = await SousServices_entity_1.SousServices.find({
            where: {
                state: typeorm_1.Equal(Enum_entity_1.StateEnum.ACTIVED),
            },
            relations: ['typeServices', 'services', 'services.categoriesServices'],
            select: ['name', 'typeOperation', 'typeServices', 'code', 'icon'],
            order: {
                id: 'ASC',
            },
        });
        console.log(services[0], 'kkkk');
        return {
            success: true,
            services: services.map((s) => {
                return {
                    name: s.name,
                    icon: s.icon,
                    codeService: s.code,
                    typeOperation: s.typeOperation,
                    typeService: s.typeServices.code,
                };
            }),
        };
    }
    async errors() {
        const errors = await ErrorTypes_entity_1.ErrorTypes.find({
            where: {
                state: typeorm_1.Equal(Enum_entity_1.StateEnum.ACTIVED),
            },
            order: {
                id: 'ASC',
            },
        });
        return {
            success: true,
            services: [
                {
                    id: null,
                    code: 'unknown_error',
                    message: api_manager_interface_service_1.MANAGER_INIT_UNKNOWN_MESSAGE,
                },
            ].concat(errors.map((e) => {
                return {
                    id: e.id,
                    code: e.code,
                    message: e.message,
                };
            })),
        };
    }
    async listPendingBill(pendingBillDto) {
        const isNotValid = await this.validator(this.getInstanceObject(pendingBillDto, new ListPendingBillInDto_1.ListPendingBillInDto()));
        if (isNotValid) {
            return this.response(this.CODE_HTTP.OPERATION_BADREQUEST, isNotValid, '', true);
        }
        const comptePartner = await PartenerComptes_entity_1.PartenerComptes.findOne({
            where: { appKey: typeorm_1.Equal(pendingBillDto === null || pendingBillDto === void 0 ? void 0 : pendingBillDto.apiKey), state: 'ACTIVED' },
        });
        let partner;
        if (comptePartner) {
            partner = await Parteners_entity_1.Parteners.findOne(comptePartner === null || comptePartner === void 0 ? void 0 : comptePartner.partenersId);
        }
        if (!partner || !comptePartner) {
            return this.response(Controller_1.CODE_HTTP.OPERATION_BADREQUEST, {}, 'Non authentifié', true);
        }
        const apiManagerService = await this.helper.getApiManagerInterface(pendingBillDto.codeService, null);
        if (!apiManagerService) {
            return this.response(this.CODE_HTTP.SERVICE_DOWN, {}, 'Api Service Manager non configuré', true);
        }
        const billsResults = await apiManagerService.getPendingBillTransaction({
            dto: pendingBillDto,
        });
        if (billsResults.success) {
            return this.response(Controller_1.CODE_HTTP.OK_OPERATION, {
                status: Enum_entity_1.StatusEnum.SUCCESS,
                billAccountNumber: billsResults.billAccountNumber,
                pendingBills: billsResults.pendingBills,
            }, billsResults.pendingBills.length
                ? `${billsResults.pendingBills.length} en attente(s) non payée pour cette facture`
                : 'Aucune facture trouvé pour cette facture', false);
        }
        else {
            return this.response(Controller_1.CODE_HTTP.FAILLED, {
                status: Enum_entity_1.StatusEnum.FAILLED,
                pendingBills: [],
            }, billsResults.message, false);
        }
    }
};
__decorate([
    common_1.Post('operation'),
    ResponseDecorateur_1.ResponseDecorateur(OperationOutDto_1.OperationOutDto, 201, "Ce Services permet d'effectué tous les operations que offres cet api "),
    ResponseDecorateur_1.ResponseDecorateur(OperationBadParamsDto_1.OperationBadParamsDto, 400, 'Les parametres envoyés sont invalides'),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [OperationInDto_1.OperationInDto, Object]),
    __metadata("design:returntype", Promise)
], ApiServiceController.prototype, "operation", null);
__decorate([
    common_1.Get('transactions/:id'),
    ResponseDetailsDecorateur_1.ResponseDetailsDecorateur(DtoTransactions_1.DtoTransactions),
    ResponseForbidenDecorateur_1.ResponseForbidenDecorateur(ResponseForbidden_1.ResponseForbidden),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApiServiceController.prototype, "transaction", null);
__decorate([
    common_1.Post('confirm-payment-request'),
    ResponseDecorateur_1.ResponseDecorateur(OperationOutDto_1.OperationOutDto, 201, "Ce Services permet d'effectué tous les operations que offres cet api "),
    ResponseDecorateur_1.ResponseDecorateur(OperationBadParamsDto_1.OperationBadParamsDto, 400, 'Les parametres envoyés sont invalides'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ConfirmKPay_1.ConfirmKPayDto]),
    __metadata("design:returntype", Promise)
], ApiServiceController.prototype, "confirmKPayDto", null);
__decorate([
    common_1.Get('transactions'),
    ResponseHttpPaginationDecorateur_1.ResponseHttpPaginationDecorateur(DtoTransactions_1.DtoTransactions),
    ResponseForbidenDecorateur_1.ResponseForbidenDecorateur(ResponseForbidden_1.ResponseForbidden),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiServiceController.prototype, "transactions", null);
__decorate([
    common_1.Get('dictionary'),
    ResponseDecorateur_1.ResponseDecorateur(OperationDictionaryDto_1.OperationDictionaryDto, 200, '', true),
    ResponseForbidenDecorateur_1.ResponseForbidenDecorateur(ResponseForbidden_1.ResponseForbidden),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiServiceController.prototype, "dictionary", null);
__decorate([
    common_1.Get('balance'),
    ResponseDecorateur_1.ResponseDecorateur(DtoBalance_1.DtoBalance, 200, '', false),
    ResponseForbidenDecorateur_1.ResponseForbidenDecorateur(ResponseForbidden_1.ResponseForbidden),
    __param(0, common_1.Headers()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApiServiceController.prototype, "balance", null);
__decorate([
    common_1.Post('get-transaction-status'),
    ResponseDecorateur_1.ResponseDecorateur(DtoGetTransactionStatus_1.DtoGetTransactionStatusOut, 200, '', false),
    ResponseForbidenDecorateur_1.ResponseForbidenDecorateur(ResponseForbidden_1.ResponseForbidden),
    __param(0, common_1.Headers()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, DtoGetTransactionStatus_1.DtoGetTransactionStatusIn]),
    __metadata("design:returntype", Promise)
], ApiServiceController.prototype, "getTransactionStatus", null);
__decorate([
    common_1.Post('transaction/refund-cancel'),
    ResponseDecorateur_1.ResponseDecorateur(refund_dto_out_1.RefundDtoOut, 201, 'Home service partner intern '),
    ResponseForbidenDecorateur_1.ResponseForbidenDecorateur(ResponseForbidden_1.ResponseForbidden),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refund_dto_out_1.RefundDtoIn]),
    __metadata("design:returntype", Promise)
], ApiServiceController.prototype, "refund", null);
__decorate([
    common_1.Post('new-claim'),
    ResponseDecorateur_1.ResponseDecorateur(NewClaim_1.NewClaimInDtoOut, 200, '', false),
    ResponseForbidenDecorateur_1.ResponseForbidenDecorateur(ResponseForbidden_1.ResponseForbidden),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewClaim_1.NewClaimInDtoIn]),
    __metadata("design:returntype", Promise)
], ApiServiceController.prototype, "newClaim", null);
__decorate([
    request_mapping_decorator_1.All('callback/mtn-momo'),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, MtnBjCallback_1.MtnBjCallbackData]),
    __metadata("design:returntype", Promise)
], ApiServiceController.prototype, "mtnCallback", null);
__decorate([
    request_mapping_decorator_1.All('callback/hub2'),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Hub2Callback_1.Hub2CallbackData]),
    __metadata("design:returntype", Promise)
], ApiServiceController.prototype, "hub2Callback", null);
__decorate([
    common_1.Post('callback/freemoney/:mode'),
    __param(0, common_1.Param('mode')),
    __param(1, common_1.Body()),
    __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, FreeCallback_1.FreeCallbackData, Object]),
    __metadata("design:returntype", Promise)
], ApiServiceController.prototype, "FreeCallback", null);
__decorate([
    common_1.Post('callback/wave-ci'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApiServiceController.prototype, "waveCICallback", null);
__decorate([
    common_1.Post('callback/wave-sn'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApiServiceController.prototype, "waveSNCallback", null);
__decorate([
    request_mapping_decorator_1.All('callback/om-qr-sn'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiServiceController.prototype, "OmSnQrCodeCallback", null);
__decorate([
    common_1.Get('services'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiServiceController.prototype, "services", null);
__decorate([
    common_1.Get('errors'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiServiceController.prototype, "errors", null);
__decorate([
    common_1.Post('list-pending-bills'),
    ResponseDecorateur_1.ResponseDecorateur(OperationOutDto_1.OperationOutDto, 201, "Ce Services permet d'effectué tous les operations que offres cet api "),
    ResponseDecorateur_1.ResponseDecorateur(OperationBadParamsDto_1.OperationBadParamsDto, 400, 'Les parametres envoyés sont invalides'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ListPendingBillInDto_1.ListPendingBillInDto]),
    __metadata("design:returntype", Promise)
], ApiServiceController.prototype, "listPendingBill", null);
ApiServiceController = __decorate([
    common_1.Controller('api-services'),
    swagger_1.ApiExtraModels(...[
        ResponseHttp_1.ResponseHttp,
        PaginatedDto_1.PaginatedDto,
        OperationOutDto_1.OperationOutDto,
        NewClaim_1.NewClaimInDtoOut,
        OperationBadParamsDto_1.OperationBadParamsDto,
        DtoTransactions_1.DtoTransactions,
        OperationDictionaryDto_1.OperationDictionaryDto,
        ResponseHttpDefaultData_1.ResponseHttpDefaultData,
    ]),
    swagger_1.ApiTags('Api Services Partners'),
    __metadata("design:paramtypes", [api_service_service_1.ApiServiceService,
        helper_service_1.HelperService])
], ApiServiceController);
exports.ApiServiceController = ApiServiceController;
//# sourceMappingURL=api-service.controller.js.map