declare type ClientFirstMessage = {
    username: string;
    clientNonce: string;
};
declare type ServerFirstMessage = {
    serverNonce: string;
    salt: string;
    iterationCount: number;
};
declare type ClientFinalMessage = {
    clientProof: string;
};
declare type ServerFinalMessage = {
    serverSignature: string;
    success: boolean;
};
declare function sha1(input: string): string;
declare function hmac(key: string, message: string): string;
declare function pbkdf2(password: string, salt: string, iterations: number): string;
declare class ScramSha1Client {
    private username;
    private password;
    private clientNonce;
    private serverNonce;
    private salt;
    private iterations;
    private derivedKey;
    constructor(username: string, password: string, clientNonce: string);
    generateClientFirstMessage(): ClientFirstMessage;
    handleServerFirstMessage(message: ServerFirstMessage): ClientFinalMessage;
    verifyServerSignature(message: ServerFinalMessage): boolean;
}
declare class ScramSha1Server {
    private userDatabase;
    private currentUsername;
    private clientNonce;
    private serverNonce;
    private derivedKey;
    constructor(serverNonce: string);
    handleClientFirstMessage(message: ClientFirstMessage): ServerFirstMessage;
    verifyClientProof(message: ClientFinalMessage): ServerFinalMessage;
}
declare function demonstrateScramSha1(): void;
