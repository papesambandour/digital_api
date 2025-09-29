declare type DiscordMessage = {
    message: string;
};
export default class DiscordApiProvider {
    get rest(): any;
    get client(): any;
    protected static _instance: DiscordApiProvider;
    private readonly _rest;
    private readonly _client;
    static sleep(ms: any): Promise<unknown>;
    static getInstance(): Promise<DiscordApiProvider>;
    constructor();
    static sendMessageStatic(params: DiscordMessage, channelName?: any): Promise<void>;
    sendMessage(params: DiscordMessage, channelName?: string): Promise<void>;
}
export {};
