"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const whatsapp_web_js_1 = require("whatsapp-web.js");
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
            console.log('displaying qr code');
            try {
                const qrcode = require('qrcode-terminal');
            }
            catch (e) {
                console.log(e);
            }
        });
        client.on('auth_failure', (e) => {
            console.log(e);
        });
        client.on('ready', async () => {
            console.log('Client is ready!');
            try {
                WhatsAppApiProvider.isReady = false;
                const numberDetails = await client.getNumberId('221772457199');
                client.sendMessage(numberDetails._serialized, 'message');
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
    async sendMessage(tos, message, attachedMediaPath) {
        const whatsapp = await WhatsAppApiProvider.getInstance();
        if (!WhatsAppApiProvider.isReady) {
            return {
                success: false,
                message: 'not auth..ed',
            };
        }
        const p = [];
        for (const to of tos) {
            p.push(this.sendInternal(to, message, attachedMediaPath));
        }
        const result = await Promise['allSettled'](p);
        console.log(result);
        return {
            success: true,
            result,
        };
    }
    async sendInternal(recipient, message, attachedMediaPath) {
        const response = await this.client.sendMessage(recipient, message, {
            linkPreview: true,
            sendAudioAsVoice: true,
            media: attachedMediaPath
                ? await WhatsAppApiProvider.toMedia(attachedMediaPath)
                : null,
        });
        return {
            recipient: recipient,
            response,
        };
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