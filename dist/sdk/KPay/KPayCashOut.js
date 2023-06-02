"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KPayCashOut = void 0;
const rp = require("request-promise");
const process = require("process");
class KPayCashOut {
    static async getToken() {
        const clientId = process.env.KPAY_CASHOUT_CLIENT_ID;
        const clientSecret = process.env.KPAY_CASHOUT_CLIENT_SECRET;
        const url = `${process.env.KPAY_CASHOUT_BASE_API_URL}/auth/token?clientId=${clientId}&clientSecret=${clientSecret}`;
        const options = {
            uri: url,
            headers: {
                Accept: 'application/json',
            },
            json: true,
        };
        return rp(options)
            .then((response) => {
            const token = response.access_token;
            console.log(response);
            return token;
        })
            .catch((error) => {
            console.error(error);
            return '';
        });
    }
    static async requestToPay(param) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const url = `${process.env.KPAY_CASHOUT_BASE_API_URL}/payment/initiate_payment`;
        const authToken = await KPayCashOut.getToken();
        const requestData = {
            merchant: {
                fullName: param.partnerName,
                phoneNumber: '',
            },
            customerPhoneNumber: `221${param.phone}`,
            amount: param.amount,
            description: param.description,
            correlationReference: param.correlationReference,
        };
        const options = {
            method: 'POST',
            uri: url,
            headers: {
                Authorization: `Bearer ${authToken}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: requestData,
            json: true,
            simple: true,
        };
        try {
            const response = await rp(options);
            console.log('resonse', response);
            response.success = response.status === 'pending';
            return response;
        }
        catch (error) {
            console.log('here', (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.cause.message);
            return {
                exception: ((_e = (_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.body) === null || _d === void 0 ? void 0 : _d.cause) === null || _e === void 0 ? void 0 : _e.message) ||
                    ((_h = (_g = (_f = error.response) === null || _f === void 0 ? void 0 : _f.body) === null || _g === void 0 ? void 0 : _g.cause) === null || _h === void 0 ? void 0 : _h.exception) ||
                    ((_k = (_j = error.response) === null || _j === void 0 ? void 0 : _j.body) === null || _k === void 0 ? void 0 : _k.message) ||
                    error.message,
            };
        }
    }
    static async confirmPaymentFunction(params) {
        var _a, _b, _c, _d, _e, _f, _g;
        const url = `${process.env.KPAY_CASHOUT_BASE_API_URL}/payment/confirm_payment`;
        const authToken = 'Bearer ' + (await KPayCashOut.getToken());
        const requestData = {
            otp: params.meta.otp,
            kpayReference: params.transaction.sousServiceTransactionId,
            customerPhoneNumber: `221${params.transaction.phone}`,
        };
        const options = {
            method: 'POST',
            uri: url,
            headers: {
                Authorization: authToken,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: requestData,
            json: true,
            simple: true,
        };
        try {
            const response = await rp(options);
            response.success = response.status === 'succeeded';
            return response;
        }
        catch (error) {
            return {
                message: ((_c = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.cause) === null || _c === void 0 ? void 0 : _c.message) ||
                    ((_e = (_d = error.response) === null || _d === void 0 ? void 0 : _d.body) === null || _e === void 0 ? void 0 : _e.exception) ||
                    ((_g = (_f = error.response) === null || _f === void 0 ? void 0 : _f.body) === null || _g === void 0 ? void 0 : _g.message) ||
                    error.message,
            };
        }
    }
    static async getBalance() {
        var _a, _b, _c, _d, _e, _f, _g;
        const url = `${process.env.KPAY_CASHOUT_BASE_API_URL}/info/balance`;
        const authToken = 'Bearer ' + (await KPayCashOut.getToken());
        const options = {
            method: 'GET',
            uri: url,
            headers: {
                Authorization: authToken,
                Accept: 'application/json',
            },
            json: true,
            simple: true,
        };
        try {
            const response = await rp(options);
            console.log(response);
            const totalBalance = response.reduce((acc, item) => {
                const balanceStr = item.amount.replace(/\D/g, '');
                const balance = Number(balanceStr.replace(',', '')) / 100;
                return acc + balance;
            }, 0);
            console.log('total', totalBalance);
            return { success: true, newBalance: totalBalance };
        }
        catch (error) {
            const errorMessage = ((_c = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.cause) === null || _c === void 0 ? void 0 : _c.message) ||
                ((_e = (_d = error.response) === null || _d === void 0 ? void 0 : _d.body) === null || _e === void 0 ? void 0 : _e.exception) ||
                ((_g = (_f = error.response) === null || _f === void 0 ? void 0 : _f.body) === null || _g === void 0 ? void 0 : _g.message) ||
                error.message;
            console.log(errorMessage);
            return {
                success: false,
                newBalance: null,
            };
        }
    }
}
exports.KPayCashOut = KPayCashOut;
//# sourceMappingURL=KPayCashOut.js.map