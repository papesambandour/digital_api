"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const whatsapp_web_js_1 = require("whatsapp-web.js");
const DiscordApiProvider_1 = require("../Discord/DiscordApiProvider");
class WhatsAppApiProvider {
    constructor(config) {
        console.log(config.dataPath);
        this.initEvent().then();
    }
    get client() {
        return this._client;
    }
    static async getInstance() {
        if (!WhatsAppApiProvider._instance) {
            WhatsAppApiProvider._instance = new WhatsAppApiProvider(config_1.whatsAppApiConfig());
        }
        if (!WhatsAppApiProvider.initiated) {
            await WhatsAppApiProvider.initClient(WhatsAppApiProvider._instance.client);
        }
        return WhatsAppApiProvider._instance;
    }
    async initEvent() {
        const client = (this._client = new whatsapp_web_js_1.Client({
            restartOnAuthFail: true,
            takeoverOnConflict: true,
            authStrategy: new whatsapp_web_js_1.LocalAuth({
                dataPath: `${process.env.WHATSAPP_DATA_PATH}`,
                clientId: 'v2',
            }),
            puppeteer: {
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    '--disable-gpu',
                    '--unhandled-rejections=strict',
                ],
            },
        }));
        client.on('qr', (qr) => {
            console.log('QR RECEIVED', qr);
            if (process.env.MODE === 'production') {
                DiscordApiProvider_1.default.sendMessageStatic({
                    message: `Nouveau qrCode pour whatsapp: \n${qr}`,
                });
            }
            try {
                const qrcode = require('qrcode-terminal');
                qrcode.generate(qrcode, { small: true });
            }
            catch (e) {
                console.log(e);
            }
        });
        client.on('auth_failure', (e) => {
            console.log(e);
        });
        client.on('ready', async () => {
            console.log('Whatsapp Client is ready!');
            try {
                WhatsAppApiProvider.isReady = true;
            }
            catch (e) {
                console.log(e);
            }
        });
        client.on('disconnected', () => {
            console.log('disconnected');
        });
        client.on('message', (msg) => {
            if (msg.body == '!ping') {
                msg.reply('pong');
            }
        });
        await WhatsAppApiProvider.initClient(client);
    }
    static async sendMessageToOne(recipient, message, attachedMediaPath) {
        if (!WhatsAppApiProvider.isReady) {
            return {
                success: false,
                message: `Service n'a pas encore finis sont initialisation`,
                whatsappNumberId: null,
            };
        }
        const instance = await WhatsAppApiProvider.getInstance();
        const client = instance.client;
        console.log(recipient, message, attachedMediaPath);
        const numberDetails = await client.getNumberId(recipient.replace('+', '').replace(/\s/g, ''));
        if (numberDetails === null || numberDetails === void 0 ? void 0 : numberDetails._serialized) {
            const response = await client.sendMessage(numberDetails === null || numberDetails === void 0 ? void 0 : numberDetails._serialized, message, {
                linkPreview: true,
                sendAudioAsVoice: true,
                media: attachedMediaPath
                    ? await WhatsAppApiProvider.toMedia(attachedMediaPath)
                    : undefined,
            });
            console.log('got response');
            return {
                success: true,
                recipient: recipient,
                whatsappNumberId: numberDetails === null || numberDetails === void 0 ? void 0 : numberDetails._serialized,
                message: `Le message a bien été envoyé a ${numberDetails === null || numberDetails === void 0 ? void 0 : numberDetails._serialized} (${recipient})`,
            };
        }
        else {
            return {
                success: false,
                message: 'Le numero whatsapp est introuvable',
                whatsappNumberId: null,
            };
        }
    }
    static async toMedia(mediaPath) {
        return whatsapp_web_js_1.MessageMedia.fromFilePath(mediaPath);
    }
    static async initClient(client) {
        if (!WhatsAppApiProvider.initing) {
            WhatsAppApiProvider.initing = true;
            console.log('start init');
            await client.initialize();
            WhatsAppApiProvider.initiated = true;
            console.log('finish intiatilization');
        }
    }
}
exports.default = WhatsAppApiProvider;
WhatsAppApiProvider._instance = null;
//# sourceMappingURL=WhatsAppApiProvider.js.map