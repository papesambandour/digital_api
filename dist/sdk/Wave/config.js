"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waveBusinessApiConfig = void 0;
const AppSettings_entity_1 = require("../../Models/Entities/AppSettings.entity");
const waveBusinessApiConfig = (country) => {
    if (country === 'sn') {
        return {
            sessionId: async () => {
                const setting = await AppSettings_entity_1.AppSettings.findOne({
                    where: {
                        name: AppSettings_entity_1.WAVE_SESSION_ID,
                    },
                });
                return setting === null || setting === void 0 ? void 0 : setting.value;
            },
            walletId: process.env.WAVE_WALLET_ID,
            cashOutApiKey: process.env.WAVE_CASHOUT_API_KEY,
            cashInApiKey: process.env.WAVE_CASHOUT_API_KEY,
        };
    }
    if (country === 'ci') {
        return {
            sessionId: async () => {
                const setting = await AppSettings_entity_1.AppSettings.findOne({
                    where: {
                        name: AppSettings_entity_1.WAVE_CI_SESSION_ID,
                    },
                });
                return setting === null || setting === void 0 ? void 0 : setting.value;
            },
            walletId: process.env.WAVE_CI_WALLET_ID,
            cashOutApiKey: process.env.WAVE_CI_CASHOUT_API_KEY,
            cashInApiKey: process.env.WAVE_CI_CASHOUT_API_KEY,
        };
    }
};
exports.waveBusinessApiConfig = waveBusinessApiConfig;
//# sourceMappingURL=config.js.map