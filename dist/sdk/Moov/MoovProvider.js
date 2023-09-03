"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoovProvider = void 0;
const crypto_1 = require("crypto");
const process = require("process");
const soap = require("soap");
const https = require("https");
const api_manager_interface_service_1 = require("../../Controllers/api-service/api-manager-interface/api-manager-interface.service");
const moov_bj_cash_in_api_manager_service_1 = require("../../Controllers/api-service/moov-bj-cash-in-api-manager/moov-bj-cash-in-api-manager.service");
const moov_bj_cash_out_api_manager_service_1 = require("../../Controllers/api-service/moov-bj-cash-out-api-manager/moov-bj-cash-out-api-manager.service");
const Enum_entity_1 = require("../../Models/Entities/Enum.entity");
const main_1 = require("../../main");
const Controller_1 = require("../../Controllers/Controller");
const cashinTimeOutMs = 30000;
const cashOutTimeOutMs = 5000;
const checkTimeOutMs = 10000;
const clientOption = {
    requestCert: false,
    rejectUnauthorized: false,
    strictSSL: false,
    wsdl_options: {
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        }),
    },
};
class MoovProvider {
    static getAuthToken() {
        const username = process.env.MOOV_BJ_USERNAME;
        const password = process.env.MOOV_BJ_PASSWORD;
        const plaintext = `0:${username}:${password}`;
        console.log('Plain Text = ' + plaintext);
        const plain = Buffer.from(plaintext, 'utf-8');
        console.log('Plain Hex = ' + plain.toString('hex'));
        const key = Buffer.from(process.env.MOOV_BJ_AUTH_ENCRYPTION_KEY, 'utf-8');
        const iv = Buffer.alloc(16);
        const cipher = crypto_1.default.createCipheriv('aes-256-cbc', key, iv);
        let encrypted = cipher.update(plain);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        console.log('Encrypted Hex = ' + encrypted.toString('hex'));
        const encode = encrypted.toString('base64');
        console.log('Token Text = ' + encode);
        return encode;
    }
    static async makeTransferTo(param) {
        const url = process.env.MOOV_BJ_WSDL_API_URL;
        try {
            const createClientPromise = soap.createClientAsync(url, clientOption);
            const clientCreationTimeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Client creation timed out')), cashinTimeOutMs));
            const client = await Promise.race([
                createClientPromise,
                clientCreationTimeout,
            ]);
            const requestParams = {
                token: MoovProvider.getAuthToken(),
                request: {
                    amount: param.amount,
                    destination: param.phone,
                    referenceid: param.externalId,
                    remarks: param.payeeMessage,
                },
            };
            const soapRequest = client.cashintransAsync(requestParams);
            const soapRequestTimeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), cashinTimeOutMs));
            const response = await Promise.race([soapRequest, soapRequestTimeout]);
            const responseData = (response === null || response === void 0 ? void 0 : response[0].return) || {};
            const success = responseData.status === '0';
            if (success) {
                moov_bj_cash_in_api_manager_service_1.MoovBjCashInApiManagerService.MOOV_BJ_LAST_BALANCE_MESSAGE = moov_bj_cash_out_api_manager_service_1.MoovBjCashOutApiManagerService.MOOV_BJ_LAST_BALANCE_MESSAGE =
                    responseData.message;
            }
            return {
                success,
                data: response,
                referenceId: responseData.transid,
                message: MoovProvider.getErrorMessage(responseData.status),
            };
        }
        catch (error) {
            console.error('SOAP request failed:', error);
            return {
                success: false,
                data: error.message,
                message: MoovProvider.getErrorMessage(''),
            };
        }
    }
    static async getBalance(message) {
        try {
            const regex = /Votre nouveau solde ([^ ]+) FCFA/i;
            const match = message.match(regex);
            if (match && match[1]) {
                const balanceAmount = parseFloat(match[1].replace(',', ''));
                return {
                    success: Number.isFinite(balanceAmount),
                    newBalance: balanceAmount,
                };
            }
            else {
                return {
                    success: false,
                    newBalance: null,
                };
            }
        }
        catch (e) {
            console.log(e, 'fetch baalnce moov');
            return {
                success: false,
                newBalance: null,
            };
        }
    }
    static async checkTransaction(params, apiManagerService) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        const baseResponse = {
            phone: (_b = (_a = params.transaction) === null || _a === void 0 ? void 0 : _a.phone) !== null && _b !== void 0 ? _b : null,
            amount: (_e = (_d = (_c = params.transaction) === null || _c === void 0 ? void 0 : _c.amount) === null || _d === void 0 ? void 0 : _d.toString()) !== null && _e !== void 0 ? _e : null,
            externalTransactionId: (_g = (_f = params.transaction) === null || _f === void 0 ? void 0 : _f.externalTransactionId) !== null && _g !== void 0 ? _g : null,
            codeService: (_j = (_h = params.transaction) === null || _h === void 0 ? void 0 : _h.codeSousService) !== null && _j !== void 0 ? _j : null,
            callbackUrl: (_l = (_k = params.transaction) === null || _k === void 0 ? void 0 : _k.urlIpn) !== null && _l !== void 0 ? _l : null,
            transactionId: (_o = (_m = params.transaction) === null || _m === void 0 ? void 0 : _m.transactionId) !== null && _o !== void 0 ? _o : null,
        };
        try {
            const url = process.env.MOOV_BJ_WSDL_API_URL;
            const clientPromise = soap.createClientAsync(url, clientOption);
            const requestParams = {
                token: MoovProvider.getAuthToken(),
                request: {
                    transid: params.transaction.transactionId.toString(),
                },
            };
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => {
                    reject(new Error('Timeout after 3000 ms'));
                }, checkTimeOutMs);
            });
            const client = (await Promise.race([
                clientPromise,
                timeoutPromise,
            ]));
            const soapCallPromise = client.getTransactionStatusAsync(requestParams);
            const soapCallTimeoutPromise = new Promise((_, reject) => {
                setTimeout(() => {
                    reject(new Error('SOAP call timeout after 3000 ms'));
                }, checkTimeOutMs);
            });
            const response = await Promise.race([
                soapCallPromise,
                soapCallTimeoutPromise,
            ]);
            const responseData = (response === null || response === void 0 ? void 0 : response[0].response) || {};
            if (responseData.status === '0' &&
                responseData.description === 'SUCCESS') {
                params.transaction.statut = Enum_entity_1.StatusEnum.SUCCESS;
                params.transaction.preStatut = Enum_entity_1.StatusEnum.SUCCESS;
                params.transaction.sousServiceTransactionId = responseData.transid;
                params.transaction.needCheckTransaction = 0;
                params.transaction.checkTransactionResponse = main_1.serializeData(response);
                await params.transaction.save();
                console.log('after save');
                await apiManagerService.helper.handleSuccessTransactionCreditDebit(params.transaction);
                await apiManagerService.helper.setIsCallbackReadyValue(params.transaction);
                apiManagerService.helper
                    .updateApiBalance(apiManagerService, params.transaction.phonesId)
                    .then();
                return Object.assign({
                    status: 'SUCCESS',
                    codeHttp: Controller_1.CODE_HTTP.OK_OPERATION,
                }, baseResponse);
            }
            else {
                params.transaction.checkTransactionResponse = main_1.serializeData(response);
                await params.transaction.save();
                return Object.assign({
                    status: 'PENDING',
                    codeHttp: Controller_1.CODE_HTTP.OK_OPERATION,
                }, baseResponse);
            }
        }
        catch (error) {
            params.transaction.checkTransactionResponse = main_1.serializeData(error.message);
            await params.transaction.save();
            return Object.assign({
                status: 'FAILLED',
                codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
            }, baseResponse);
        }
    }
    static async makeCheckout(params) {
        try {
            const url = process.env.MOOV_BJ_WSDL_API_URL;
            const createClientPromise = soap.createClientAsync(url, clientOption);
            const clientCreationTimeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Client creation timed out')), cashOutTimeOutMs + 5000));
            const client = await Promise.race([
                createClientPromise,
                clientCreationTimeout,
            ]);
            const requestParams = {
                token: MoovProvider.getAuthToken(),
                msisdn: params.phone,
                message: params.payerMessage,
                amount: params.amount,
                externaldata1: params.externalId,
                externaldata2: params.externalId,
                fee: 0,
            };
            const responsePromise = client.PushWithPendingAsync(requestParams);
            const pendingMessage = api_manager_interface_service_1.MANAGER_INIT_CASH_OUT_SUCCESS_MESSAGE;
            const timeoutPromise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(new Error(pendingMessage));
                }, cashOutTimeOutMs);
            });
            const response = await Promise.race([responsePromise, timeoutPromise]);
            if (response instanceof Error && response.message === pendingMessage) {
                return {
                    success: !!'pending',
                    data: {
                        internalTimeout: true,
                    },
                    referenceId: '',
                    message: pendingMessage,
                };
            }
            const responseData = (response === null || response === void 0 ? void 0 : response[0].result) || {};
            if (responseData.status === '0' &&
                responseData.description === 'SUCCESS') {
                return {
                    success: !!'success',
                    data: response,
                    referenceId: responseData.referenceid,
                    message: MoovProvider.getErrorMessage(responseData.status),
                };
            }
            else if (responseData.status === '100') {
                return {
                    success: !!'pending',
                    data: response,
                    referenceId: '',
                    message: MoovProvider.getErrorMessage(responseData.status),
                };
            }
            else {
                return {
                    success: !'failed',
                    data: response,
                    message: MoovProvider.getErrorMessage(responseData.status),
                };
            }
        }
        catch (error) {
            console.error('SOAP request failed:', error);
            return {
                success: !'failed',
                data: error.message,
                message: MoovProvider.getErrorMessage(''),
            };
        }
    }
    static getErrorMessage(statusCode) {
        switch (statusCode) {
            case '0':
                return api_manager_interface_service_1.MANAGER_INIT_CASH_OUT_SUCCESS_MESSAGE;
            case '100':
                return api_manager_interface_service_1.MANAGER_INIT_CASH_OUT_SUCCESS_MESSAGE;
            case '1':
                return 'Non autorisé sur la méthode';
            case '2':
                return 'Non autorisé sur la transaction';
            case '3':
                return 'Numéro non valide';
            case '6':
                return "Destination n'est pas autorisée à recevoir un transfert";
            case '7':
                return 'Destination est verrouillée';
            case '9':
                return 'Destination est inactive';
            case '10':
                return 'Solde insuffisant';
            case '11':
                return "Impossible d'envoyer le montant ci-dessus";
            case '12':
                return "Impossible d'envoyer le montant ci-dessous";
            case '13':
                return 'Déjà atteint le montant maximum par jour';
            case '14':
                return 'Déjà atteint le montant maximum par mois';
            case '15':
                return 'Déjà atteint le nombre maximum de transactions par jour';
            case '16':
                return 'Déjà atteint le nombre maximum de transactions mensuelles';
            case '17':
                return 'La destination ne peut pas recevoir le montant ci-dessous';
            case '18':
                return 'La destination ne peut pas atteindre le solde maximum';
            case '19':
                return "L'expéditeur atteint la transaction quotidienne maximale";
            case '20':
                return "L'expéditeur atteint la transaction mensuelle maximale";
            case '91':
                return 'Timeout dans USSD PUSH / Annulation dans USSD PUSH';
            case '92':
                return 'Transactions was failed due to <error>';
            case '94':
                return 'Paramètres incomplets';
            case '95':
                return 'Identifiants invalides';
            case '98':
                return "Erreur interne de l'interface";
            case '99':
            case '-1':
                return 'Erreur de connexion à la base de données';
            case '555':
                return "Le destinataire n'est pas enregistré sur Moov Money";
            default:
                return api_manager_interface_service_1.MANAGER_INIT_UNKNOWN_MESSAGE;
        }
    }
}
exports.MoovProvider = MoovProvider;
//# sourceMappingURL=MoovProvider.js.map