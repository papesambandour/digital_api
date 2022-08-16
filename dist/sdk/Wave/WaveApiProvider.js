"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const moment = require("moment");
const rp = require("request-promise");
const Enum_entity_1 = require("../../Models/Entities/Enum.entity");
const Utils = require("util");
const Controller_1 = require("../../Controllers/Controller");
const config_1 = require("./config");
class WaveApiProvider {
    static now() {
        return moment().format(WaveApiProvider.WAVE_DATE_FORMAT);
    }
    static async SendWaveMoneyBusiness({ toPhoneNumber, sender = '', amount, sessionId, walletId, }) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        const amountInfo = WaveApiProvider.waveFeeCalculator(amount, 1);
        const invisibleCharacter = 'ㅤ';
        const receiverName = `${invisibleCharacter.repeat(3)} ${invisibleCharacter.repeat(2)}`;
        const sendQuery = `{
    "query": "mutation SingleTransfer_BusinessSendMutation(   $mobile: String!   $walletId: ID!   $sendAmount: Money!   $receiveAmount: Money!   $recipientName: String!   $description: String ) {   businessSend(     transfer: {       recipientMobile: $mobile       recipientName: $recipientName       sendAmount: $sendAmount       receiveAmount: $receiveAmount       walletId: $walletId       userInterface: BUSINESS_PORTAL     }     description: $description   ) {     transfer {       id       user {         businessUser {           business {             wallet {               id               balance               currency             }             id           }           id         }         id       }     }     description   } } ",
    "operationName": "SingleTransfer_BusinessSendMutation",
    "variables": {
        "description": "${sender}",
        "mobile": "${toPhoneNumber}",
        "receiveAmount": "CFA ${amountInfo.receiveAmount}",
        "sendAmount": "CFA ${amountInfo.sentAmount}",
        "recipientName": "${receiverName}",
        "walletId": "${walletId}"
    }
}`;
        const headers = {
            'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:98.0) Gecko/20100101 Firefox/98.0`,
            Accept: '*/*',
            'Accept-Language': 'fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3',
            'Content-Type': 'application/json',
            'Session-Id': `${sessionId}`,
        };
        function _(args) {
            return args;
        }
        try {
            console.log('before disaster');
            const sendQueryResult = await _(node_fetch_1.default)('https://sn.mmapp.wave.com/a/business_graphql', {
                headers: headers,
                referrer: 'https://business.wave.com/',
                body: sendQuery,
                method: 'POST',
            });
            const json = (await sendQueryResult.json());
            if ((_c = (_b = (_a = json === null || json === void 0 ? void 0 : json.data) === null || _a === void 0 ? void 0 : _a.businessSend) === null || _b === void 0 ? void 0 : _b.transfer) === null || _c === void 0 ? void 0 : _c.id) {
                const sourceWallet = ((_j = (_h = (_g = (_f = (_e = (_d = json.data) === null || _d === void 0 ? void 0 : _d.businessSend) === null || _e === void 0 ? void 0 : _e.transfer) === null || _f === void 0 ? void 0 : _f.user) === null || _g === void 0 ? void 0 : _g.businessUser) === null || _h === void 0 ? void 0 : _h.business) === null || _j === void 0 ? void 0 : _j.wallet) || {
                    balance: 'CFA 0',
                };
                return Promise.resolve({
                    success: true,
                    code: 'success',
                    message: 'Envoyé avec succès',
                    newBalance: parseFloat(((sourceWallet === null || sourceWallet === void 0 ? void 0 : sourceWallet.balance) || '0').replace('CFA ', '')) || 0,
                    fullResponse: json,
                    reference: (_m = (_l = (_k = json.data) === null || _k === void 0 ? void 0 : _k.businessSend) === null || _l === void 0 ? void 0 : _l.transfer) === null || _m === void 0 ? void 0 : _m.id,
                });
            }
            else {
                return Promise.resolve({
                    success: false,
                    code: ((_o = json === null || json === void 0 ? void 0 : json.errors[0]) === null || _o === void 0 ? void 0 : _o.code) || 'unknown_error',
                    message: ((_p = json === null || json === void 0 ? void 0 : json.errors[0]) === null || _p === void 0 ? void 0 : _p.message) || 'Erreur',
                    newBalance: null,
                    fullResponse: json,
                    reference: '',
                });
            }
        }
        catch (e) {
            return Promise.resolve({
                success: false,
                code: 'unknown_error',
                message: e.message,
                newBalance: null,
                fullResponse: e,
                reference: '',
            });
        }
    }
    static waveFeeCalculator(amount, feePercent = 1) {
        amount = Math.ceil(amount / 5) * 5;
        const factor = 100 / 100 - feePercent / 100;
        const feeAmount = amount < 100
            ? amount - 5
            : Math.ceil(amount * factor) - (Math.ceil(amount * factor) % 5);
        const fee = amount - feeAmount;
        return {
            sentAmount: amount + fee,
            receiveAmount: amount,
        };
    }
    static async makeCheckout({ idemPotency, amount, token, success_url, error_url, client_reference, override_business_name, }) {
        try {
            amount += '';
            if (!override_business_name) {
                override_business_name = 'InTech';
            }
            const body = {
                amount,
                currency: 'XOF',
                error_url,
                success_url,
                client_reference,
                override_business_name,
            };
            console.log('checkout body', body);
            return await rp({
                uri: `${WaveApiProvider.baseUrl}/v1/checkout/sessions`,
                method: 'post',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Idempotency-Key': idemPotency,
                },
                body,
                json: true,
            });
        }
        catch (e) {
            return {
                error: e.message,
            };
        }
    }
    static async verifyCheckout({ id, token, idemPotency }) {
        try {
            const checkout = await rp({
                uri: `${WaveApiProvider.baseUrl}/v1/checkout/sessions/${id}`,
                method: 'get',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Idempotency-Key': idemPotency,
                },
                json: true,
            });
            return Object.assign({}, checkout);
        }
        catch (e) {
            return {
                error: e.message,
            };
        }
    }
    static async apiManagerCheckCashOutStatusTransaction(apiManagerService, params, country) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        console.log('in apiManagerCheckCashOutStatusTransaction');
        const baseResponse = {
            phone: (_b = (_a = params.transaction) === null || _a === void 0 ? void 0 : _a.phone) !== null && _b !== void 0 ? _b : null,
            amount: (_e = (_d = (_c = params.transaction) === null || _c === void 0 ? void 0 : _c.amount) === null || _d === void 0 ? void 0 : _d.toString()) !== null && _e !== void 0 ? _e : null,
            externalTransactionId: (_g = (_f = params.transaction) === null || _f === void 0 ? void 0 : _f.externalTransactionId) !== null && _g !== void 0 ? _g : null,
            codeService: (_j = (_h = params.transaction) === null || _h === void 0 ? void 0 : _h.codeSousService) !== null && _j !== void 0 ? _j : null,
            callbackUrl: (_l = (_k = params.transaction) === null || _k === void 0 ? void 0 : _k.urlIpn) !== null && _l !== void 0 ? _l : null,
            transactionId: (_o = (_m = params.transaction) === null || _m === void 0 ? void 0 : _m.transactionId) !== null && _o !== void 0 ? _o : null,
        };
        const checkout = await WaveApiProvider.verifyCheckout({
            id: params.transaction.sousServiceTransactionId,
            token: config_1.waveBusinessApiConfig(country).cashOutApiKey,
            idemPotency: WaveApiProvider.now(),
        });
        if (checkout === null || checkout === void 0 ? void 0 : checkout.payment_status) {
            if (checkout.payment_status === 'succeeded' &&
                checkout.checkout_status === 'complete') {
                params.transaction.statut = Enum_entity_1.StatusEnum.SUCCESS;
                params.transaction.preStatut = Enum_entity_1.StatusEnum.SUCCESS;
                params.transaction.needCheckTransaction = 0;
                params.transaction.checkTransactionResponse = Utils.inspect(checkout);
                await params.transaction.save();
                console.log('after save');
                await apiManagerService.helper.handleSuccessTransactionCreditDebit(params.transaction);
                await apiManagerService.helper.setIsCallbackReadyValue(params.transaction.id);
                apiManagerService.helper
                    .updateApiBalance(apiManagerService, params.transaction.phonesId)
                    .then();
                return Object.assign({
                    status: 'SUCCESS',
                    codeHttp: Controller_1.CODE_HTTP.OK_OPERATION,
                }, baseResponse);
            }
            else if (checkout.payment_status === 'processing') {
                params.transaction.checkTransactionResponse = Utils.inspect(checkout);
                await params.transaction.save();
                return Object.assign({
                    status: 'PENDING',
                    codeHttp: Controller_1.CODE_HTTP.OK_OPERATION,
                }, baseResponse);
            }
            else {
                console.log('transaction failed');
                params.transaction.checkTransactionResponse = Utils.inspect(checkout);
                params.transaction.statut = Enum_entity_1.StatusEnum.FAILLED;
                params.transaction.preStatut = Enum_entity_1.StatusEnum.FAILLED;
                params.transaction.needCheckTransaction = 0;
                await params.transaction.save();
                await apiManagerService.helper.setIsCallbackReadyValue(params.transaction.id);
                apiManagerService.helper
                    .updateApiBalance(apiManagerService, params.transaction.phonesId)
                    .then();
                await apiManagerService.helper.operationPartnerCancelTransaction(params.transaction);
                return Object.assign({
                    status: 'FAILLED',
                    codeHttp: Controller_1.CODE_HTTP.OPERATION_BADREQUEST,
                }, baseResponse);
            }
        }
        else {
            params.transaction.checkTransactionResponse = Utils.inspect(checkout);
            await params.transaction.save();
            return Object.assign({
                status: 'FAILLED',
                codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
            }, baseResponse);
        }
    }
    static async getBalance(params, token, idemPotency) {
        try {
            const balance = await rp({
                uri: `${WaveApiProvider.baseUrl}/v1/balance`,
                method: 'get',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Idempotency-Key': idemPotency,
                },
                json: true,
            });
            console.log(balance);
            return {
                success: Number.isFinite(parseInt(balance.amount)),
                newBalance: balance.amount,
            };
        }
        catch (e) {
            console.log(e);
            return Promise.resolve({
                success: false,
                newBalance: null,
            });
        }
    }
}
exports.default = WaveApiProvider;
WaveApiProvider.apiUrl = 'https://api.wave.com';
WaveApiProvider.baseUrl = 'https://api.wave.com';
WaveApiProvider.WAVE_DATE_FORMAT = 'YYYY-MM-DD';
//# sourceMappingURL=WaveApiProvider.js.map