export declare class MoneyGramSignatureVerifier {
    private static readonly SANDBOX_PUBLIC_KEY;
    private static readonly PRODUCTION_PUBLIC_KEY;
    static parseSignatureHeader(signatureHeader: string): {
        timestamp: number;
        signature: string;
    } | null;
    static verifySignature(signatureHeader: string, destinationHost: string, body: string, mode: 'sandbox' | 'production'): {
        isValid: boolean;
        error?: string;
    };
    static getProductionIPs(): string[];
    static getSandboxIPs(): string[];
    static getMoneyGramIPs(mode: 'sandbox' | 'production'): string[];
}
