"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord2 = require('discord.js');
const config_1 = require("./config");
class DiscordApiProvider {
    constructor() {
        this._rest = new Discord2.REST({ version: '10' }).setToken(config_1.discordApiConfig().token);
        this._client = new Discord2.Client({
            intents: [Discord2.GatewayIntentBits.Guilds],
        });
        this._client.once('ready', () => {
            console.log('Discord client Ready!');
        });
    }
    get rest() {
        return this._rest;
    }
    get client() {
        return this._client;
    }
    static sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    static async getInstance() {
        if (!DiscordApiProvider._instance) {
            const i = new DiscordApiProvider();
            await i.client.login(config_1.discordApiConfig().token);
            DiscordApiProvider._instance = i;
            await this.sleep(2000);
        }
        console.log('Discord connected');
        return DiscordApiProvider._instance;
    }
    static async sendMessageStatic(params, channelName = config_1.discordApiConfig().alertChannelName) {
        const discord = await DiscordApiProvider.getInstance();
        return await discord.sendMessage(params, channelName);
    }
    async sendMessage(params, channelName = config_1.discordApiConfig().alertChannelName) {
        var _a, _b;
        console.log('sending message', channelName);
        const channel = (_b = (_a = this.client.channels) === null || _a === void 0 ? void 0 : _a.cache) === null || _b === void 0 ? void 0 : _b.find((channel) => channel.name === channelName);
        if (channel && channel.isTextBased) {
            await channel.send({
                content: params.message,
            });
            console.log('message send successfully');
        }
        else {
            console.log('no channel');
        }
    }
}
exports.default = DiscordApiProvider;
//# sourceMappingURL=DiscordApiProvider.js.map