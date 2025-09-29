"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var BictorisProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BictorisProvider = void 0;
const axios_1 = require("axios");
const common_1 = require("@nestjs/common");
const process = require("process");
let BictorisProvider = BictorisProvider_1 = class BictorisProvider {
    constructor() {
        console.log('🚨 [BICTORIS] Environment variables check:');
        console.log('BICTORIS_BASE_URL =', process.env.BICTORIS_BASE_URL);
        console.log('BICTORIS_API_KEY =', process.env.BICTORIS_API_KEY ? 'SET' : 'NOT_SET');
        const baseDomain = process.env.BICTORIS_BASE_URL;
        if (!baseDomain) {
            console.error('❌ [BICTORIS] CRITICAL: BICTORIS_BASE_URL not found in environment!');
            throw new Error('BICTORIS_BASE_URL environment variable is required');
        }
        const apiKey = process.env.BICTORIS_API_KEY;
        if (!apiKey) {
            console.error('❌ [BICTORIS] CRITICAL: BICTORIS_API_KEY not found in environment!');
            throw new Error('BICTORIS_API_KEY environment variable is required');
        }
        console.log('✅ [BICTORIS] Using base domain:', baseDomain);
        this.baseUrl = `https://api.${baseDomain}`;
        this.accessToken = apiKey;
        console.log('🔗 [BICTORIS] Provider initialized with static API key:', {
            baseUrl: this.baseUrl,
            apiKeySet: !!this.accessToken,
        });
    }
    async authenticateWithMerchantCredentials(email, password) {
        var _a, _b, _c;
        try {
            const baseUrl = process.env.BICTORIS_BASE_URL;
            const authUrl = `https://auth.${baseUrl}`;
            console.log('🔐 [BICTORIS] Authenticating merchant for webhook...', {
                authUrl,
                email,
                fullAuthEndpoint: `${authUrl}/realms/bictorys/protocol/openid-connect/token`,
            });
            const params = new URLSearchParams();
            params.append('username', email);
            params.append('password', password);
            params.append('grant_type', 'password');
            params.append('client_id', 'mobile');
            params.append('scope', 'profile email phone offline_access');
            console.log('🔧 [BICTORIS] OAuth authentication request details:', {
                url: '/realms/bictorys/protocol/openid-connect/token',
                fullUrl: `${authUrl}/realms/bictorys/protocol/openid-connect/token`,
                contentType: 'application/x-www-form-urlencoded',
                body: {
                    username: email,
                    password: '[REDACTED]',
                    grant_type: 'password',
                    client_id: 'mobile',
                    scope: 'profile email phone offline_access',
                },
            });
            const response = await axios_1.default
                .create({
                baseURL: authUrl,
                timeout: 30000,
            })
                .post('/realms/bictorys/protocol/openid-connect/token', params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            if ((_a = response.data) === null || _a === void 0 ? void 0 : _a.access_token) {
                console.log('✅ [BICTORIS] Merchant authentication successful for webhook');
                console.log('🔍 [BICTORIS] Generated token for debugging:', response.data.access_token.substring(0, 50) + '...[TRUNCATED]');
                console.log('🔍 [BICTORIS] Token type:', response.data.token_type);
                console.log('🔍 [BICTORIS] Expires in:', response.data.expires_in);
                console.log('🔍 [BICTORIS] Scope received:', response.data.scope);
                return response.data.access_token;
            }
            else {
                throw new Error('No access token received for merchant');
            }
        }
        catch (error) {
            console.error('💥 [BICTORIS] Merchant authentication failed:', {
                status: (_b = error.response) === null || _b === void 0 ? void 0 : _b.status,
                data: (_c = error.response) === null || _c === void 0 ? void 0 : _c.data,
                message: error.message,
            });
            throw new Error(`Merchant authentication failed: ${error.message}`);
        }
    }
    async createMerchant(request) {
        var _a, _b, _c, _d;
        const url = '/onboarding/v1/merchants?skip_otp=true';
        console.log('🔧 [BICTORIS] createMerchant REQUEST:', {
            method: 'POST',
            url: url,
            fullUrl: `${this.baseUrl}${url}`,
            body: request,
        });
        console.log('🔧 [BICTORIS] createMerchant REQUEST BODY (JSON):', JSON.stringify(request, null, 2));
        try {
            const response = await axios_1.default
                .create({ baseURL: this.baseUrl, timeout: 30000 })
                .post(url, request, {
                headers: {
                    'X-Api-Key': this.accessToken,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            console.log('✅ [BICTORIS] createMerchant SUCCESS:', {
                merchantId: response.data.merchantId,
                email: response.data.email,
            });
            console.log('🔍 [BICTORIS] Full createMerchant response data:', response.data);
            if (!((_a = response.data) === null || _a === void 0 ? void 0 : _a.merchantId)) {
                throw new Error('Failed to create merchant - no merchantId returned');
            }
            return response.data;
        }
        catch (error) {
            console.error('💥 [BICTORIS] createMerchant ERROR:', {
                status: (_b = error.response) === null || _b === void 0 ? void 0 : _b.status,
                statusText: (_c = error.response) === null || _c === void 0 ? void 0 : _c.statusText,
                data: (_d = error.response) === null || _d === void 0 ? void 0 : _d.data,
                url: url,
                body: request,
            });
            throw new Error(`Failed to create merchant: ${error.message}`);
        }
    }
    async getAccountStatus(merchantId) {
        var _a, _b, _c;
        const url = `/authz/v1/account-status?merchant_id=${merchantId}`;
        console.log('🔧 [BICTORIS] getAccountStatus REQUEST:', {
            method: 'GET',
            url: url,
            fullUrl: `${this.baseUrl}${url}`,
            merchantId: merchantId,
        });
        try {
            const response = await axios_1.default
                .create({ baseURL: this.baseUrl, timeout: 30000 })
                .get(url, {
                headers: {
                    'X-Api-Key': this.accessToken,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            console.log('✅ [BICTORIS] getAccountStatus SUCCESS:', response.data);
            return response.data;
        }
        catch (error) {
            console.error('💥 [BICTORIS] getAccountStatus ERROR:', {
                status: (_a = error.response) === null || _a === void 0 ? void 0 : _a.status,
                statusText: (_b = error.response) === null || _b === void 0 ? void 0 : _b.statusText,
                data: (_c = error.response) === null || _c === void 0 ? void 0 : _c.data,
                url: url,
                merchantId: merchantId,
            });
            throw new Error(`Failed to get account status: ${error.message}`);
        }
    }
    async activateMerchant(merchantId) {
        var _a, _b, _c, _d;
        console.log('🔍 [BICTORIS] Getting account status to retrieve status ID for activation...');
        const accountStatus = await this.getAccountStatus(merchantId);
        const url = `/authz/v1/account-status/${accountStatus.id}`;
        const body = { status: 'active' };
        const headers = {
            'X-Api-Key': this.accessToken,
            'Content-Type': 'application/json',
        };
        console.log('🔧 [BICTORIS] activateMerchant REQUEST:', {
            method: 'PUT',
            url: url,
            fullUrl: `${this.baseUrl}${url}`,
            body: body,
            headers: headers,
            merchantId: merchantId,
            accountStatusId: accountStatus.id,
            currentStatus: accountStatus.status,
            authMethod: 'X-Api-Key (JWT token)',
            note: 'Using account status ID instead of merchant ID in URL',
        });
        console.log('🔧 [BICTORIS] activateMerchant REQUEST BODY (JSON):', JSON.stringify(body, null, 2));
        try {
            const response = await axios_1.default
                .create({ baseURL: this.baseUrl, timeout: 30000 })
                .put(url, body, {
                headers: headers,
            });
            console.log('✅ [BICTORIS] activateMerchant SUCCESS:', {
                status: response.status,
                data: response.data || 'Empty response (expected for activation)',
                accountStatusId: accountStatus.id,
                merchantId: merchantId,
            });
        }
        catch (error) {
            console.error('💥 [BICTORIS] activateMerchant ERROR:', {
                status: (_a = error.response) === null || _a === void 0 ? void 0 : _a.status,
                statusText: (_b = error.response) === null || _b === void 0 ? void 0 : _b.statusText,
                data: (_c = error.response) === null || _c === void 0 ? void 0 : _c.data,
                headers: (_d = error.response) === null || _d === void 0 ? void 0 : _d.headers,
                url: url,
                body: body,
                accountStatusId: accountStatus.id,
                merchantId: merchantId,
                authMethod: 'X-Api-Key',
                note: 'Error occurred while using account status ID in URL',
            });
            throw new Error(`Failed to activate merchant: ${error.message}`);
        }
    }
    async activateWaveAccount(merchantId, waveData) {
        var _a, _b, _c, _d;
        const url = `/onboarding/v1/merchant-psp-identifiers/wave?merchant_id=${merchantId}`;
        console.log('🔧 [BICTORIS] activateWaveAccount REQUEST:', {
            method: 'POST',
            url: url,
            fullUrl: `${this.baseUrl}${url}`,
            merchantId: merchantId,
            body: waveData,
            authMethod: 'X-Api-Key (JWT token)',
        });
        console.log('🔧 [BICTORIS] activateWaveAccount REQUEST BODY (JSON):', JSON.stringify(waveData, null, 2));
        try {
            const response = await axios_1.default
                .create({ baseURL: this.baseUrl, timeout: 30000 })
                .post(url, waveData, {
                headers: {
                    'X-Api-Key': this.accessToken,
                    'Content-Type': 'application/json',
                },
            });
            console.log('✅ [BICTORIS] activateWaveAccount SUCCESS:', response.data);
            return response.data;
        }
        catch (error) {
            console.error('💥 [BICTORIS] activateWaveAccount ERROR:', {
                status: (_a = error.response) === null || _a === void 0 ? void 0 : _a.status,
                statusText: (_b = error.response) === null || _b === void 0 ? void 0 : _b.statusText,
                data: (_c = error.response) === null || _c === void 0 ? void 0 : _c.data,
                headers: (_d = error.response) === null || _d === void 0 ? void 0 : _d.headers,
                url: url,
                merchantId: merchantId,
                body: waveData,
                authMethod: 'X-Api-Key',
            });
            throw new Error(`Failed to activate Wave account: ${error.message}`);
        }
    }
    async getPublicKey(merchantId) {
        var _a, _b, _c, _d;
        const url = `/authz/v1/public-keys?merchant_id=${merchantId}`;
        console.log('🔧 [BICTORIS] getPublicKey REQUEST:', {
            method: 'GET',
            url: url,
            fullUrl: `${this.baseUrl}${url}`,
            merchantId: merchantId,
            authMethod: 'X-Api-Key (JWT token)',
        });
        try {
            const response = await axios_1.default
                .create({ baseURL: this.baseUrl, timeout: 30000 })
                .get(url, {
                headers: {
                    'X-Api-Key': this.accessToken,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            console.log('✅ [BICTORIS] getPublicKey SUCCESS:', response.data);
            if (!((_a = response.data) === null || _a === void 0 ? void 0 : _a.key)) {
                throw new Error('No public key found for merchant');
            }
            return response.data.key;
        }
        catch (error) {
            console.error('💥 [BICTORIS] getPublicKey ERROR:', {
                status: (_b = error.response) === null || _b === void 0 ? void 0 : _b.status,
                statusText: (_c = error.response) === null || _c === void 0 ? void 0 : _c.statusText,
                data: (_d = error.response) === null || _d === void 0 ? void 0 : _d.data,
                url: url,
                merchantId: merchantId,
                authMethod: 'X-Api-Key',
            });
            throw new Error(`Failed to get public key: ${error.message}`);
        }
    }
    async createCharge(charge, publicKey, paymentType) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        let url = '/pay/v1/charges';
        if (paymentType) {
            url += `?payment_type=${paymentType}`;
        }
        console.log('🔧 [BICTORIS] createCharge REQUEST:', {
            method: 'POST',
            url: url,
            fullUrl: `${this.baseUrl}${url}`,
            paymentType: paymentType,
            publicKeyProvided: !!publicKey,
            publicKeyPreview: publicKey
                ? publicKey.substring(0, 50) + '...'
                : 'NO_KEY',
            headers: {
                'X-Api-Key': publicKey ? '[PROVIDED]' : '[MISSING]',
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: charge,
        });
        console.log('🔧 [BICTORIS] createCharge REQUEST BODY (JSON):', JSON.stringify(charge, null, 2));
        try {
            const response = await axios_1.default
                .create({ baseURL: this.baseUrl, timeout: 30000 })
                .post(url, charge, {
                headers: {
                    'X-Api-Key': publicKey,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            console.log('✅ [BICTORIS] createCharge SUCCESS:', response.data);
            return response.data;
        }
        catch (error) {
            console.error('💥 [BICTORIS] createCharge ERROR:', {
                status: (_a = error.response) === null || _a === void 0 ? void 0 : _a.status,
                statusText: (_b = error.response) === null || _b === void 0 ? void 0 : _b.statusText,
                data: (_c = error.response) === null || _c === void 0 ? void 0 : _c.data,
                headers: (_d = error.response) === null || _d === void 0 ? void 0 : _d.headers,
                config: {
                    url: (_e = error.config) === null || _e === void 0 ? void 0 : _e.url,
                    method: (_f = error.config) === null || _f === void 0 ? void 0 : _f.method,
                    baseURL: (_g = error.config) === null || _g === void 0 ? void 0 : _g.baseURL,
                    fullURL: ((_h = error.config) === null || _h === void 0 ? void 0 : _h.baseURL) + ((_j = error.config) === null || _j === void 0 ? void 0 : _j.url),
                },
                url: url,
                paymentType: paymentType,
                body: charge,
            });
            throw new Error(`Failed to create charge: ${error.message}`);
        }
    }
    async configureWebhook(callbackUrl, secret, merchantEmail, merchantUsername, merchantPassword) {
        var _a, _b, _c, _d, _e;
        if (BictorisProvider_1.WEBHOOK_CONFIGURED.get(merchantEmail)) {
            return {
                id: 'already-configured',
                callbackUrl: callbackUrl,
                secret: secret,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
        }
        try {
            console.log('🔑 [BICTORIS] Authenticating merchant for webhook configuration...');
            const merchantToken = await this.authenticateWithMerchantCredentials(merchantUsername, merchantPassword);
            const webhookUrl = '/authz/v1/webhooks';
            const webhookBody = {
                callbackUrl: callbackUrl,
                secret: secret,
            };
            console.log('🔧 [BICTORIS] configureWebhook REQUEST:', {
                method: 'POST',
                url: webhookUrl,
                fullUrl: `${this.baseUrl}${webhookUrl}`,
                body: webhookBody,
                merchantEmail: merchantEmail,
                authenticatedAs: merchantUsername,
                authMethod: 'X-Api-Key (with Bearer token from merchant credentials)',
            });
            console.log('🔧 [BICTORIS] configureWebhook REQUEST BODY (JSON):', JSON.stringify(webhookBody, null, 2));
            console.log('🔑 [BICTORIS] Token being used (first 100 chars):', merchantToken);
            const webhookAxiosInstance = axios_1.default.create({
                baseURL: this.baseUrl,
                timeout: 30000,
            });
            const response = await webhookAxiosInstance.post(webhookUrl, webhookBody, {
                headers: {
                    'X-Api-Key': merchantToken,
                },
            });
            console.log('✅ [BICTORIS] configureWebhook SUCCESS:', response.data);
            BictorisProvider_1.WEBHOOK_CONFIGURED.set(merchantEmail, true);
            return response.data;
        }
        catch (error) {
            console.error('💥 [BICTORIS] configureWebhook ERROR:', {
                status: (_a = error.response) === null || _a === void 0 ? void 0 : _a.status,
                statusText: (_b = error.response) === null || _b === void 0 ? void 0 : _b.statusText,
                data: (_c = error.response) === null || _c === void 0 ? void 0 : _c.data,
                headers: (_d = error.response) === null || _d === void 0 ? void 0 : _d.headers,
                url: '/authz/v1/webhooks',
                merchantEmail: merchantEmail,
                authMethod: 'X-Api-Key (with Bearer token from merchant credentials)',
                body: { callbackUrl, secret: '[REDACTED]' },
            });
            if (((_e = error.response) === null || _e === void 0 ? void 0 : _e.status) === 406) {
                console.log('⚠️ [BICTORIS] 406 error - webhook might already exist or URL format issue');
                console.log('💡 [BICTORIS] You can manually configure webhook using:');
                const baseDomain = process.env.BICTORIS_BASE_URL;
                console.log(`curl --location 'https://api.${baseDomain}/authz/v1/webhooks' \\
--header 'X-Api-Key: [MERCHANT_TOKEN]' \\
--header 'Content-Type: application/json' \\
--data '{
  "callbackUrl": "${callbackUrl}",
  "secret": "${secret}"
}'`);
            }
            throw new Error(`Failed to configure webhook: ${error.message}`);
        }
    }
    static resetWebhookConfiguration() {
        BictorisProvider_1.WEBHOOK_CONFIGURED.clear();
    }
};
BictorisProvider.WEBHOOK_CONFIGURED = new Map();
BictorisProvider = BictorisProvider_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], BictorisProvider);
exports.BictorisProvider = BictorisProvider;
//# sourceMappingURL=BictorisProvider.js.map