"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MtnApiProvider = void 0;
const rp = require("request-promise");
const main_1 = require("../../main");
const Controller_1 = require("../../Controllers/Controller");
const Enum_entity_1 = require("../../Models/Entities/Enum.entity");
class MtnApiProvider {
    static base64(str) {
        const buff = Buffer.from(str);
        return buff.toString('base64');
    }
    static async getAuthToken(config) {
        const url = `${MtnApiProvider.apiBaseUrl}/${config.ressource}/token/`;
        console.log(config, 'config');
        try {
            const postOption = {
                uri: url,
                method: 'POST',
                json: {},
                headers: {
                    Authorization: 'Basic ' +
                        MtnApiProvider.base64(`${config.apiUserId}:${config.apiUserKey}`),
                    'Ocp-Apim-Subscription-Key': config.primaryKey,
                },
                simple: true,
            };
            const apiResponse = await rp(postOption);
            apiResponse.success = true;
            return apiResponse;
        }
        catch (e) {
            return {
                success: false,
                message: e.message,
            };
        }
    }
    static async getBalance(config) {
        const url = `${MtnApiProvider.apiBaseUrl}/${config.ressource}/v1_0/account/balance`;
        const authToken = await MtnApiProvider.getAuthToken(config);
        try {
            const postOption = {
                uri: url,
                method: 'GET',
                json: {},
                headers: {
                    Authorization: `Bearer ${authToken.access_token}`,
                    'Ocp-Apim-Subscription-Key': config.primaryKey,
                    'X-Target-Environment': config.envTarget,
                },
                simple: true,
            };
            const apiResponse = await rp(postOption);
            apiResponse.success = true;
            apiResponse.newBalance = parseFloat(apiResponse.availableBalance);
            return apiResponse;
        }
        catch (e) {
            return {
                success: false,
                message: e.message,
            };
        }
    }
    static async initOperation(param, config, payerNote, payeeNote) {
        try {
            const authToken = await MtnApiProvider.getAuthToken(config);
            const url = `${MtnApiProvider.apiBaseUrl}/${config.ressource}/v1_0/${config.operation}`;
            const postOption = {
                uri: url,
                method: 'POST',
                json: {
                    payeeNote: payeeNote,
                    externalId: param.externalId,
                    amount: param.amount,
                    currency: config.currency,
                    payer: {
                        partyIdType: 'MSISDN',
                        partyId: '46733123453',
                    },
                    payerMessage: payerNote,
                },
                headers: {
                    Authorization: `Bearer ${authToken.access_token}`,
                    'Ocp-Apim-Subscription-Key': config.primaryKey,
                    'X-Reference-Id': param.reference,
                    'X-Target-Environment': config.envTarget,
                },
                simple: true,
            };
            console.log(main_1.serializeData(postOption));
            const apiResponse = await rp(postOption);
            console.log(apiResponse, 'okkk');
            return {
                success: true,
                apiResponse: '',
            };
        }
        catch (e) {
            return {
                success: true,
                message: e.message,
            };
        }
    }
    static async checkOperationStatus(apiManager, params, config) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        const baseResponse = {
            phone: (_b = (_a = params.transaction) === null || _a === void 0 ? void 0 : _a.phone) !== null && _b !== void 0 ? _b : null,
            amount: (_e = (_d = (_c = params.transaction) === null || _c === void 0 ? void 0 : _c.amount) === null || _d === void 0 ? void 0 : _d.toString()) !== null && _e !== void 0 ? _e : null,
            externalTransactionId: (_g = (_f = params.transaction) === null || _f === void 0 ? void 0 : _f.externalTransactionId) !== null && _g !== void 0 ? _g : null,
            codeService: (_j = (_h = params.transaction) === null || _h === void 0 ? void 0 : _h.codeSousService) !== null && _j !== void 0 ? _j : null,
            callbackUrl: (_l = (_k = params.transaction) === null || _k === void 0 ? void 0 : _k.urlIpn) !== null && _l !== void 0 ? _l : null,
            transactionId: (_o = (_m = params.transaction) === null || _m === void 0 ? void 0 : _m.transactionId) !== null && _o !== void 0 ? _o : null,
        };
        const authToken = await MtnApiProvider.getAuthToken(config);
        try {
            const url = `${MtnApiProvider.apiBaseUrl}/${config.ressource}/v1_0/${config.operation}/${params.transaction.sousServiceTransactionId}`;
            console.log('check status mtn', url);
            const postOption = {
                uri: url,
                method: 'GET',
                json: {},
                headers: {
                    Authorization: `Bearer ${authToken.access_token}`,
                    'Ocp-Apim-Subscription-Key': config.primaryKey,
                    'X-Target-Environment': config.envTarget,
                },
                simple: true,
            };
            const apiResponse = await rp(postOption);
            console.log(apiResponse);
            if ((apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.status) === 'SUCCESS' &&
                ((_p = apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.externalId) === null || _p === void 0 ? void 0 : _p.toString()) === params.transaction.id.toString()) {
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
            else if (((apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.status) === 'FAILED' ||
                (apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.status) === 'REJECTED' ||
                (apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.status) === 'TIMEOUT') &&
                ((_r = apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.externalId) === null || _r === void 0 ? void 0 : _r.toString()) === params.transaction.id.toString()) {
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
}
exports.MtnApiProvider = MtnApiProvider;
MtnApiProvider.apiBaseUrl = 'https://sandbox.momodeveloper.mtn.com';
//# sourceMappingURL=MtnApiProvider.js.map