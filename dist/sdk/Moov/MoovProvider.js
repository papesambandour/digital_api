"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoovProvider = void 0;
const process = require("process");
const node_fetch_1 = require("node-fetch");
const xml2js = require("xml2js");
const https = require("https");
const api_manager_interface_service_1 = require("../../Controllers/api-service/api-manager-interface/api-manager-interface.service");
const moov_bj_cash_in_api_manager_service_1 = require("../../Controllers/api-service/moov-bj-cash-in-api-manager/moov-bj-cash-in-api-manager.service");
const moov_bj_cash_out_api_manager_service_1 = require("../../Controllers/api-service/moov-bj-cash-out-api-manager/moov-bj-cash-out-api-manager.service");
const Enum_entity_1 = require("../../Models/Entities/Enum.entity");
const main_1 = require("../../main");
const Controller_1 = require("../../Controllers/Controller");
const cashinTimeOutMs = 0;
const cashOutTimeOutMs = 10000;
const checkTimeOutMs = 30000;
class MoovProvider {
    static getAuthToken() {
        return process.env.MOOV_BJ_AUTH_TOKEN;
    }
    static async makeTransferTo(phone, amount, referenceid, message) {
        try {
            const url = process.env.MOOV_BJ_WSDL_API_URL;
            const token = MoovProvider.getAuthToken();
            const xmlData = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope
        xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:tns="http://api.merchant.tlc.com/">
        <soap:Body>
          <tns:transferFlooz>
            <token>${token}</token>
            <request>
              <amount>${amount}</amount>
              <destination>${phone}</destination>
              <referenceid>${referenceid}</referenceid>
              <walletid>0</walletid>
              <extendeddata>${message}</extendeddata>
            </request>
          </tns:transferFlooz>
        </soap:Body>
      </soap:Envelope>`;
            const response = await node_fetch_1.default(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/xml',
                },
                body: xmlData,
                agent: new https.Agent({
                    rejectUnauthorized: false,
                }),
                timeout: cashinTimeOutMs,
            });
            if (response.ok) {
                const responseXmlText = await response.text();
                return new Promise((resolve, reject) => {
                    const parser = new xml2js.Parser({
                        explicitArray: false,
                        ignoreAttrs: true,
                    });
                    parser.parseString(responseXmlText, (err, jsonData) => {
                        var _a, _b;
                        if (err) {
                            return resolve({
                                success: false,
                                rawData: responseXmlText,
                                error: err,
                                referenceId: '',
                            });
                        }
                        else {
                            const responseBody = (_b = (_a = jsonData === null || jsonData === void 0 ? void 0 : jsonData['soap:Envelope']) === null || _a === void 0 ? void 0 : _a['soap:Body']) === null || _b === void 0 ? void 0 : _b['ns2:transferFloozResponse'];
                            const responseData = (responseBody === null || responseBody === void 0 ? void 0 : responseBody.return) || {};
                            const success = responseData.status === '0';
                            if (success) {
                                moov_bj_cash_in_api_manager_service_1.MoovBjCashInApiManagerService.MOOV_BJ_LAST_BALANCE_MESSAGE = moov_bj_cash_out_api_manager_service_1.MoovBjCashOutApiManagerService.MOOV_BJ_LAST_BALANCE_MESSAGE =
                                    responseData.message;
                            }
                            return resolve({
                                success: success,
                                rawData: responseXmlText,
                                referenceId: responseData.referenceid || '',
                                message: responseData.message ||
                                    MoovProvider.getErrorMessage(responseData.status),
                            });
                        }
                    });
                });
            }
            else {
                const errorData = await response.text();
                throw new Error('Failed to send cash flooz. Status: ' +
                    response.status +
                    '\nError Body: ' +
                    errorData);
            }
        }
        catch (error) {
            return {
                success: false,
                rawData: null,
                error: error.message,
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
            const response = await MoovProvider._checkTransactionById(params.transaction.transactionId.toString());
            const responseData = (response === null || response === void 0 ? void 0 : response.response) || {};
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
    static async makeCheckout(phone, amount, referenceid, message) {
        try {
            const url = process.env.MOOV_BJ_WSDL_API_URL;
            const token = MoovProvider.getAuthToken();
            const xmlData = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
      <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
        <SOAP-ENV:Header/>
        <S:Body>
          <ns2:PushWithPending xmlns:ns2="http://api.merchant.tlc.com/">
            <token>${token}</token>
            <msisdn>${phone}</msisdn>
            <message>${message}</message>
            <amount>${amount}</amount>
            <externaldata1>${referenceid}</externaldata1>
            <externaldata2>${referenceid}</externaldata2>
            <fee>0</fee>
          </ns2:PushWithPending>
        </S:Body>
      </S:Envelope>`;
            const response = await node_fetch_1.default(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/xml',
                },
                body: xmlData,
                agent: new https.Agent({
                    rejectUnauthorized: false,
                }),
                timeout: cashOutTimeOutMs,
            });
            if (response.ok) {
                const responseXmlText = await response.text();
                return new Promise((resolve, reject) => {
                    const parser = new xml2js.Parser({
                        explicitArray: false,
                        ignoreAttrs: true,
                    });
                    parser.parseString(responseXmlText, (err, jsonData) => {
                        var _a, _b;
                        if (err) {
                            return resolve({
                                success: true,
                                rawData: responseXmlText,
                                error: err,
                            });
                        }
                        else {
                            const responseBody = (_b = (_a = jsonData === null || jsonData === void 0 ? void 0 : jsonData['soap:Envelope']) === null || _a === void 0 ? void 0 : _a['soap:Body']) === null || _b === void 0 ? void 0 : _b['ns2:PushWithPendingResponse'];
                            const responseData = (responseBody === null || responseBody === void 0 ? void 0 : responseBody.result) || {};
                            console.log('heree', responseBody);
                            if (responseData.status === '0' &&
                                responseData.description === 'SUCCESS') {
                                return resolve({
                                    success: !!'success',
                                    rawData: responseXmlText,
                                    referenceId: responseData.referenceid || '',
                                    message: responseData.message ||
                                        MoovProvider.getErrorMessage(responseData.status),
                                });
                            }
                            else if (responseData.status === '100') {
                                return resolve({
                                    success: !!'pending',
                                    rawData: responseXmlText,
                                    referenceId: '',
                                    message: responseData.message ||
                                        MoovProvider.getErrorMessage(responseData.status),
                                });
                            }
                            else {
                                return resolve({
                                    success: !'failed',
                                    rawData: responseXmlText,
                                    message: responseData.message ||
                                        MoovProvider.getErrorMessage(responseData.status),
                                });
                            }
                        }
                    });
                });
            }
            else {
                const errorData = await response.text();
                throw new Error('Failed to make checkout. Status: ' +
                    response.status +
                    '\nError Body: ' +
                    errorData);
            }
        }
        catch (error) {
            if (error.name === 'FetchError' &&
                String(error.message).includes('timeout')) {
                return {
                    success: true,
                    error: undefined,
                    rawData: 'timeout pending',
                };
            }
            else {
                return {
                    success: false,
                    error: error.message,
                    rawData: null,
                };
            }
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
            case '101':
                return 'Limite Depassé';
            case '99':
            case '-1':
                return 'Erreur de connexion à la base de données';
            case '555':
                return "Le destinataire n'est pas enregistré sur Moov Money";
            default:
                return api_manager_interface_service_1.MANAGER_INIT_UNKNOWN_MESSAGE;
        }
    }
    static async _checkTransactionById(transid) {
        try {
            const url = process.env.MOOV_BJ_WSDL_API_URL;
            const token = MoovProvider.getAuthToken();
            const xmlData = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
      <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
        <SOAP-ENV:Header/>
        <S:Body>
          <ns2:getTransactionStatus xmlns:ns2="http://api.merchant.tlc.com/">
            <token>${token}</token>
           <request>
              <transid>${transid}</transid>
           </request>
          </ns2:getTransactionStatus>
        </S:Body>
      </S:Envelope>`;
            console.log(xmlData);
            const response = await node_fetch_1.default(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/xml',
                },
                body: xmlData,
                agent: new https.Agent({
                    rejectUnauthorized: false,
                }),
                timeout: checkTimeOutMs,
            });
            if (response.ok) {
                const responseXmlText = await response.text();
                return new Promise((resolve, reject) => {
                    const parser = new xml2js.Parser({
                        explicitArray: false,
                        ignoreAttrs: true,
                    });
                    parser.parseString(responseXmlText, (err, jsonData) => {
                        var _a, _b;
                        if (err) {
                            return resolve({
                                response: err,
                            });
                        }
                        else {
                            const responseBody = (_b = (_a = jsonData === null || jsonData === void 0 ? void 0 : jsonData['soap:Envelope']) === null || _a === void 0 ? void 0 : _a['soap:Body']) === null || _b === void 0 ? void 0 : _b['ns2:getTransactionStatusResponse'];
                            return resolve(responseBody);
                        }
                    });
                });
            }
            else {
                const errorData = await response.text();
                throw new Error('Failed to check transaction status. Status: ' +
                    response.status +
                    '\nError Body: ' +
                    errorData);
            }
        }
        catch (error) {
            return {
                response: error.message,
            };
        }
    }
}
exports.MoovProvider = MoovProvider;
//# sourceMappingURL=MoovProvider.js.map