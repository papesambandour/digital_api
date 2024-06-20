"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hub2ApiConfig = void 0;
const process = require("process");
const hub2ApiConfig = (country) => {
    country = country === null || country === void 0 ? void 0 : country.toLowerCase();
    if (country === 'ci') {
        return {
            env: process.env.HUB_2_ENV,
            currency: 'XOF',
            merchandId: process.env.HUB_2_MERCHEND_ID,
            liveApiKey: process.env.HUB_2_LIVE_API_KEY,
            sandboxApiKey: process.env.HUB_2_SANDBOX_API_KEY,
        };
    }
    if (country === 'bf') {
        return {
            env: process.env.HUB_2_BF_ENV,
            currency: 'XOF',
            merchandId: process.env.HUB_2_BF_MERCHEND_ID,
            liveApiKey: process.env.HUB_2_BF_LIVE_API_KEY,
            sandboxApiKey: process.env.HUB_2_BF_SANDBOX_API_KEY,
        };
    }
    if (country === 'cm') {
        return {
            env: process.env.HUB_2_CM_ENV,
            currency: 'XAF',
            merchandId: process.env.HUB_2_CM_MERCHEND_ID,
            liveApiKey: process.env.HUB_2_CM_LIVE_API_KEY,
            sandboxApiKey: process.env.HUB_2_CM_SANDBOX_API_KEY,
        };
    }
};
exports.hub2ApiConfig = hub2ApiConfig;
//# sourceMappingURL=config.js.map