"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discordApiConfig = void 0;
const discordApiConfig = () => {
    return {
        token: process.env.DISCORD_BOT_TOKEN,
        alertChannelName: process.env.DISCORD_ALERT_CHANEL_ID,
        pendingAfterDelayChannelName: process.env.DISCORD_ALERT_CHANEL_PENDING_AFTER_DELAY,
        mismatchMessageAlertChanelName: process.env.DISCORD_ALERT_CHANEL_MISMATCH_MESSAGE,
    };
};
exports.discordApiConfig = discordApiConfig;
//# sourceMappingURL=config.js.map