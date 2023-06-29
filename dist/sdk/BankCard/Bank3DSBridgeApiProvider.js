"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rp = require("request-promise");
class Bank3DSBridgeApiProvider {
    static async initTransaction({ amountXOF, firstName, lastName, bankRefCommand, cardNumber, cardExpireMonth, cardExpireYear, cardCVC, cardType, bankAuthRedirectUrl, phoneNumber, clientEmail, merchantName, merchantCat1Code, bankProvider, bankArea, }) {
        const paymentResponse = {};
        const params = {
            amount: amountXOF,
            redirectUrl: bankAuthRedirectUrl,
            clientFirstName: firstName,
            clientLastName: lastName,
            clientPhoneNumber: phoneNumber,
            clientEmail: clientEmail,
            orderId: bankRefCommand,
            card: {
                number: cardNumber,
                exp_month: cardExpireMonth,
                exp_year: cardExpireYear,
                cvc: cardCVC,
                card_type: cardType,
                card_holder_name: `${firstName} ${lastName}`,
            },
            merchantName: merchantName,
            categoryCode: merchantCat1Code || '7372',
            meta: {
                bankProvider: bankProvider || '',
                bankArea: bankArea || '',
            },
        };
        console.log(params, process.env.INTECH_SECURE_3DS_ACCESS_TOKEN);
        try {
            const paymentResponse = await rp({
                url: 'https://secure-3ds.intech.sn/api/getPaymentUrl',
                method: 'POST',
                rejectUnauthorized: false,
                body: params,
                json: true,
                simple: true,
                headers: {
                    APP_ACCESS_TOKEN: process.env.INTECH_SECURE_3DS_ACCESS_TOKEN,
                },
            });
            if (paymentResponse === null || paymentResponse === void 0 ? void 0 : paymentResponse.success) {
                return {
                    success: true,
                    message: (paymentResponse || {})['message_fr'],
                    step: 1,
                    paymentResponse,
                    url: paymentResponse.url,
                };
            }
            else {
                return {
                    success: false,
                    message: (paymentResponse || {})['message_fr'],
                    step: 1,
                };
            }
        }
        catch (e) {
            return {
                success: false,
                message: (paymentResponse || {})['message_fr'] || e.message,
                step: 1,
            };
        }
    }
    static getOrderIdFromTransaction(id) {
        return `INTECHV2-BK-${id}`;
    }
    static async checkTransaction(params) {
        var _a, _b;
        let checkResponse = {};
        const _params = {
            PaRes: (_a = params.meta) === null || _a === void 0 ? void 0 : _a.paRes,
            orderId: (_b = params.meta) === null || _b === void 0 ? void 0 : _b.orderId,
        };
        try {
            checkResponse = await rp({
                url: 'https://secure-3ds.intech.sn/api/checkPaymentResponse',
                method: 'POST',
                rejectUnauthorized: false,
                body: _params,
                json: true,
                simple: true,
                headers: {
                    APP_ACCESS_TOKEN: process.env.INTECH_SECURE_3DS_ACCESS_TOKEN,
                },
            });
            if (checkResponse === null || checkResponse === void 0 ? void 0 : checkResponse.success) {
                return {
                    success: true,
                    message: (checkResponse || {})['message_fr'],
                    step: 1,
                    checkResponse,
                };
            }
            else {
                return {
                    success: false,
                    message: (checkResponse || {})['message_fr'],
                    step: 1,
                    checkResponse,
                };
            }
        }
        catch (e) {
            return {
                success: false,
                message: (checkResponse || {})['message_fr'] || e.message,
                step: 1,
                checkResponse,
            };
        }
    }
}
exports.default = Bank3DSBridgeApiProvider;
//# sourceMappingURL=Bank3DSBridgeApiProvider.js.map