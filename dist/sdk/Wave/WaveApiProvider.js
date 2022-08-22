"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WAVE_BILL_ID = void 0;
const node_fetch_1 = require("node-fetch");
const moment = require("moment");
const rp = require("request-promise");
const Enum_entity_1 = require("../../Models/Entities/Enum.entity");
const Utils = require("util");
const Controller_1 = require("../../Controllers/Controller");
const config_1 = require("./config");
const userAgent = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:99.0) Gecko/20100101 Firefox/99.0`;
const BILL_MAX_RETRY = 5;
const FETCH_ASYNC_MAX_RETRY = 10;
var WAVE_BILL_ID;
(function (WAVE_BILL_ID) {
    WAVE_BILL_ID["RAPIDO"] = "BT_rapido:U_R-mFhH9faepR";
    WAVE_BILL_ID["WOYOFAL"] = "BT_woyofal:U_2Tp0QIvJu9ar";
    WAVE_BILL_ID["SENEAU"] = "BT_sde:U_2Tp0QIvJu9ar";
    WAVE_BILL_ID["SENELEC"] = "BT_senelec:U_R-mFhH9faepR";
    WAVE_BILL_ID["XEWEUL"] = "BT_xeweul:U_2Tp0QIvJu9ar";
    WAVE_BILL_ID["AQUATECH"] = "BT_aquatech:U_2Tp0QIvJu9ar";
    WAVE_BILL_ID["OOLUSOLAR"] = "BT_oolu:U_2Tp0QIvJu9ar";
    WAVE_BILL_ID["BAOBAP_PLUS"] = "BT_baobab_plus:U_2Tp0QIvJu9ar";
    WAVE_BILL_ID["UVS"] = "BT_uvs_sn:U_2Tp0QIvJu9ar";
    WAVE_BILL_ID["UCAD"] = "BT_university_fee_sn:U_2Tp0QIvJu9ar";
    WAVE_BILL_ID["DER_FJ"] = "BT_der:U_2Tp0QIvJu9ar";
    WAVE_BILL_ID["CAMPUSEN"] = "BT_campusen_sn:U_2Tp0QIvJu9ar";
})(WAVE_BILL_ID = exports.WAVE_BILL_ID || (exports.WAVE_BILL_ID = {}));
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
    static async listPendingBill({ sessionId, walletId, billAccountNumber, billAccountNumberFieldName, billId, addConfirmField = false, }) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const partnerQueryId = WaveUtil.uid5();
        const sleepTime = 2000;
        const maxRetry = BILL_MAX_RETRY;
        async function poolBillInternal(queryId, billAccountNumber, billAccountNumberFieldName, billId, retryNumber, maxRetry) {
            var _a, _b;
            try {
                console.log('start pooling bills', retryNumber, maxRetry);
                const response = await node_fetch_1.default('https://sn.mmapp.wave.com/a/business_graphql', {
                    credentials: 'omit',
                    headers: {
                        'User-Agent': userAgent,
                        Accept: '*/*',
                        'Accept-Language': 'fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3',
                        'Content-Type': 'application/json',
                        'Session-Id': sessionId,
                        'Sec-Fetch-Dest': 'empty',
                        'Sec-Fetch-Mode': 'cors',
                        'Sec-Fetch-Site': 'same-site',
                    },
                    referrer: 'https://business.wave.com/',
                    body: '{"query":"query BillInput_BillConfirmationPolling_Query(\\n  $billTypeId: ID!\\n  $partnerQueryId: ID!\\n  $partialFields: [BillFieldInput]!\\n) {\\n  billConfirmationPolling(billTypeId: $billTypeId, partnerQueryId: $partnerQueryId, partialFields: $partialFields) {\\n    __typename\\n    ... on BillConfirmationActual {\\n      displayFields {\\n        __typename\\n        label\\n        value\\n      }\\n      confirmedFields {\\n        __typename\\n        name\\n        value\\n      }\\n    }\\n    ... on AsyncPending {\\n      clientId\\n    }\\n  }\\n}\\n","variables":{"billTypeId":"' +
                        billId +
                        '","partnerQueryId":"' +
                        queryId +
                        '","partialFields":[{"name":"' +
                        billAccountNumberFieldName +
                        '","value":"' +
                        billAccountNumber +
                        '"},{"name":"invoice_reference","value":""},{"name":"__amount__","value":""}]}}',
                    method: 'POST',
                    mode: 'cors',
                });
                const jsonResponse = await response.json();
                if (!WaveUtil.isSuccess(jsonResponse)) {
                    return jsonResponse;
                }
                else if ((_b = (_a = jsonResponse === null || jsonResponse === void 0 ? void 0 : jsonResponse.data) === null || _a === void 0 ? void 0 : _a.billConfirmationPolling) === null || _b === void 0 ? void 0 : _b.displayFields) {
                    return jsonResponse;
                }
                else if (retryNumber < maxRetry) {
                    console.log(`sleeping ${sleepTime / 1000} s`);
                    await WaveUtil.sleep(sleepTime);
                    return poolBillInternal(queryId, billAccountNumber, billAccountNumberFieldName, billId, ++retryNumber, maxRetry);
                }
                else {
                    console.log('End pooling without result');
                    return null;
                }
            }
            catch (e) {
                console.log(e);
                if (retryNumber < maxRetry) {
                    console.log(`sleeping ${sleepTime / 1000} s`);
                    await WaveUtil.sleep(sleepTime);
                    return poolBillInternal(queryId, billAccountNumber, billAccountNumberFieldName, billId, ++retryNumber, maxRetry);
                }
                else {
                    console.log('End pooling without result');
                    return null;
                }
            }
        }
        const jsonResponse = await poolBillInternal(partnerQueryId, billAccountNumber, billAccountNumberFieldName, billId, 0, 0);
        if (WaveUtil.isSuccess(jsonResponse)) {
            console.log('first step initing pool request for senelec');
            const poolResponse = await poolBillInternal(partnerQueryId, billAccountNumber, billAccountNumberFieldName, billId, 0, maxRetry);
            if (WaveUtil.isSuccess(poolResponse)) {
                const amountField = (_b = (_a = poolResponse === null || poolResponse === void 0 ? void 0 : poolResponse.data) === null || _a === void 0 ? void 0 : _a.billConfirmationPolling) === null || _b === void 0 ? void 0 : _b.confirmedFields.find((c) => c.name === '__amount__');
                const referenceInvoiceField = (_d = (_c = poolResponse === null || poolResponse === void 0 ? void 0 : poolResponse.data) === null || _c === void 0 ? void 0 : _c.billConfirmationPolling) === null || _d === void 0 ? void 0 : _d.confirmedFields.find((c) => c.name === 'invoice_reference');
                const infoFields = ((_f = (_e = poolResponse === null || poolResponse === void 0 ? void 0 : poolResponse.data) === null || _e === void 0 ? void 0 : _e.billConfirmationPolling) === null || _f === void 0 ? void 0 : _f.displayFields) || [];
                const confirmedField = ((_h = (_g = poolResponse === null || poolResponse === void 0 ? void 0 : poolResponse.data) === null || _g === void 0 ? void 0 : _g.billConfirmationPolling) === null || _h === void 0 ? void 0 : _h.confirmedFields) || [];
                return {
                    success: true,
                    code: 'pending_bill_confirmation',
                    partnerQueryId,
                    poolResponse,
                    bills: [
                        {
                            amount: parseFloat(amountField.value.substring(4)),
                            billReference: referenceInvoiceField.value,
                            infos: infoFields.map((info) => {
                                return {
                                    label: info.label,
                                    value: info.value,
                                };
                            }),
                            confirms: addConfirmField
                                ? confirmedField.map((info) => {
                                    return {
                                        name: info.name,
                                        value: info.value,
                                        typename: info.__typename,
                                    };
                                })
                                : undefined,
                        },
                    ],
                };
            }
            else {
                const error = WaveUtil.getErrorResponse(poolResponse);
                return {
                    message: error.message,
                    code: error.code,
                    jsonResponse,
                    paymentId: null,
                    success: false,
                };
            }
        }
        else {
            const error = WaveUtil.getErrorResponse(jsonResponse);
            return {
                message: error.message,
                code: error.code,
                jsonResponse,
                paymentId: null,
                success: false,
            };
        }
    }
    static async confirmBill({ sessionId, walletId, amount, invoiceId, billAccountNumber, billId, billAccountNumberFieldName, }) {
        var _a;
        const pendingBills = await this.listPendingBill({
            sessionId,
            walletId,
            billAccountNumber,
            billAccountNumberFieldName,
            billId,
            addConfirmField: true,
        });
        const targetBill = (_a = pendingBills === null || pendingBills === void 0 ? void 0 : pendingBills.bills) === null || _a === void 0 ? void 0 : _a.find((b) => b.billReference === invoiceId);
        if (!targetBill) {
            return {
                success: false,
                code: 'error',
                message: `La facture  #${invoiceId} n'as pas ete trouvé`,
            };
        }
        if (amount !== targetBill.amount) {
            return {
                success: false,
                code: 'error',
                message: `Le montant de la facture (${targetBill.amount} CFA) est different du montant soumis (${amount} CFA)`,
                targetBill,
            };
        }
        const allFields = [];
        for (const field of targetBill.confirms) {
            allFields.push({
                name: field.name,
                value: field.value,
            });
        }
        const clientId = WaveUtil.uid5();
        const startDate = new Date();
        const confirmationQuery = '{"query":"mutation BillInput_PayBill2_Mutation(\\n  $id: ID!\\n  $billAmount: Money\\n  $sendAmount: Money\\n  $fields: [BillFieldInput!]!\\n  $clientId: String!\\n) {\\n  payBill2(id: $id, billAmount: $billAmount, sendAmount: $sendAmount, fields: $fields, clientId: $clientId, userInterface: BUSINESS_PORTAL) {\\n    __typename\\n    response {\\n      __typename\\n      ... on PayBill {\\n        payment {\\n          __typename\\n          sendAmount\\n          clientId\\n          billType\\n          whenCreated\\n          id\\n        }\\n      }\\n      ... on AsyncPending {\\n        clientId\\n      }\\n    }\\n  }\\n}\\n","variables":{"id":"' +
            billId +
            '","billAmount":"CFA ' +
            amount +
            '","sendAmount":"CFA ' +
            amount +
            '","fields":[{"name":"' +
            billAccountNumberFieldName +
            '","value":"' +
            billAccountNumber +
            '"},{"name":"__amount__","value":"CFA ' +
            amount +
            '"},{"name":"invoice_reference","value":"' +
            invoiceId +
            '"},' +
            allFields
                .map((a) => `{"name":"${a.name}","value":"${a.value}"}`)
                .join(',') +
            '],"clientId":"' +
            clientId +
            '"}}';
        console.log(confirmationQuery);
        const jsonResponse = await node_fetch_1.default('https://sn.mmapp.wave.com/a/business_graphql', {
            credentials: 'omit',
            headers: {
                'User-Agent': userAgent,
                Accept: '*/*',
                'Accept-Language': 'fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3',
                'Content-Type': 'application/json',
                'Session-Id': sessionId,
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site',
            },
            referrer: 'https://business.wave.com/',
            body: confirmationQuery,
            method: 'POST',
            mode: 'cors',
        });
        console.log(JSON.stringify(jsonResponse));
        if (WaveUtil.isSuccess(jsonResponse)) {
            const asyncResponse = await WaveApiProvider.fetchAsyncPayment({
                sessionId,
                walletId,
                paymentId: null,
                startDate,
                billAccountId: billAccountNumber,
                amount: amount,
            }, '');
            console.log(asyncResponse);
            if (asyncResponse) {
                return {
                    success: true,
                    code: 'success',
                    message: `La facture  #${invoiceId} du montant de ${amount} CFA a été payé avec succès`,
                    jsonResponse,
                    paymentId: (asyncResponse === null || asyncResponse === void 0 ? void 0 : asyncResponse.transferOpaqueId) || (asyncResponse === null || asyncResponse === void 0 ? void 0 : asyncResponse.id),
                    asyncResponse,
                };
            }
            else {
                return {
                    success: false,
                    code: 'error',
                    message: `La facture  #${invoiceId} du montant de ${amount} CFA n'a put être payé`,
                    jsonResponse,
                    paymentId: (asyncResponse === null || asyncResponse === void 0 ? void 0 : asyncResponse.transferOpaqueId) || (asyncResponse === null || asyncResponse === void 0 ? void 0 : asyncResponse.id),
                    asyncResponse,
                };
            }
        }
        else {
            const error = WaveUtil.getErrorResponse(jsonResponse);
            return {
                message: error.message,
                code: error.code,
                jsonResponse,
                paymentId: null,
                success: false,
            };
        }
    }
    static async makeDirectBillPay({ sessionId, walletId, amount, billId, billAccountNumberFieldName, billAccountNumber, label, otherFields = undefined, searchInSummary = '', }) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const clientId = WaveUtil.uid5();
        const startDate = new Date();
        const allFields = otherFields || [];
        allFields.push({
            name: billAccountNumberFieldName,
            value: billAccountNumber,
        });
        const graphQuery = '{"query":"mutation BillInput_PayBill2_Mutation(\\n  $id: ID!\\n  $billAmount: Money\\n  $sendAmount: Money\\n  $fields: [BillFieldInput!]!\\n  $clientId: String!\\n) {\\n  payBill2(id: $id, billAmount: $billAmount, sendAmount: $sendAmount, fields: $fields, clientId: $clientId, userInterface: BUSINESS_PORTAL) {\\n    __typename\\n    response {\\n      __typename\\n      ... on PayBill {\\n        payment {\\n          __typename\\n          sendAmount\\n          clientId\\n          billType\\n          whenCreated\\n          id\\n        }\\n      }\\n      ... on AsyncPending {\\n        clientId\\n      }\\n    }\\n  }\\n}\\n","variables":{"id":"' +
            billId +
            '","billAmount":"CFA ' +
            amount +
            '","sendAmount":"CFA ' +
            amount +
            '","fields":[' +
            allFields
                .map((a) => `{"name":"${a.name}","value":"${a.value}"}`)
                .join(',') +
            ',{"name":"__amount__","value":"' +
            amount +
            '"}],"clientId":"' +
            clientId +
            '"}}';
        const args = {
            credentials: 'omit',
            headers: {
                'User-Agent': userAgent,
                Accept: '*/*',
                'Accept-Language': 'fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3',
                'Content-Type': 'application/json',
                'Session-Id': sessionId,
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-site',
            },
            referrer: 'https://business.wave.com/',
            body: graphQuery,
            method: 'POST',
            mode: 'cors',
        };
        console.log(args, graphQuery);
        const response = await node_fetch_1.default('https://sn.mmapp.wave.com/a/business_graphql', args);
        const jsonResponse = await response.json();
        if (WaveUtil.isSuccess(jsonResponse)) {
            const payment = (_c = (_b = (_a = jsonResponse === null || jsonResponse === void 0 ? void 0 : jsonResponse.data) === null || _a === void 0 ? void 0 : _a.payBill2) === null || _b === void 0 ? void 0 : _b.response) === null || _c === void 0 ? void 0 : _c.payment;
            const paymentId = payment === null || payment === void 0 ? void 0 : payment.id;
            const asyncResponse = await WaveApiProvider.fetchAsyncPayment({
                sessionId,
                walletId,
                paymentId,
                startDate,
                billAccountId: billAccountNumber,
                amount: amount,
            }, searchInSummary);
            if (asyncResponse) {
                let woyofalKWh;
                let woyofalCode;
                let message = '';
                if (billId === WAVE_BILL_ID.WOYOFAL) {
                    woyofalCode = (_e = (_d = asyncResponse['summary']) === null || _d === void 0 ? void 0 : _d.match(/[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}/)) === null || _e === void 0 ? void 0 : _e[0];
                    woyofalKWh = parseFloat((_j = (_h = (_g = (_f = asyncResponse['summary']) === null || _f === void 0 ? void 0 : _f.match(/\(.*\)/)) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.replace('(', '')) === null || _j === void 0 ? void 0 : _j.replace(')', ''));
                    message = `${label} #"${billAccountNumber}" a été rechargé de ${amount} CFA (${woyofalKWh} kWh), votre code de recharge est "${woyofalCode}"`;
                }
                else {
                    message = `${label} #"${billAccountNumber}" a été rechargé de ${amount} CFA`;
                }
                return {
                    code: 'success',
                    message: message,
                    jsonResponse,
                    paymentId: (asyncResponse === null || asyncResponse === void 0 ? void 0 : asyncResponse.transferOpaqueId) || (asyncResponse === null || asyncResponse === void 0 ? void 0 : asyncResponse.id),
                    asyncResponse,
                    woyofalCode,
                    woyofalKWh,
                    success: true,
                };
            }
            else {
                return {
                    success: false,
                    message: `Impossible de recharger la carte "${billAccountNumber}", verifier le numéro saisi`,
                    code: 'unknown_woyofal_counter',
                    jsonResponse,
                    paymentId: null,
                    woyofalCode: null,
                    woyofalKWh: null,
                    asyncResponse: null,
                };
            }
        }
        else {
            const error = WaveUtil.getErrorResponse(jsonResponse);
            return {
                success: false,
                message: error.message,
                code: error.code,
                jsonResponse,
                paymentId: null,
                woyofalCode: null,
                woyofalKWh: null,
            };
        }
    }
    static async fetchAsyncPayment({ sessionId, walletId, paymentId, startDate, billAccountId, amount }, searchInSummary = '') {
        console.log('always null', paymentId);
        amount = parseFloat(amount);
        const start = startDate.toISOString().replace('T', ' ').substring(0, 10);
        const checkLimitEnd = new Date(startDate);
        const maxRetry = FETCH_ASYNC_MAX_RETRY;
        const sleepTime = 2000;
        checkLimitEnd.setDate(checkLimitEnd.getDate() + 1);
        const end = checkLimitEnd.toISOString().replace('T', ' ').substring(0, 10);
        async function fetchPending(counter = 0) {
            try {
                console.log('fetching async pending: ', counter, new Date());
                const response = await node_fetch_1.default('https://sn.mmapp.wave.com/a/business_graphql', {
                    credentials: 'omit',
                    headers: {
                        'User-Agent': userAgent,
                        Accept: '*/*',
                        'Accept-Language': 'fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3',
                        'Content-Type': 'application/json',
                        'Session-Id': sessionId,
                        'Sec-Fetch-Dest': 'empty',
                        'Sec-Fetch-Mode': 'cors',
                        'Sec-Fetch-Site': 'same-site',
                    },
                    referrer: 'https://business.wave.com/',
                    body: '{"query":"query HistoryEntries_BusinessWalletHistoryQuery(\\n  $start: Date!\\n  $end: Date!\\n  $walletOpaqueId: String!\\n) {\\n  me {\\n    businessUser {\\n      role\\n      user {\\n        merchant {\\n          needsPinToRefund\\n          id\\n        }\\n        id\\n      }\\n      business {\\n        name\\n        showGrossAmount\\n        walletHistory(start: $start, end: $end, walletOpaqueId: $walletOpaqueId) {\\n          batches {\\n            __typename\\n            id\\n            totalCost\\n            whenCreated\\n            senderName\\n            senderMobile\\n          }\\n          historyEntries {\\n            __typename\\n            id\\n            summary\\n            whenEntered\\n            amount\\n            isPending\\n            isCancelled\\n            ... on AgentTransactionEntry {\\n              isDeposit\\n              agentName\\n              customerName\\n              customerMobile\\n            }\\n            ... on BillPaymentEntry {\\n              billName\\n              billAccount\\n            }\\n            ... on MerchantSaleEntry {\\n              isRefunded\\n              isCheckout\\n              clientReference\\n              transferId\\n              customerMobile: senderMobile\\n              customerName: senderName\\n              cashierName: merchantUName\\n              grossAmount\\n              feeAmount\\n              actionSource\\n            }\\n            ... on MerchantRefundEntry {\\n              merchantUName\\n              customerMobile: senderMobile\\n              customerName: senderName\\n              cashierName: merchantUName\\n            }\\n            ... on TransferSentEntry {\\n              isRefunded\\n              recipientName\\n              recipientMobile\\n              transferOpaqueId: transferId\\n            }\\n            ... on TransferSentReversalEntry {\\n              senderName\\n              senderMobile\\n            }\\n          }\\n        }\\n        id\\n      }\\n      id\\n    }\\n    id\\n  }\\n}\\n","variables":{"start":"' +
                        start +
                        '","end":"' +
                        end +
                        '","walletOpaqueId":"' +
                        walletId +
                        '"}}',
                    method: 'POST',
                    mode: 'cors',
                });
                const jsonResponse = await response.json();
                const histories = jsonResponse.data.me.businessUser.business.walletHistory
                    .historyEntries;
                const targetPayment = histories.find((b) => {
                    return (b.billAccount === billAccountId &&
                        Math.abs(parseFloat(b.amount.substring(4))) === amount &&
                        (searchInSummary.length === 0 ||
                            b.summary
                                .toLowerCase()
                                .includes(searchInSummary.toLowerCase())) &&
                        new Date(b.whenEntered) > startDate);
                });
                if (targetPayment) {
                    return targetPayment;
                }
                else {
                    console.log(`sleeping ${sleepTime / 1000} s`);
                    await WaveUtil.sleep(sleepTime);
                    console.log('after sleep', counter, maxRetry, counter <= maxRetry);
                    if (counter < maxRetry) {
                        return fetchPending(++counter);
                    }
                    else {
                        console.log('retry end');
                        return null;
                    }
                }
            }
            catch (e) {
                console.log(e);
                console.log(`sleeping ${sleepTime / 1000} s`);
                await WaveUtil.sleep(sleepTime);
                console.log('after sleep', counter, maxRetry, counter <= maxRetry);
                if (counter < maxRetry) {
                    return fetchPending(++counter);
                }
                else {
                    console.log('retry end');
                    return null;
                }
            }
        }
        return fetchPending(0);
    }
}
exports.default = WaveApiProvider;
WaveApiProvider.apiUrl = 'https://api.wave.com';
WaveApiProvider.baseUrl = 'https://api.wave.com';
WaveApiProvider.WAVE_DATE_FORMAT = 'YYYY-MM-DD';
class WaveUtil {
    static uid5() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0, v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
    static getErrorResponse(jsonResponse) {
        var _a, _b, _c, _d;
        return {
            code: ((_b = (_a = jsonResponse === null || jsonResponse === void 0 ? void 0 : jsonResponse.errors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.code) || 'unknown_error',
            message: (((_d = (_c = jsonResponse === null || jsonResponse === void 0 ? void 0 : jsonResponse.errors) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.message) || 'Erreur').replace(/wave/gi, 'Intech'),
        };
    }
    static isSuccess(jsonResponse) {
        var _a;
        return parseInt(String(((_a = jsonResponse === null || jsonResponse === void 0 ? void 0 : jsonResponse.errors) === null || _a === void 0 ? void 0 : _a.length) || 0)) === 0;
    }
    static sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
//# sourceMappingURL=WaveApiProvider.js.map