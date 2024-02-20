"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rp = require("request-promise");
const main_1 = require("../../main");
class Hub2Provider {
    static async sendTransfer({ amount, msisdn, reference, meta, overrideBusinessName, }) {
        const apiUrl = 'https://api.hub2.io/transfers';
        const merchantId = process.env.HUB_2_MERCHEND_ID;
        const environment = process.env.HUB_2_ENV;
        const apiKey = environment === 'sandbox'
            ? process.env.HUB_2_SANDBOX_API_KEY
            : process.env.HUB_2_LIVE_API_KEY;
        const requestOptions = {
            method: 'POST',
            uri: apiUrl,
            headers: {
                ApiKey: apiKey,
                MerchantId: merchantId,
                Environment: environment,
                'Content-Type': 'application/json',
            },
            body: {
                reference: reference,
                amount: 0,
                currency: 'XOF',
                description: '',
                destination: {
                    type: meta.type,
                    country: meta.country,
                    recipientName: '',
                    msisdn: environment === 'sandbox' ? '00000001' : msisdn,
                    provider: meta.provider,
                },
                overrideBusinessName: overrideBusinessName,
            },
            json: true,
            simple: false,
        };
        console.log(requestOptions);
        try {
            const response = await rp(requestOptions);
            console.log(response);
            return {
                success: (response === null || response === void 0 ? void 0 : response.status) === 'created',
                externalReference: response === null || response === void 0 ? void 0 : response.id,
                apiResponse: response,
                errorMessage: (response === null || response === void 0 ? void 0 : response.status) === 'created'
                    ? null
                    : Hub2Provider.getMessageFromResponse(response),
            };
        }
        catch (error) {
            console.log(error);
            return {
                success: false,
                errorMessage: Hub2Provider.getMessageFromResponse(error.message || ''),
            };
        }
    }
    static getMessageFromResponse(apiResponse) {
        const serialized = main_1.serializeData(apiResponse);
        if (serialized.includes('internal_error')) {
            return 'Le transfert a échoué, une erreur interne est survenue. Notre service technique est au courant et travaille à sa résolution.';
        }
        else if (serialized.includes('customer_insufficient_funds')) {
            return 'Le paiement a échoué. Le client ne dispose pas de suffisamment de fonds.';
        }
        else if (serialized.includes('unknown_reason_orange')) {
            return 'Le paiement a échoué, aucune raison n’a été fournie par orange..';
        }
        else if (serialized.includes('customer_account_locked')) {
            return 'Votre compte est bloqué par l’opérateur.';
        }
        else if (serialized.includes('authentication_failed')) {
            return 'La validation du paiement par la client a échoué, le paiement a été annulé.';
        }
        else if (serialized.includes('authentication_timeout')) {
            return 'Le délai d’attente pour la validation du paiement est dépassé, le paiement a été annulé.';
        }
        else if (serialized.includes('bad_parameters')) {
            return 'Le paiement a échoué à cause de paramètres incorrects.';
        }
        else if (serialized.includes('forbidden_by_provider')) {
            return 'Le paiement a été refusé par l’opérateur..';
        }
        else if (serialized.includes('invalid_amount')) {
            return 'Le transfert a échoué, le montant sélectionné est invalide.';
        }
        else if (serialized.includes('service_unavailable')) {
            return 'Le transfert a échoué, l’opérateur est actuellement indisponible.';
        }
        else if (serialized.includes('too_many_request')) {
            return 'Le transfert a échoué. L’opérateur reçoit trop de requêtes. Veuillez réessayer plus tard.';
        }
        else if (serialized.includes('unknown_reason')) {
            return 'Le transfert a échoué et aucune raison précise ne peut être fournie par l’opérateur.';
        }
        else if (serialized.includes('fraud_suspicion')) {
            return 'Le transfert a échoué, l’opérateur a détecté une tentative de fraude.';
        }
        else if (serialized.includes('invalid_destination')) {
            return 'Le transfert a échoué, le destinataire est invalide.';
        }
        else if (serialized.includes('forbidden_by_provider')) {
            return 'Le transfert a échoué car il a été refusé par l’opérateur.';
        }
        else if (serialized.includes('invalid_sandbox_msisdn')) {
            return 'Les MSISDN rééls ne peuvent pas être utilisés en mode Sandbox. Veuillez utiliser un MSISDN de test';
        }
        else if (serialized.includes('timeout')) {
            return 'Le transfert a échoué. L’opérateur n’a pas répondu dans le délai d’attente imparti.';
        }
        else if (serialized.includes('insufficient_funds')) {
            return 'La transfert a échoué pour cause de fonds insuffisants.';
        }
        else if (serialized.includes('unsupported_currency')) {
            return 'Le transfert a échoué, cette devise n’est pas supportée.';
        }
        else if (serialized.includes('canceled')) {
            return 'Le transfert a été annulé par l’opérateur.';
        }
        else if (serialized.includes('destination_not_allowed')) {
            return 'Le transfert a échoué, l’envoi vers ce destinataire est refusé par l’opérateur.';
        }
        else if (serialized.includes('blacklisted_msisdn')) {
            return 'Le transfert a échoué car le MSISDN fourni est temporairement banni.';
        }
        else if (serialized.includes('invalid_payment_processor')) {
            return 'L’opérateur sélectionné ne permet pas d’effectuer cette opération.';
        }
        else if (serialized.includes('duplicate_request')) {
            return 'Le transfert a échoué. Une opération similaire vient d’être enregistrée. Veuillez réessayer plus tard.';
        }
        else if (serialized.includes('bad_request')) {
            return 'Le transfert a échoué. La requête reçue contient des erreurs ou est mal formattée.';
        }
        else {
            return 'Le transfert a échoué, une erreur interne est survenue. Notre service technique est au courant et travaille à sa résolution.';
        }
    }
    static async apiManagerGetBalance(params) {
        const apiUrl = 'https://api.hub2.io/balance';
        const merchantId = process.env.HUB_2_MERCHEND_ID;
        const environment = process.env.HUB_2_ENV;
        const apiKey = environment === 'sandbox'
            ? process.env.HUB_2_SANDBOX_API_KEY
            : process.env.HUB_2_LIVE_API_KEY;
        const currency = 'XOF';
        const requestOptions = {
            method: 'GET',
            uri: `${apiUrl}?currency=${currency}`,
            headers: {
                ApiKey: apiKey,
                MerchantId: merchantId,
                Environment: environment,
            },
            json: true,
        };
        try {
            const response = await rp(requestOptions);
            return {
                success: true,
                newBalance: response.transferAccount[0].availableBalance +
                    response.collectionAccount[0].availableBalance,
            };
        }
        catch (error) {
            console.error('Error occurred:', error);
            return {
                success: false,
                newBalance: null,
            };
        }
    }
    static async initPayment({ amount, msisdn, reference, meta, overrideBusinessName, }) {
        var _a, _b;
        const paymentIntentUrl = 'https://api.hub2.io/payment-intents';
        const merchantId = process.env.HUB_2_MERCHEND_ID;
        const environment = process.env.HUB_2_ENV;
        const apiKey = environment === 'sandbox'
            ? process.env.HUB_2_SANDBOX_API_KEY
            : process.env.HUB_2_LIVE_API_KEY;
        try {
            const paymentIntentRequestBody = {
                customerReference: `${meta.type}-${meta.country}-${msisdn}`,
                purchaseReference: reference,
                amount: amount,
                currency: 'XOF',
            };
            const paymentIntentRequestOptions = {
                method: 'POST',
                uri: paymentIntentUrl,
                headers: {
                    ApiKey: apiKey,
                    MerchantId: merchantId,
                    Environment: environment,
                    'Content-Type': 'application/json',
                },
                body: paymentIntentRequestBody,
                json: true,
                simple: false,
            };
            const paymentIntentResponse = await rp(paymentIntentRequestOptions);
            const paymentUrl = `https://api.hub2.io/payment-intents/${paymentIntentResponse.id}/payments`;
            const paymentRequestBody = {
                token: paymentIntentResponse.token,
                paymentMethod: meta.type,
                country: meta.country,
                provider: meta.provider,
                mobileMoney: {
                    msisdn: environment === 'sandbox' ? '00000001' : msisdn,
                },
            };
            const paymentRequestOptions = {
                method: 'POST',
                uri: paymentUrl,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: paymentRequestBody,
                json: true,
                simple: false,
            };
            const paymentResponse = await rp(paymentRequestOptions);
            console.log(paymentResponse);
            return {
                success: (paymentResponse === null || paymentResponse === void 0 ? void 0 : paymentResponse.status) === 'processing',
                externalReference: (paymentResponse === null || paymentResponse === void 0 ? void 0 : paymentResponse.id) + ';' + ((_b = (_a = paymentResponse === null || paymentResponse === void 0 ? void 0 : paymentResponse.payments) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.id),
                apiResponse: paymentResponse,
                errorMessage: (paymentResponse === null || paymentResponse === void 0 ? void 0 : paymentResponse.status) === 'processing'
                    ? null
                    : Hub2Provider.getMessageFromResponse(paymentResponse),
            };
        }
        catch (error) {
            console.error('Error occurred:', error);
            return {
                success: false,
                errorMessage: Hub2Provider.getMessageFromResponse(error.message || ''),
            };
        }
    }
}
exports.default = Hub2Provider;
//# sourceMappingURL=Hub2Provider.js.map