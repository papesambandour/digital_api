"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rp = require("request-promise");
const crypto = require("crypto");
const config_1 = require("./config");
const Enum_entity_1 = require("../../Models/Entities/Enum.entity");
const Utils = require("util");
const Controller_1 = require("../../Controllers/Controller");
class ProviderOrangeMoneyApi {
    constructor(args) {
        this.clientId = args.clientId;
        this.clientSecret = args.clientSecret;
        this.distributorPhoneNumber = args.distributorPhoneNumber;
        this.distributorPinPhoneNumber = args.distributorPinPhoneNumber;
        this.receiveNotification = args.receiveNotification;
        this.merchantCode = args.merchantCode;
    }
    static getInstance() {
        return new ProviderOrangeMoneyApi(config_1.omApiConfig());
    }
    async sendTransaction(transaction) {
        var _a;
        try {
            await this.doAuth();
            await this.getPublicKey();
            console.log('hiiiiiire');
            transaction = ProviderOrangeMoneyApi.prepareTransaction(transaction);
            const sendUrl = `${ProviderOrangeMoneyApi.appUrl}/api/eWallet/v1/cashins`;
            const formData = {
                partner: {
                    idType: 'MSISDN',
                    id: this.distributorPhoneNumber,
                    encryptedPinCode: await this.encryptRsaPin(this.distributorPinPhoneNumber),
                    walletType: 'PRINCIPAL',
                },
                customer: {
                    idType: 'MSISDN',
                    id: transaction.phoneNumber,
                    walletType: 'PRINCIPAL',
                },
                amount: {
                    value: `${transaction.amount}`,
                    unit: 'XOF',
                },
                requestDate: `${new Date().toISOString()}`,
                reference: `${transaction.identifier}`,
                receiveNotification: this.receiveNotification,
            };
            const postOption = {
                uri: sendUrl,
                method: 'POST',
                json: formData,
                headers: {
                    Authorization: `Bearer ${this.authToken}`,
                },
                simple: false,
            };
            console.log(formData);
            const apiResponse = await rp(postOption);
            console.log(apiResponse);
            const success = [
                'SUCCESS',
                'INITIATED',
                'PENDING',
                'PRE_INITIATED',
            ].includes((_a = apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.status) === null || _a === void 0 ? void 0 : _a.toUpperCase());
            return {
                success,
                code: success
                    ? 'success'
                    : ProviderOrangeMoneyApi.getAPiErrorCode((apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.description) || (apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.detail)),
                message: (apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.description) || (apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.detail),
                externalReference: apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.transactionId,
                transaction,
                apiResponse,
            };
        }
        catch (e) {
            return {
                success: false,
                code: ProviderOrangeMoneyApi.getAPiErrorCode(e.message),
                message: e.message,
                externalReference: null,
                newBalance: null,
                apiResponse: e.message,
            };
        }
    }
    async changePin(args) {
        var _a;
        try {
            await this.doAuth();
            await this.getPublicKey();
            console.log('hiiiiiire');
            const sendUrl = `${ProviderOrangeMoneyApi.appUrl}/api/eWallet/v1/account`;
            const formData = {
                encryptedPinCode: await this.encryptRsaPin(this.distributorPinPhoneNumber),
                encryptedNewPinCode: await this.encryptRsaPin(args.newPinCode),
            };
            const postOption = {
                uri: sendUrl,
                method: 'PATCH',
                qs: {
                    type: 'retailer',
                    msisdn: this.distributorPhoneNumber,
                },
                json: formData,
                headers: {
                    Authorization: `Bearer ${this.authToken}`,
                },
                simple: false,
            };
            console.log(postOption);
            const apiResponse = await rp(postOption);
            console.log(apiResponse);
            const success = ['SUCCESS'].includes((_a = apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.status) === null || _a === void 0 ? void 0 : _a.toUpperCase());
            return {
                success,
                code: success
                    ? 'success'
                    : ProviderOrangeMoneyApi.getAPiErrorCode((apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.description) || (apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.detail)),
                message: (apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.description) || (apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.detail),
                externalReference: apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.transactionId,
                newBalance: null,
                apiResponse,
            };
        }
        catch (e) {
            console.log(e);
            return {
                success: false,
                code: ProviderOrangeMoneyApi.getAPiErrorCode(e.message),
                message: e.message,
                externalReference: null,
                newBalance: null,
                apiResponse: e.message,
            };
        }
    }
    async initMerchantPayment(transaction) {
        var _a;
        try {
            await this.doAuth();
            await this.getPublicKey();
            transaction = ProviderOrangeMoneyApi.prepareTransaction(transaction);
            const sendUrl = `${ProviderOrangeMoneyApi.appUrl}/api/eWallet/v1/payments`;
            const formData = {
                partner: {
                    idType: 'MSISDN',
                    id: this.distributorPhoneNumber,
                    encryptedPinCode: await this.encryptRsaPin(this.distributorPinPhoneNumber),
                    walletType: 'PRINCIPAL',
                },
                customer: {
                    idType: 'MSISDN',
                    id: transaction.phoneNumber,
                    walletType: 'PRINCIPAL',
                },
                amount: {
                    value: `${transaction.amount}`,
                    unit: 'XOF',
                },
                method: 'CLASSIC',
                requestDate: `${new Date().toISOString()}`,
                reference: `${transaction.identifier}`,
                receiveNotification: this.receiveNotification,
            };
            const postOption = {
                uri: sendUrl,
                method: 'POST',
                json: formData,
                headers: {
                    Authorization: `Bearer ${this.authToken}`,
                },
                simple: false,
            };
            console.log(formData);
            const apiResponse = await rp(postOption);
            console.log(apiResponse);
            const success = ['INITIATED'].includes((_a = apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.status) === null || _a === void 0 ? void 0 : _a.toUpperCase());
            return {
                success,
                code: success
                    ? 'success'
                    : ProviderOrangeMoneyApi.getAPiErrorCode((apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.description) || (apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.detail)),
                message: (apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.description) ||
                    (apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.detail) ||
                    `Vous avez choisi Orange Money pour payer votre achat de  ${transaction.amount}.00 FCFA. Tapez #144# et tapez votre code secret`,
                externalReference: apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.transactionId,
                transaction,
                newBalance: null,
                apiResponse,
            };
        }
        catch (e) {
            return {
                success: false,
                code: ProviderOrangeMoneyApi.getAPiErrorCode(e.message),
                message: e.message,
                externalReference: null,
                transaction,
                newBalance: null,
                apiResponse: e.message,
            };
        }
    }
    async initQrCodeMerchantPayment(transaction, partnerName) {
        try {
            await this.doAuth();
            transaction = ProviderOrangeMoneyApi.prepareTransaction(transaction);
            const sendUrl = `${ProviderOrangeMoneyApi.appUrl}/api/eWallet/v4/qrcode`;
            const formData = {
                code: this.merchantCode,
                name: partnerName,
                customer: {
                    idType: 'MSISDN',
                    id: transaction.phoneNumber,
                    walletType: 'PRINCIPAL',
                },
                amount: {
                    value: `${transaction.amount}`,
                    unit: 'XOF',
                },
                requestDate: `${new Date().toISOString()}`,
                reference: `${transaction.identifier}`,
                receiveNotification: this.receiveNotification,
            };
            const postOption = {
                uri: sendUrl,
                method: 'POST',
                json: formData,
                headers: {
                    Authorization: `Bearer ${this.authToken}`,
                },
                simple: true,
            };
            console.log(formData);
            const apiResponse = await rp(postOption);
            const success = !!(apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.qrCode);
            return {
                success: success,
                code: success
                    ? 'success'
                    : ProviderOrangeMoneyApi.getAPiErrorCode((apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.description) || (apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.detail)),
                message: 'OK',
                externalReference: apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.transactionId,
                transaction,
                newBalance: null,
                apiResponse,
            };
        }
        catch (e) {
            return {
                success: false,
                code: ProviderOrangeMoneyApi.getAPiErrorCode(e.message),
                message: e.message,
                externalReference: null,
                transaction,
                newBalance: null,
                apiResponse: e.message,
            };
        }
    }
    async getPhoneInfo(transaction) {
        try {
            await this.doAuth();
            transaction = ProviderOrangeMoneyApi.prepareTransaction(transaction);
            const sendUrl = `${ProviderOrangeMoneyApi.appUrl}/api/eWallet/v1/account`;
            const formData = {
                msisdn: transaction.phoneNumber,
                type: 'customer',
                walletType: 'principal',
            };
            const postOption = {
                uri: sendUrl,
                method: 'GET',
                qs: formData,
                json: true,
                headers: {
                    Authorization: `Bearer ${this.authToken}`,
                },
                simple: false,
            };
            console.log(formData);
            const apiResponse = await rp(postOption);
            console.log(apiResponse);
            return {
                success: !!apiResponse.balance,
                code: 'success',
                message: 'OK',
                account: apiResponse.balance ? apiResponse : null,
                apiResponse,
            };
        }
        catch (e) {
            return {
                success: false,
                code: ProviderOrangeMoneyApi.getAPiErrorCode(e.message),
                message: e.message,
                transaction,
                apiResponse: e.message,
            };
        }
    }
    async checkTransactionStatus(transaction) {
        var _a, _b, _c;
        try {
            await this.doAuth();
            const sendUrl = `${ProviderOrangeMoneyApi.appUrl}/api/eWallet/v1/transactions/${transaction.externalReference}/status`;
            const postOption = {
                uri: sendUrl,
                method: 'GET',
                json: true,
                headers: {
                    Authorization: `Bearer ${this.authToken}`,
                },
                simple: false,
            };
            const apiResponse = await rp(postOption);
            let success;
            let code;
            if (((_a = apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.status) === null || _a === void 0 ? void 0 : _a.toUpperCase()) === 'SUCCESS') {
                success = true;
                code = 'success';
            }
            else if (((_b = apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.status) === null || _b === void 0 ? void 0 : _b.toUpperCase()) === 'INITIATED') {
                success = true;
                code = 'pending';
            }
            else if (((_c = apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.status) === null || _c === void 0 ? void 0 : _c.toUpperCase()) === 'FAILED') {
                success = true;
                code = 'failed';
            }
            return {
                success: success,
                transaction_check_status: code,
                message: 'OK',
                code: code,
                apiResponse,
            };
        }
        catch (e) {
            return {
                success: false,
                code: ProviderOrangeMoneyApi.getAPiErrorCode(e.message),
                message: e.message,
                transaction,
                newBalance: null,
                apiResponse: e.message,
            };
        }
    }
    async getBalance() {
        var _a;
        try {
            await this.doAuth();
            await this.getPublicKey();
            const sendUrl = `${ProviderOrangeMoneyApi.appUrl}/api/eWallet/v1/account/retailer/balance`;
            const formData = {
                idType: 'MSISDN',
                id: this.distributorPhoneNumber,
                encryptedPinCode: await this.encryptRsaPin(this.distributorPinPhoneNumber),
                wallet: 'PRINCIPAL',
            };
            const postOption = {
                uri: sendUrl,
                method: 'POST',
                json: formData,
                headers: {
                    Authorization: `Bearer ${this.authToken}`,
                },
                simple: true,
            };
            const apiResponse = await rp(postOption);
            console.log(apiResponse);
            const success = ['XOF'].includes((_a = apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.unit) === null || _a === void 0 ? void 0 : _a.toUpperCase());
            return {
                success: success,
                newBalance: success ? parseFloat(apiResponse.value) : undefined,
                code: 'success',
                message: 'OK',
                apiResponse,
            };
        }
        catch (e) {
            return {
                success: false,
                code: ProviderOrangeMoneyApi.getAPiErrorCode(e.message),
                message: e.message,
                apiResponse: e.message,
            };
        }
    }
    async doAuth() {
        const authUrl = `${ProviderOrangeMoneyApi.appUrl}/oauth/token`;
        const formData = {
            grant_type: 'client_credentials',
            client_secret: this.clientSecret,
            client_id: this.clientId,
        };
        const postOption = {
            uri: authUrl,
            method: 'POST',
            form: formData,
            json: true,
        };
        const authToken = await rp(postOption);
        const success = !!authToken.access_token;
        this.authToken = success ? authToken.access_token : null;
        return {
            success,
            authToken: this.authToken,
        };
    }
    async getPublicKey() {
        const authUrl = `${ProviderOrangeMoneyApi.appUrl}/api/account/v1/publicKeys`;
        const postOption = {
            uri: authUrl,
            method: 'GET',
            json: true,
            headers: {
                Authorization: `Bearer ${this.authToken}`,
            },
        };
        const publicKeys = (await rp(postOption));
        const success = !!publicKeys.key;
        this.publicRsaKey = success ? publicKeys : undefined;
        return {
            success,
            publicRsaKey: this.publicRsaKey,
        };
    }
    async encryptRsaPin(data) {
        var _a;
        const publicKey = `-----BEGIN PUBLIC KEY-----\n${(_a = this.publicRsaKey) === null || _a === void 0 ? void 0 : _a.key}\n-----END PUBLIC KEY-----`;
        const encrypted = crypto.publicEncrypt({ key: publicKey, padding: crypto.constants.RSA_PKCS1_PADDING }, Buffer.from(data, 'utf8'));
        return encrypted.toString('base64');
    }
    static prepareTransaction(transaction) {
        const trx = Object.assign({}, transaction);
        trx.initialIdentifier = trx.identifier;
        trx.identifier = `INTECH-OM-${trx.identifier}`;
        trx.amount = parseFloat(trx.amount + '');
        return trx;
    }
    static getAPiErrorCode(message) {
        const errorMessage = String(message);
        if (errorMessage.toLowerCase().includes('par mois')) {
            return 'monthly_limit';
        }
        if (errorMessage.toLowerCase().includes('suspendu')) {
            return 'suspended_account';
        }
        if (errorMessage.toLowerCase().includes('par jour')) {
            return 'daily_limit';
        }
        if (errorMessage.toLowerCase().includes('pas de compte') ||
            errorMessage.toLowerCase().includes('existe pas') ||
            errorMessage.toLowerCase().includes(`est pas un client`)) {
            return 'no_account';
        }
        if (errorMessage.toLowerCase().includes('par semaine')) {
            return 'weekly_limit';
        }
        if (errorMessage.toLowerCase().includes('access forbidden')) {
            return 'invalid_distributor_info_provided';
        }
        if (errorMessage.toLowerCase().includes('bloqué') ||
            errorMessage.toLowerCase().includes('bloque')) {
            return 'blocked_account';
        }
        if (errorMessage.toLowerCase().includes('inférieur') ||
            errorMessage.toLowerCase().includes('inferieur') ||
            errorMessage.toLowerCase().includes('insuffisant') ||
            errorMessage.toLowerCase().includes('solde')) {
            return 'balance_insufficient';
        }
        return 'unknown_error';
    }
    static getMessageFromCode(code) {
        return ProviderOrangeMoneyApi.errorMessage[code] || code;
    }
    static async apiManagerCheckStatusTransaction(apiManager, params) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        console.log('in apiManagerCheckStatusTransaction');
        const baseResponse = {
            phone: (_b = (_a = params.transaction) === null || _a === void 0 ? void 0 : _a.phone) !== null && _b !== void 0 ? _b : null,
            amount: (_e = (_d = (_c = params.transaction) === null || _c === void 0 ? void 0 : _c.amount) === null || _d === void 0 ? void 0 : _d.toString()) !== null && _e !== void 0 ? _e : null,
            externalTransactionId: (_g = (_f = params.transaction) === null || _f === void 0 ? void 0 : _f.externalTransactionId) !== null && _g !== void 0 ? _g : null,
            codeService: (_j = (_h = params.transaction) === null || _h === void 0 ? void 0 : _h.codeSousService) !== null && _j !== void 0 ? _j : null,
            callbackUrl: (_l = (_k = params.transaction) === null || _k === void 0 ? void 0 : _k.urlIpn) !== null && _l !== void 0 ? _l : null,
            transactionId: (_o = (_m = params.transaction) === null || _m === void 0 ? void 0 : _m.transactionId) !== null && _o !== void 0 ? _o : null,
        };
        const omApi = ProviderOrangeMoneyApi.getInstance();
        const response = await omApi.checkTransactionStatus({
            externalReference: params.transaction.sousServiceTransactionId,
        });
        if (response.success) {
            if (response.transaction_check_status === 'success') {
                console.log('transaction success');
                params.transaction.statut = Enum_entity_1.StatusEnum.SUCCESS;
                params.transaction.preStatut = Enum_entity_1.StatusEnum.SUCCESS;
                params.transaction.needCheckTransaction = 0;
                params.transaction.checkTransactionResponse = Utils.inspect(response.apiResponse);
                await params.transaction.save();
                await apiManager.helper.setIsCallbackReadyValue(params.transaction.id);
                await apiManager.helper.handleSuccessTransactionCreditDebit(params.transaction);
                apiManager.helper
                    .updateApiBalance(apiManager, params.transaction.phonesId)
                    .then();
                return Object.assign({
                    status: 'SUCCESS',
                    codeHttp: Controller_1.CODE_HTTP.OK_OPERATION,
                }, baseResponse);
            }
            else if (response.transaction_check_status === 'pending') {
                console.log('transaction still pending');
                params.transaction.checkTransactionResponse = Utils.inspect(response.apiResponse);
                await params.transaction.save();
                return Object.assign({
                    status: 'PENDING',
                    codeHttp: Controller_1.CODE_HTTP.OK_OPERATION,
                }, baseResponse);
            }
            else {
                console.log('transaction failed');
                params.transaction.checkTransactionResponse = Utils.inspect(response.apiResponse);
                params.transaction.statut = Enum_entity_1.StatusEnum.FAILLED;
                params.transaction.preStatut = Enum_entity_1.StatusEnum.FAILLED;
                params.transaction.needCheckTransaction = 0;
                await params.transaction.save();
                await apiManager.helper.setIsCallbackReadyValue(params.transaction.id);
                apiManager.helper
                    .updateApiBalance(apiManager, params.transaction.phonesId)
                    .then();
                await apiManager.helper.operationPartnerCancelTransaction(params.transaction);
                return Object.assign({
                    status: 'FAILLED',
                    codeHttp: Controller_1.CODE_HTTP.OPERATION_BADREQUEST,
                }, baseResponse);
            }
        }
        else {
            params.transaction.checkTransactionResponse = Utils.inspect(response.apiResponse);
            await params.transaction.save();
            return Object.assign({
                status: 'FAILLED',
                codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
            }, baseResponse);
        }
    }
    static async apiManagerGetBalance(params) {
        console.log(params);
        const omApi = ProviderOrangeMoneyApi.getInstance();
        const response = await omApi.getBalance();
        if (response.success) {
            console.log(response.newBalance);
            return {
                success: true,
                newBalance: response.newBalance,
            };
        }
        else {
            console.log('cannot check om api balance');
            return {
                success: false,
                newBalance: null,
            };
        }
    }
}
exports.default = ProviderOrangeMoneyApi;
ProviderOrangeMoneyApi.appUrl = 'https://api.orange-sonatel.com';
ProviderOrangeMoneyApi.errorMessage = {
    success: 'Votre opération est en cours de traitement',
    blocked_account: "Le compte de l'utilisateur est bloqué",
    balance_insufficient: 'Balance insufisssante pour effectuer la transaction',
    unknown_error: 'Erreur inconnu',
    daily_limit: 'Le numéro de téléphone a atteint son plafond de transaction journalière',
    weekly_limit: 'Le numéro de téléphone a atteint son plafond de transaction hebdomadaire',
    monthly_limit: 'Le numéro de téléphone a atteint son plafond de transaction mensuel',
    no_account: "Le numero de téléphone n'a de compte Orange Money actif",
    suspended_account: "Le compte de l'utilisateur est bloqué",
};
//# sourceMappingURL=ProviderOrangeMoneyApi.js.map