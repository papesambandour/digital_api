"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waveBusinessApiConfig = void 0;
const waveBusinessApiConfig = () => {
    return {
        sessionId: process.env.WAVE_SESSION_ID,
        walletId: process.env.WAVE_WALLET_ID,
        cashOutApiKey: process.env.WAVE_CASHOUT_API_KEY,
    };
};
exports.waveBusinessApiConfig = waveBusinessApiConfig;
//# sourceMappingURL=config.js.map