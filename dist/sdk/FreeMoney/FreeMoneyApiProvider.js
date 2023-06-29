"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const rp = require("request-promise");
class FreeMoneyApiProvider {
    static async getBalance(params) {
        try {
            const url = `https://gateway.free.sn/services/freemoney/balance?msisdn=${process_1.default.env.FREE_MSISDN_NUMBER}&pin=${process_1.default.env.FREE_MSISDN_PASSWORD}`;
            const postOption = {
                uri: url,
                method: 'GET',
                qs: {
                    msisdn: process_1.default.env.FREE_MSISDN_NUMBER,
                    pin: process_1.default.env.FREE_MSISDN_NUMBER,
                },
                json: true,
                simple: true,
            };
            const apiResponse = await rp(postOption);
            console.log('FreeGetBalance', apiResponse);
            if (Number(apiResponse.balance)) {
                return Promise.resolve({
                    success: true,
                    newBalance: Number(apiResponse.balance),
                });
            }
            else {
                return Promise.resolve({
                    success: false,
                    newBalance: null,
                });
            }
        }
        catch (e) {
            console.log(e, e.stack);
            return Promise.resolve({
                success: false,
                newBalance: null,
            });
        }
    }
}
exports.default = FreeMoneyApiProvider;
//# sourceMappingURL=FreeMoneyApiProvider.js.map