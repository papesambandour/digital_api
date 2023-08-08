"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MtnApiProvider = void 0;
const config_1 = require("./config");
const main_1 = require("../../main");
const Controller_1 = require("../../Controllers/Controller");
const Enum_entity_1 = require("../../Models/Entities/Enum.entity");
class MtnApiProvider {
    static base64(str) {
        const buff = Buffer.from(str);
        return buff.toString('base64');
    }
    static async getBalance(mtnManager) {
        try {
            console.log('geting balance');
            const accountBalance = await mtnManager.getBalance();
            console.log('accountBalance', accountBalance);
            accountBalance.success = Number.isFinite(parseFloat(accountBalance.availableBalance));
            accountBalance.newBalance =
                parseFloat(accountBalance.availableBalance) || 0;
            console.log(accountBalance, 'accountBalance_');
            return accountBalance;
        }
        catch (e) {
            console.log(e, e.message, 'error balance');
            return {
                success: false,
                newBalance: null,
            };
        }
    }
    static wait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    static async getTransactionWithTimeout(mtnManager, transactionId, timeout) {
        const transactionPromise = mtnManager.getTransaction(transactionId);
        const timeoutPromise = new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                clearTimeout(timeoutId);
                reject(new Error('Timeout: Transaction took too long to return.'));
            }, timeout);
        });
        return Promise.race([transactionPromise, timeoutPromise]);
    }
    static async checkOperationStatus(apiManager, params, mtnManager) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        const baseResponse = {
            phone: (_b = (_a = params.transaction) === null || _a === void 0 ? void 0 : _a.phone) !== null && _b !== void 0 ? _b : null,
            amount: (_e = (_d = (_c = params.transaction) === null || _c === void 0 ? void 0 : _c.amount) === null || _d === void 0 ? void 0 : _d.toString()) !== null && _e !== void 0 ? _e : null,
            externalTransactionId: (_g = (_f = params.transaction) === null || _f === void 0 ? void 0 : _f.externalTransactionId) !== null && _g !== void 0 ? _g : null,
            codeService: (_j = (_h = params.transaction) === null || _h === void 0 ? void 0 : _h.codeSousService) !== null && _j !== void 0 ? _j : null,
            callbackUrl: (_l = (_k = params.transaction) === null || _k === void 0 ? void 0 : _k.urlIpn) !== null && _l !== void 0 ? _l : null,
            transactionId: (_o = (_m = params.transaction) === null || _m === void 0 ? void 0 : _m.transactionId) !== null && _o !== void 0 ? _o : null,
        };
        try {
            const apiResponse = await MtnApiProvider.getTransactionWithTimeout(mtnManager, params.transaction.sousServiceTransactionId, 60000);
            console.log(apiResponse);
            if ((apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.status) === 'SUCCESSFUL' &&
                ((_p = apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.externalId) === null || _p === void 0 ? void 0 : _p.toString()) ===
                    params.transaction.transactionId.toString()) {
                params.transaction.statut = Enum_entity_1.StatusEnum.SUCCESS;
                params.transaction.preStatut = Enum_entity_1.StatusEnum.SUCCESS;
                params.transaction.needCheckTransaction = 0;
                params.transaction.checkTransactionResponse = main_1.serializeData(apiResponse);
                await params.transaction.save();
                console.log('after save');
                await apiManager.helper.handleSuccessTransactionCreditDebit(params.transaction);
                await apiManager.helper.setIsCallbackReadyValue(params.transaction);
                apiManager.helper
                    .updateApiBalance(apiManager, params.transaction.phonesId)
                    .then();
                return Object.assign({
                    status: 'SUCCESS',
                    codeHttp: Controller_1.CODE_HTTP.OK_OPERATION,
                }, baseResponse);
            }
            else if ((apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.status) === 'PENDING' &&
                ((_q = apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.externalId) === null || _q === void 0 ? void 0 : _q.toString()) === params.transaction.id.toString()) {
                params.transaction.checkTransactionResponse = main_1.serializeData(apiResponse);
                await params.transaction.save();
                return Object.assign({
                    status: 'PENDING',
                    codeHttp: Controller_1.CODE_HTTP.OK_OPERATION,
                }, baseResponse);
            }
            else if ((apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.status) === 'FAILED' &&
                ((_r = apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.externalId) === null || _r === void 0 ? void 0 : _r.toString()) ===
                    params.transaction.transactionId.toString()) {
                params.transaction.checkTransactionResponse = main_1.serializeData(apiResponse);
                params.transaction.statut = Enum_entity_1.StatusEnum.FAILLED;
                params.transaction.preStatut = Enum_entity_1.StatusEnum.FAILLED;
                params.transaction.needCheckTransaction = 0;
                await params.transaction.save();
                await apiManager.helper.setIsCallbackReadyValue(params.transaction);
                apiManager.helper
                    .updateApiBalance(apiManager, params.transaction.phonesId)
                    .then();
                await apiManager.helper.operationPartnerCancelTransaction(params.transaction);
                return Object.assign({
                    status: 'FAILLED',
                    codeHttp: Controller_1.CODE_HTTP.OPERATION_BADREQUEST,
                }, baseResponse);
            }
            else {
                params.transaction.checkTransactionResponse =
                    'Error case block ' + main_1.serializeData(apiResponse);
                await params.transaction.save();
            }
        }
        catch (e) {
            console.log(e.message);
            params.transaction.checkTransactionResponse = main_1.serializeData(e.message);
            await params.transaction.save();
            return Object.assign({
                status: 'FAILLED',
                codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
            }, baseResponse);
        }
    }
    static async getCollection(country) {
        const momo = require('mtn-momo');
        console.log('host url', MtnApiProvider.getHostFromUrl(config_1.mtnApiConfig(country).collection.callback));
        const { Collections } = momo.create({
            callbackHost: MtnApiProvider.getHostFromUrl(config_1.mtnApiConfig(country).collection.callback),
            baseUrl: config_1.mtnApiConfig(country).collection.baseUrl,
            environment: config_1.mtnApiConfig(country).collection.envTarget,
        });
        return Collections({
            userSecret: config_1.mtnApiConfig(country).collection.apiUserKey,
            userId: config_1.mtnApiConfig(country).collection.apiUserId,
            primaryKey: config_1.mtnApiConfig(country).collection.primaryKey,
        });
    }
    static async getRemittance(country) {
        const momo = require('mtn-momo');
        const { Disbursements } = momo.create({
            callbackHost: MtnApiProvider.getHostFromUrl(config_1.mtnApiConfig(country).remittance.callback),
            baseUrl: config_1.mtnApiConfig(country).remittance.baseUrl,
            environment: config_1.mtnApiConfig(country).remittance.envTarget,
        });
        return Disbursements({
            userSecret: config_1.mtnApiConfig(country).remittance.apiUserKey,
            userId: config_1.mtnApiConfig(country).remittance.apiUserId,
            primaryKey: config_1.mtnApiConfig(country).remittance.primaryKey,
        });
    }
    static getMessageFromCode(reason) {
        const suffixe = ' ' + reason;
        switch (reason) {
            case 'APPROVAL_REJECTED':
                return ("La demande de paiement a été rejetée par l'utilisateur." + suffixe);
            case 'EXPIRED':
                return 'La demande de paiement a expiré.' + suffixe;
            case 'INTERNAL_PROCESSING_ERROR':
                return 'Une erreur interne est survenue.' + suffixe;
            case 'INVALID_CALLBACK_URL_HOST':
                return "L'URL de rappel fournie n'est pas valide." + suffixe;
            case 'INVALID_CURRENCY':
                return "La devise fournie n'est pas valide." + suffixe;
            case 'NOT_ALLOWED':
                return ("L'utilisateur n'est pas autorisé à effectuer cette action." + suffixe);
            case 'NOT_ALLOWED_TARGET_ENVIRONMENT':
                return "L'environnement cible n'est pas autorisé." + suffixe;
            case 'NOT_ENOUGH_FUNDS':
                return ("L'utilisateur n'a pas assez de fonds pour effectuer cette action." +
                    suffixe);
            case 'PAYEE_NOT_FOUND':
                return 'Le bénéficiaire du paiement est introuvable.' + suffixe;
            case 'PAYEE_NOT_ALLOWED_TO_RECEIVE':
                return ("Le bénéficiaire n'est pas autorisé à recevoir des paiements." +
                    suffixe);
            case 'PAYER_LIMIT_REACHED':
                return 'Le payeur a atteint sa limite.' + suffixe;
            case 'PAYER_NOT_FOUND':
                return 'Le payeur est introuvable.' + suffixe;
            case 'PAYMENT_NOT_APPROVED':
                return "Le paiement n'a pas été approuvé par l'utilisateur." + suffixe;
            case 'RESOURCE_ALREADY_EXIST':
                return 'La ressource existe déjà.' + suffixe;
            case 'RESOURCE_NOT_FOUND':
                return 'La ressource est introuvable.' + suffixe;
            case 'SERVICE_UNAVAILABLE':
                return 'Le service MTN Mobile Money est indisponible.' + suffixe;
            case 'TRANSACTION_CANCELED':
                return 'La transaction a été annulée.' + suffixe;
            default:
                return 'Erreur inconnue :' + suffixe;
        }
    }
    static getHostFromUrl(url) {
        try {
            const parsedUrl = new URL(url);
            return parsedUrl.host;
        }
        catch (error) {
            console.error('Invalid URL:', error);
            return '';
        }
    }
}
exports.MtnApiProvider = MtnApiProvider;
//# sourceMappingURL=MtnApiProvider.js.map