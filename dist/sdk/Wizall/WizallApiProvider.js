"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _rp = require("request-promise");
const config_1 = require("./config");
const api_manager_interface_service_1 = require("../../Controllers/api-service/api-manager-interface/api-manager-interface.service");
const Enum_entity_1 = require("../../Models/Entities/Enum.entity");
const Controller_1 = require("../../Controllers/Controller");
const main_1 = require("../../main");
const AppSettings_entity_1 = require("../../Models/Entities/AppSettings.entity");
const rpMaker = (wizallInstance, ignoreRetry = false) => (option) => new Promise((resolve, reject) => {
    option['timeout'] = option['timeout'] || 30000;
    _rp(option)
        .then(resolve)
        .catch(async (error) => {
        if (String(error.message).includes('Unauthorized') &&
            ignoreRetry === false) {
            try {
                console.log(error.message);
                await wizallInstance.loadToken();
                option['headers']['Authorization'] = `Bearer ${wizallInstance.token}`;
                console.log('loaded ok', option, wizallInstance.token);
                const result = await wizallInstance.rp(option, true);
                console.log('pusing resole');
                return resolve(result);
            }
            catch (e) {
                console.log('reject e');
                return reject(e);
            }
        }
        else {
            console.log('reject');
            return reject(error);
        }
    });
});
class WizallApiProvider {
    constructor({ wizallLogin, wizallPassword, wizallClientId, wizallClientSecret, wizallUrl, }, type) {
        this.wizallLogin = null;
        this.wizallPassword = null;
        this.wizallClientId = null;
        this.wizallClientSecret = null;
        this.wizallUrl = null;
        this.token = null;
        console.log(type);
        this.wizallLogin = wizallLogin;
        this.wizallPassword = wizallPassword;
        this.wizallClientId = wizallClientId;
        this.wizallClientSecret = wizallClientSecret;
        this.wizallUrl = wizallUrl;
        this.rp = rpMaker(this);
        this.loadToken().then().catch(console.error);
        setInterval(() => {
            this.loadToken().then().catch(console.error);
        }, 1000 * 60 * 60);
    }
    static getInstance(type) {
        if (type === 'bill') {
            if (!WizallApiProvider._billInstance) {
                WizallApiProvider._billInstance = new WizallApiProvider(config_1.wizallApiConfig('bill'), 'bill');
            }
            return WizallApiProvider._billInstance;
        }
        else if (type === 'payment') {
            if (!WizallApiProvider._paymentInstance) {
                WizallApiProvider._paymentInstance = new WizallApiProvider(config_1.wizallApiConfig('payment'), 'payment');
            }
            return WizallApiProvider._paymentInstance;
        }
    }
    async loadToken() {
        if (process.env.RUNTIME_ENV === 'CRON') {
            return;
        }
        console.log('loading wizall token', {
            username: this.wizallLogin,
            grant_type: 'password',
            client_type: 'public',
            client_id: this.wizallClientId,
            client_secret: this.wizallClientSecret,
            password: this.wizallPassword,
            country: 'sn',
        });
        const option = {
            uri: `${this.wizallUrl}/token/`,
            method: 'POST',
            body: {
                username: this.wizallLogin,
                grant_type: 'password',
                client_type: 'public',
                client_id: this.wizallClientId,
                client_secret: this.wizallClientSecret,
                password: this.wizallPassword,
                country: 'sn',
            },
            json: true,
            timeout: 10000,
        };
        try {
            const data = await this.rp(option, true);
            let setting = await AppSettings_entity_1.AppSettings.findOne({
                where: {
                    name: AppSettings_entity_1.APP_SETTING_WIZALL_TOKEN_NAME,
                },
            });
            this.token = data.access_token;
            if (setting) {
                setting.value = data.access_token;
                await setting.save();
            }
            else {
                setting = new AppSettings_entity_1.AppSettings();
                setting.name = AppSettings_entity_1.APP_SETTING_WIZALL_TOKEN_NAME;
                setting.value = data.access_token;
                setting.createdAt = new Date();
                await setting.save();
            }
            console.log('wizall token loaded', this.token);
        }
        catch (e) {
            console.log('error on login', e);
            throw e;
        }
    }
    async makePayment({ amount, identifier, phoneNumber }) {
        await this.waitForToken();
        try {
            const option = {
                method: 'POST',
                uri: `${this.wizallUrl}/api/partner/merchant/payment/`,
                json: true,
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
                body: {
                    agentmsisdn: config_1.wizallApiConfig('payment').wizallAgentPhoneNumber,
                    agentpin: config_1.wizallApiConfig('payment').wizallAgentPin,
                    amount: amount,
                    external_id: identifier + '',
                    usermsisdn: phoneNumber,
                    partner_id: config_1.wizallApiConfig('payment').wizallPartnerId,
                    country: 'sn',
                },
            };
            console.log(option);
            return await this.rp(option);
        }
        catch (e) {
            console.log(e.message);
            return {
                message: e.message,
            };
        }
    }
    async makeCashin({ amount, identifier, phoneNumber }) {
        await this.waitForToken();
        try {
            const option = {
                method: 'POST',
                uri: `${this.wizallUrl}/api/agent/cashin/`,
                json: true,
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
                body: {
                    agent_msisdn: config_1.wizallApiConfig('payment').wizallAgentPhoneNumber,
                    agent_pin: config_1.wizallApiConfig('payment').wizallAgentPin,
                    amount: amount + '',
                    external_id: identifier + '',
                    msisdn: phoneNumber,
                    country: 'sn',
                },
            };
            console.log(option);
            const response = await this.rp(option, false);
            return {
                success: !!response.transactionid,
                reference: response.transactionid,
                response,
            };
        }
        catch (e) {
            console.log(e.message);
            return {
                message: e.message,
                success: false,
            };
        }
    }
    async getBalance() {
        await this.waitForToken();
        try {
            const option = {
                method: 'POST',
                uri: `${this.wizallUrl}/api/solde/`,
                json: true,
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
                body: {
                    agent_msisdn: config_1.wizallApiConfig('payment').wizallAgentPhoneNumber,
                    agent_pin: config_1.wizallApiConfig('payment').wizallAgentPin,
                    partner_id: config_1.wizallApiConfig('payment').wizallPartnerId,
                    country: 'sn',
                },
            };
            console.log(option);
            const response = await this.rp(option, false);
            return {
                success: true,
                newBalance: response === null || response === void 0 ? void 0 : response.solde,
            };
        }
        catch (e) {
            console.log(e.message, 'balanceResponse');
            return {
                success: false,
                newBalance: null,
            };
        }
    }
    static async waitSome(seconde) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, seconde * 1000);
        });
    }
    async verifyWizallTransaction(wizallSubmitedId, { wizallAgentPhoneNumber, wizallAgentPin }) {
        await this.waitForToken();
        try {
            const option = {
                method: 'POST',
                uri: `${this.wizallUrl}/api/transactions/list/`,
                json: true,
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
                body: {
                    agent_msisdn: wizallAgentPhoneNumber,
                    agent_pin: wizallAgentPin,
                    country: 'sn',
                },
                timeout: 60000,
            };
            const transactions = await this.rp(option);
            console.log(transactions.length, 'wizal check get list');
            const transaction = transactions === null || transactions === void 0 ? void 0 : transactions.find((t) => t.external_info + '' === wizallSubmitedId + '');
            const isSuccess = !!transaction;
            let payment_status = '';
            if (isSuccess) {
                if (transaction === null || transaction === void 0 ? void 0 : transaction.id) {
                    payment_status = 'succeeded';
                }
            }
            else {
                payment_status = null;
            }
            return {
                payment_status: payment_status,
                transaction: transaction || null,
                wizall_id: transaction === null || transaction === void 0 ? void 0 : transaction.id,
            };
        }
        catch (e) {
            return {
                message: e.message,
                exception_message: e.message,
                payment_status: null,
                transaction: null,
                wizall_id: null,
            };
        }
    }
    async makeRapidoPayment(amount, badge_num, { wizallAgentPhoneNumber, wizallAgentPin }) {
        await this.waitForToken();
        const body = {
            agent_msisdn: wizallAgentPhoneNumber,
            agent_pin: wizallAgentPin,
            badge_num,
            country: 'SN',
            montant: +amount,
        };
        const option = {
            method: 'POST',
            uri: `${this.wizallUrl}/api/rapido/reload/`,
            json: true,
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
            body,
        };
        return await this.rp(option);
    }
    async getSdeBillPayment(reference_client, { wizallAgentPhoneNumber, wizallAgentPin }) {
        await this.waitForToken();
        const body = {
            agent_msisdn: wizallAgentPhoneNumber,
            agent_pin: wizallAgentPin,
            reference_client,
            country: 'SN',
        };
        const option = {
            method: 'POST',
            uri: `${this.wizallUrl}/api/sde/bill/get/`,
            json: true,
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
            body,
        };
        return await this.rp(option);
    }
    async makeSdeBillPay(reference_client, amount, external_id, { wizallAgentPhoneNumber, wizallAgentPin }) {
        await this.waitForToken();
        const body = {
            agent_msisdn: wizallAgentPhoneNumber,
            agent_pin: wizallAgentPin,
            country: 'sn',
            montant: amount,
            reference_client,
            reference_facture: external_id,
        };
        const option = {
            method: 'POST',
            uri: `${this.wizallUrl}/api/sde/bill/pay/`,
            json: true,
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
            body,
        };
        return await this.rp(option);
    }
    async getSenelecBillPayment(police, { wizallAgentPhoneNumber, wizallAgentPin }) {
        await this.waitForToken();
        const body = {
            agent_msisdn: wizallAgentPhoneNumber,
            agent_pin: wizallAgentPin,
            police,
            country: 'SN',
        };
        const option = {
            method: 'POST',
            timeout: 10000,
            uri: `${this.wizallUrl}/api/senelec/bill/get/`,
            json: true,
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
            body,
        };
        console.log(option);
        try {
            console.log('start request');
            const response = await this.rp(option);
            console.log(response);
            return {
                success: Array.isArray(response),
                message: `${response.length} en attente(s) non payée pour cette facture`,
                pendingBills: response
                    .filter((b) => !b.statuspayment)
                    .map((b) => {
                    return {
                        amount: parseInt(b.total),
                        billReference: b.numfacture,
                        infos: [
                            {
                                label: 'Nom client',
                                value: b.client || 'N/A',
                            },
                            {
                                label: 'Montant de base',
                                value: parseInt(b.montant),
                            },
                            {
                                label: 'Frais',
                                value: parseInt(b.frais),
                            },
                            {
                                label: "Date d'échéance",
                                value: b.dateecheance,
                            },
                        ],
                        baseAmount: b.montant,
                    };
                }),
            };
        }
        catch (e) {
            console.log(e.message);
            return {
                success: false,
                message: e.message,
                pendingBills: [],
            };
        }
    }
    async getSenEauBillPayment(reference_client, { wizallAgentPhoneNumber, wizallAgentPin }) {
        await this.waitForToken();
        const body = {
            agent_msisdn: wizallAgentPhoneNumber,
            agent_pin: wizallAgentPin,
            reference_client,
            country: 'SN',
        };
        const option = {
            method: 'POST',
            uri: `${this.wizallUrl}/api/sde/bill/get/`,
            json: true,
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
            body,
            timeout: 10000,
        };
        console.log(option);
        try {
            const response = await this.rp(option);
            console.log(response);
            return {
                success: Array.isArray(response),
                message: `${response.length} en attente(s) non payée pour cette facture`,
                pendingBills: response
                    .filter((b) => !b.statuspayment)
                    .map((b) => {
                    return {
                        amount: parseInt(b.total),
                        billReference: b.reference_facture,
                        infos: [
                            {
                                label: 'Nom client',
                                value: `${b.prenom || 'N/A'}` + ' ' + `${b.nom || 'N/A'}`,
                            },
                            {
                                label: 'Montant de base',
                                value: parseInt(b.montant),
                            },
                            {
                                label: 'Frais',
                                value: parseInt(b.frais),
                            },
                            {
                                label: "Date d'échéance",
                                value: b.date_echeance,
                            },
                        ],
                        baseAmount: b.montant,
                    };
                }),
            };
        }
        catch (e) {
            console.log(e.message);
            if (String(e.message).includes('Aucune facture impayée')) {
                return {
                    success: true,
                    message: 'Aucune facture impayée',
                    pendingBills: [],
                };
            }
            return {
                success: false,
                message: e.message,
                pendingBills: [],
            };
        }
    }
    async confirmBillSenEau(reference_client, amount, reference_facture, { wizallAgentPhoneNumber, wizallAgentPin }) {
        await this.waitForToken();
        const pendingBills = await this.getSenEauBillPayment(reference_client, {
            wizallAgentPhoneNumber,
            wizallAgentPin,
        });
        const find = pendingBills.pendingBills.find((b) => b.billReference === reference_facture);
        if (!find) {
            return {
                success: false,
                message: 'La facture que vous essayer de payer est introuvable',
            };
        }
        if (parseInt(find.amount) !== amount) {
            return {
                success: false,
                message: `Le montant de la facture #${reference_facture} (${find.amount} CFA) est different du montant soumis (${amount} CFA)`,
            };
        }
        const body = {
            agent_msisdn: wizallAgentPhoneNumber,
            agent_pin: wizallAgentPin,
            country: 'sn',
            montant: find.baseAmount,
            reference_client,
            reference_facture,
        };
        const option = {
            method: 'POST',
            uri: `${this.wizallUrl}/api/sde/bill/pay/`,
            json: true,
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
            body,
        };
        try {
            console.log(option);
            const response = await this.rp(option);
            return {
                success: (response === null || response === void 0 ? void 0 : response.statuspayment) === true,
                response: response,
                message: `La facture  SenEau #${reference_facture} du montant de ${amount} CFA a été payé avec succès"`,
                paymentId: response.payment_transaction_number + '|' + response.transactionid,
            };
        }
        catch (e) {
            return {
                success: false,
                response: e.message,
                message: 'Votre facture ne peut etre payee:  ' + e.message,
            };
        }
    }
    async confirmBillSenelec(police, amount, numfacture, { wizallAgentPhoneNumber, wizallAgentPin }) {
        await this.waitForToken();
        const pendingBills = await this.getSenelecBillPayment(police, {
            wizallAgentPhoneNumber,
            wizallAgentPin,
        });
        const find = pendingBills.pendingBills.find((b) => b.billReference === numfacture);
        if (!find) {
            return {
                success: false,
                message: 'La facture que vous essayer de payer est introuvable',
            };
        }
        if (parseInt(find.amount) !== amount) {
            return {
                success: false,
                message: `Le montant de la facture #${numfacture} (${find.amount} CFA) est different du montant soumis (${amount} CFA)`,
            };
        }
        const body = {
            agent_msisdn: wizallAgentPhoneNumber,
            agent_pin: wizallAgentPin,
            country: 'sn',
            montant: find.baseAmount,
            numfacture,
            police,
        };
        const option = {
            method: 'POST',
            uri: `${this.wizallUrl}/api/senelec/bill/pay/`,
            json: true,
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
            body,
        };
        try {
            console.log(option);
            const response = await this.rp(option);
            return {
                success: (response === null || response === void 0 ? void 0 : response.statuspayment) === true,
                response: response,
                message: `La facture  Senelec #${null} du montant de ${amount} CFA a été payé avec succès"`,
                paymentId: response.PAYMENT_TRANSACTION_NUMBER +
                    '|' +
                    response.transactionid +
                    '|' +
                    response.senelecid,
            };
        }
        catch (e) {
            return {
                success: false,
                response: e.message,
                message: 'Votre facture ne peut etre payee:  ' + e.message,
            };
        }
    }
    async getWotofalBillAccount(compteur, { wizallAgentPhoneNumber, wizallAgentPin }) {
        await this.waitForToken();
        const body = {
            agent_msisdn: wizallAgentPhoneNumber,
            agent_pin: wizallAgentPin,
            compteur,
            country: 'SN',
        };
        const option = {
            method: 'POST',
            uri: `${this.wizallUrl}/api/woyofal/account/get/`,
            json: true,
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
            body,
        };
        return await this.rp(option);
    }
    static sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    async makeWoyofalBillPay(compteur, amount, external_id, { wizallAgentPhoneNumber, wizallAgentPin }) {
        await this.waitForToken();
        const body = {
            agent_msisdn: wizallAgentPhoneNumber,
            agent_pin: wizallAgentPin,
            country: 'sn',
            montant: amount,
            compteur,
            session_id: external_id,
        };
        const option = {
            method: 'POST',
            uri: `${this.wizallUrl}/api/woyofal/reload/`,
            json: true,
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
            body,
        };
        return await this.rp(option);
    }
    static async apiManagerCheckCashOutStatusTransaction(apiManagerService, params) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        console.log('in apiManagerCheckCashOutStatusTransaction');
        const baseResponse = {
            phone: (_b = (_a = params.transaction) === null || _a === void 0 ? void 0 : _a.phone) !== null && _b !== void 0 ? _b : null,
            amount: (_e = (_d = (_c = params.transaction) === null || _c === void 0 ? void 0 : _c.amount) === null || _d === void 0 ? void 0 : _d.toString()) !== null && _e !== void 0 ? _e : null,
            externalTransactionId: (_g = (_f = params.transaction) === null || _f === void 0 ? void 0 : _f.externalTransactionId) !== null && _g !== void 0 ? _g : null,
            codeService: (_j = (_h = params.transaction) === null || _h === void 0 ? void 0 : _h.codeSousService) !== null && _j !== void 0 ? _j : null,
            callbackUrl: (_l = (_k = params.transaction) === null || _k === void 0 ? void 0 : _k.urlIpn) !== null && _l !== void 0 ? _l : null,
            transactionId: (_o = (_m = params.transaction) === null || _m === void 0 ? void 0 : _m.transactionId) !== null && _o !== void 0 ? _o : null,
        };
        const checkout = await WizallApiProvider.getInstance('payment').verifyWizallTransaction(WizallApiProvider.getWizallExternalFromInternalId(params.transaction.transactionId.toString(), 'payment'), {
            wizallAgentPhoneNumber: config_1.wizallApiConfig('payment')
                .wizallAgentPhoneNumber,
            wizallAgentPin: config_1.wizallApiConfig('payment').wizallAgentPin,
        });
        if (checkout === null || checkout === void 0 ? void 0 : checkout.payment_status) {
            if (checkout.payment_status === 'succeeded') {
                params.transaction.statut = Enum_entity_1.StatusEnum.SUCCESS;
                params.transaction.preStatut = Enum_entity_1.StatusEnum.SUCCESS;
                params.transaction.needCheckTransaction = 0;
                params.transaction.sousServiceTransactionId = checkout.wizall_id;
                params.transaction.checkTransactionResponse = main_1.serializeData(checkout);
                await params.transaction.save();
                console.log('after save');
                await WizallApiProvider.sleep(Math.random() * 1000);
                await apiManagerService.helper.handleSuccessTransactionCreditDebit(params.transaction);
                await apiManagerService.helper.setIsCallbackReadyValue(params.transaction);
                apiManagerService.helper
                    .updateApiBalance(apiManagerService, params.transaction.phonesId)
                    .then();
                return Object.assign({
                    status: 'SUCCESS',
                    codeHttp: Controller_1.CODE_HTTP.OK_OPERATION,
                }, baseResponse);
            }
            else if (checkout.payment_status === 'processing') {
                params.transaction.checkTransactionResponse = main_1.serializeData(checkout);
                await params.transaction.save();
                return Object.assign({
                    status: Enum_entity_1.StatusEnum.PENDING,
                    codeHttp: Controller_1.CODE_HTTP.OK_OPERATION,
                }, baseResponse);
            }
            else {
                console.log('transaction failed');
                params.transaction.checkTransactionResponse = main_1.serializeData(checkout);
                params.transaction.statut = Enum_entity_1.StatusEnum.FAILLED;
                params.transaction.preStatut = Enum_entity_1.StatusEnum.FAILLED;
                params.transaction.needCheckTransaction = 0;
                await params.transaction.save();
                await apiManagerService.helper.setIsCallbackReadyValue(params.transaction);
                apiManagerService.helper
                    .updateApiBalance(apiManagerService, params.transaction.phonesId)
                    .then();
                await apiManagerService.helper.operationPartnerCancelTransaction(params.transaction);
                return Object.assign({
                    status: Enum_entity_1.StatusEnum.FAILLED,
                    codeHttp: Controller_1.CODE_HTTP.OPERATION_BADREQUEST,
                }, baseResponse);
            }
        }
        else {
            console.log('error case check status wizall');
            params.transaction.checkTransactionResponse = main_1.serializeData(checkout);
            await params.transaction.save();
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
            }, baseResponse);
        }
    }
    async waitForToken() {
        return new Promise((resolve) => {
            const intervalId = setInterval(async () => {
                const setting = await AppSettings_entity_1.AppSettings.findOne({
                    where: {
                        name: AppSettings_entity_1.APP_SETTING_WIZALL_TOKEN_NAME,
                    },
                });
                this.token = setting === null || setting === void 0 ? void 0 : setting.value;
                if (this.token) {
                    console.log('resolve true');
                    resolve(true);
                    clearInterval(intervalId);
                    clearTimeout(timeoutId);
                }
                else {
                    console.log('waitigng for token');
                }
            }, 500);
            const timeoutId = setTimeout(() => {
                console.log('resolve false timeout');
                resolve(false);
            }, 5000);
        });
    }
    static getWizallExternalFromInternalId(s, type) {
        return type === 'cashin' ? `INTECH-CASHIN-${s}` : `INTECH-PAYMENT-${s}`;
    }
    static getMessageFromCode(response) {
        var _a;
        if ((_a = response === null || response === void 0 ? void 0 : response.message) === null || _a === void 0 ? void 0 : _a.includes('USER_NOT_EXIST')) {
            return `Ce numero n'a pas de compte wizall actif`;
        }
        return api_manager_interface_service_1.MANAGER_INIT_UNKNOWN_MESSAGE;
    }
}
exports.default = WizallApiProvider;
WizallApiProvider._paymentInstance = null;
WizallApiProvider._billInstance = null;
//# sourceMappingURL=WizallApiProvider.js.map