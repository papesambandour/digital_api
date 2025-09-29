export interface BictorisMerchantObject {
    name: string;
    category?: string;
    email: string;
    phone: string;
    address?: string;
    country?: string;
    locale?: string;
    website?: string;
}
export interface BictorisRepresentative {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    phone: string;
    locale?: string;
    address?: string;
    city?: string;
    country?: string;
}
export interface BictorisCreateMerchantRequest {
    merchantObject: BictorisMerchantObject;
    representative: BictorisRepresentative;
}
export interface BictorisCreateMerchantResponse {
    id: string;
    merchantId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    postalCode?: string;
    city: string;
    country: string;
    locale: string;
    createdAt: string;
    updatedAt: string;
}
export interface BictorisAccountStatus {
    id: string;
    merchantId: string;
    status: 'pending' | 'active' | 'inactive';
    updatedAt: string;
}
export interface BictorisWaveActivation {
    name: string;
    business_sector: string;
    business_type: string;
    business_description: string;
    business_registration_identifier?: string;
    website_url?: string;
}
export interface BictorisWaveActivationResponse {
    id: string;
    merchantId: string;
    psp: string;
    subMerchantId: string;
    subMerchantMcc?: string;
    createdAt: string;
    updatedAt: string;
}
export interface BictorisPublicKey {
    id: string;
    name: string;
    key: string;
    type: string;
    scope: string[];
    createdAt: string;
}
export interface BictorisChargeRequest {
    amount: number;
    currency: string;
    paymentReference: string;
    merchantReference: string;
    orderDetails?: Array<{
        name: string;
    }>;
    customerObject?: {
        name?: string;
        phone?: string;
        email?: string;
        locale?: string;
    };
    allowUpdateCustomer?: boolean;
    successRedirectUrl?: string;
    failureRedirectUrl?: string;
}
export interface BictorisChargeResponse {
    '3ds': any;
    '3ds2': any;
    transactionId: string;
    redirectUrl: string | null;
    merchantReference: string | null;
    type: string;
    link: string;
    qrCode: string;
    message: any;
    state: any;
    success?: boolean;
    id?: string;
    paymentUrl?: string;
    paymentReference?: string;
    status?: string;
}
export interface BictorisTokenResponse {
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    refresh_token: string;
    token_type: string;
    id_token?: string;
    session_state?: string;
    scope?: string;
}
export interface BictorisWebhookResponse {
    id: string;
    callbackUrl: string;
    secret: string;
    createdAt: string;
    updatedAt: string;
}
export declare class BictorisProvider {
    private baseUrl;
    private accessToken;
    private static WEBHOOK_CONFIGURED;
    constructor();
    private authenticateWithMerchantCredentials;
    createMerchant(request: BictorisCreateMerchantRequest): Promise<BictorisCreateMerchantResponse>;
    getAccountStatus(merchantId: string): Promise<BictorisAccountStatus>;
    activateMerchant(merchantId: string): Promise<void>;
    activateWaveAccount(merchantId: string, waveData: BictorisWaveActivation): Promise<BictorisWaveActivationResponse>;
    getPublicKey(merchantId: string): Promise<string>;
    createCharge(charge: BictorisChargeRequest, publicKey: string, paymentType?: string): Promise<BictorisChargeResponse>;
    configureWebhook(callbackUrl: string, secret: string, merchantEmail: string, merchantUsername: string, merchantPassword: string): Promise<BictorisWebhookResponse>;
    static resetWebhookConfiguration(): void;
}
