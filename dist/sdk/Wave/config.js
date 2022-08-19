"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waveBusinessApiConfig = void 0;
const waveBusinessApiConfig = (country) => {
    if (country === 'sn') {
        return {
            sessionId: process.env.WAVE_SESSION_ID,
            walletId: process.env.WAVE_WALLET_ID,
            cashOutApiKey: process.env.WAVE_CASHOUT_API_KEY,
            phonePrefix: '+221',
        };
    }
    if (country === 'ci') {
        return {
            sessionId: process.env.WAVE_CI_SESSION_ID,
            walletId: process.env.WAVE_CI_WALLET_ID,
            cashOutApiKey: process.env.WAVE_CI_CASHOUT_API_KEY,
            phonePrefix: '+225',
        };
    }
};
exports.waveBusinessApiConfig = waveBusinessApiConfig;
//# sourceMappingURL=config.js.map