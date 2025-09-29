"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omApiConfig = void 0;
const omApiConfig = () => {
    return {
        distributorPhoneNumber: process.env.OM_DISTRIBUTOR_PHONE_NUMBER,
        distributorPinPhoneNumber: process.env.OM_DISTRIBUTOR_PIN_PHONE_NUMBER,
        clientId: process.env.OM_CLIENT_ID,
        clientSecret: process.env.OM_CLIENT_SECRET,
        receiveNotification: process.env.OM_RECEIVE_NOTIFICATION === 'true',
        merchantCode: process.env.OM_MERCHANT_CODE,
    };
};
exports.omApiConfig = omApiConfig;
//# sourceMappingURL=config.js.map