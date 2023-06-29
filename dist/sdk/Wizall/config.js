"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wizallApiConfig = void 0;
const wizallApiConfig = (type) => {
    if (type === 'bill') {
        return {
            wizallLogin: process.env.WIZALL_BILL_LOGIN,
            wizallPassword: process.env.WIZALL_BILL_PASSWORD,
            wizallClientId: process.env.WIZALL_BILL_CLIENT_ID,
            wizallClientSecret: process.env.WIZALL_BILL_CLIENT_SECRET,
            wizallUrl: process.env.WIZALL_BILL_URL,
            isBill: true,
        };
    }
    else if (type === 'payment') {
        return {
            wizallLogin: process.env.WIZALL_LOGIN,
            wizallPassword: process.env.WIZALL_PASSWORD,
            wizallClientId: process.env.WIZALL_CLIENT_ID,
            wizallClientSecret: process.env.WIZALL_CLIENT_SECRET,
            wizallUrl: process.env.WIZALL_URL,
            isBill: false,
            wizallAgentPhoneNumber: process.env.WIZALL_AGENT_PHONE_NUMBER,
            wizallAgentPin: process.env.WIZALL_AGENT_PIN_CODE,
            wizallPartnerId: process.env.WIZALL_AGENT_PARTNER_ID,
        };
    }
};
exports.wizallApiConfig = wizallApiConfig;
//# sourceMappingURL=config.js.map