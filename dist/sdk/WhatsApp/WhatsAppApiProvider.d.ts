import { Client } from 'whatsapp-web.js';
export default class WhatsAppApiProvider {
    private static initiated;
    private static isReady;
    private static initing;
    get client(): Client;
    private static _instance;
    private _client;
    static getInstance(): Promise<WhatsAppApiProvider>;
    private constructor();
    private initEvent;
    static sendMessageToOne(recipient: string, message: string, attachedMediaPath: string): Promise<any>;
    private static toMedia;
    private static initClient;
}
