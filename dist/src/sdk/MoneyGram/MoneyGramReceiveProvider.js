"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneyGramReceiveProvider = void 0;
const MoneygramInterface_1 = require("./MoneygramInterface");
const MoneyGramHelper_1 = require("./MoneyGramHelper");
const process = require("node:process");
class MoneyGramReceiveProvider {
    constructor(agentCredentials) {
        this.WSDL_URL = process.env.MONEYGRAM_WSDL_URL;
        this.apiVersion = '1512';
        this.clientSoftwareVersion = '1.0.0';
        this.agentCredentials = agentCredentials;
    }
    async createSOAPClient() {
        console.log('🔵 Initialisation du client SOAP...');
        return MoneyGramHelper_1.MoneyGramHelper.createSoapClient(this.WSDL_URL);
    }
    createRequest(data) {
        return Object.assign({ agentID: this.agentCredentials.agentID, locationCode: this.agentCredentials.locationCode, agentSequence: this.agentCredentials.agentSequence, token: this.agentCredentials.token, timeStamp: MoneyGramHelper_1.MoneyGramHelper.getISO8601ExtendedDate(), apiVersion: this.apiVersion, clientSoftwareVersion: this.clientSoftwareVersion, channelType: MoneygramInterface_1.ChannelTypeEnum.SYSTEM }, data);
    }
    async validateTransaction(client, referenceNumber) {
        const requestPayload = this.createRequest({
            referenceNumber,
        });
        console.log('🔍 Validation de la transaction avec la référence:', referenceNumber);
        console.log('📨 Requête:', MoneyGramHelper_1.MoneyGramHelper.outputLog(requestPayload));
        const [response] = await client.referenceNumberAsync(requestPayload);
        const typedResponse = response;
        console.log('✅ Réponse Validation Transaction:', MoneyGramHelper_1.MoneyGramHelper.outputLog(typedResponse));
        if (typedResponse.transactionStatus !== 'AVAIL' ||
            !typedResponse.okForPickup) {
            throw new Error('❌ La transaction n’est pas disponible pour le retrait.');
        }
        return typedResponse;
    }
    async collectRequiredFields(client, referenceNumberResponse, consumerId, receiveCurrency, receiveCountry) {
        var _a;
        const requestPayload = this.createRequest({
            receiveCountry,
            thirdPartyType: MoneygramInterface_1.ThirdPartyType.NONE,
            receiveCurrency,
            amount: referenceNumberResponse.receiveAmount,
            productType: MoneygramInterface_1.ProductType.RCV,
            consumerId,
            formFreeStaging: false,
        });
        console.log('📋 Récupération des champs requis...');
        console.log('📨 Requête:', MoneyGramHelper_1.MoneyGramHelper.outputLog(requestPayload));
        const [response] = await client.getFieldsForProductAsync(requestPayload);
        const typedResponse = response;
        typedResponse.requiredProductFieldInfo = (_a = typedResponse === null || typedResponse === void 0 ? void 0 : typedResponse.productFieldInfo) === null || _a === void 0 ? void 0 : _a.filter((p) => p.visibility === 'REQ');
        console.log('✅ Champs Requis: OK');
        return typedResponse;
    }
    async validateReceiveRequest(client, referenceNumberResponse, receptionServiceReceiveDetails, requiredFieldsResponse) {
        const data = {
            referenceNumber: referenceNumberResponse.referenceNumber,
            receiveCurrency: receptionServiceReceiveDetails.receiveCurrency,
            agentCheckNumber: referenceNumberResponse.agentCheckNumber,
            agentCheckAmount: referenceNumberResponse.agentCheckAmount,
            receiverAddress: receptionServiceReceiveDetails.receiverAddress,
            receiverCity: receptionServiceReceiveDetails.receiverCity,
            receiverCountry: receptionServiceReceiveDetails.receiverCountry,
            receiverPhotoIdType: receptionServiceReceiveDetails.receiverPhotoIdType,
            receiverPhotoIdNumber: receptionServiceReceiveDetails.receiverPhotoIdNumber,
            receiverPhotoIdCity: undefined,
            receiverPhotoIdState: undefined,
            receiverPhotoIdCountry: receptionServiceReceiveDetails.receiverPhotoIdCountry,
            receiverDOB: receptionServiceReceiveDetails.receiverDOB,
            receiverBirthCountry: receptionServiceReceiveDetails.receiverBirthCountry,
            receiverNationalityCountry: receptionServiceReceiveDetails.receiverCitizenshipCountry,
            consumerId: receptionServiceReceiveDetails.consumerId,
            receiverPhone: receptionServiceReceiveDetails.receiverPhone,
            agentConsumerID: receptionServiceReceiveDetails.agentConsumerID,
            agentTransactionId: receptionServiceReceiveDetails.agentTransactionId,
            mgiTransactionSessionID: referenceNumberResponse.mgiTransactionSessionID,
            formFreeStaging: false,
            timeToLive: undefined,
            receivePurposeOfTransaction: receptionServiceReceiveDetails.receivePurposeOfTransaction,
            receiverGender: receptionServiceReceiveDetails.receiverGender,
            receiverCitizenshipCountry: receptionServiceReceiveDetails.receiverCitizenshipCountry,
            receiverPhoneCountryCode: receptionServiceReceiveDetails.receiverPhoneCountryCode,
        };
        const errors = [];
        requiredFieldsResponse.productFieldInfo.forEach((field) => {
            const xmlTag = field.xmlTag;
            if (field.visibility === 'REQ' && !(xmlTag in data)) {
                errors.push(`❌ Champ requis manquant: ${xmlTag}`);
            }
        });
        if (errors.length > 0) {
            throw new Error(errors.join('\n'));
        }
        const requestPayload = this.createRequest(data);
        console.log('🔄 Validation de la réception...');
        console.log('📨 Requête:', MoneyGramHelper_1.MoneyGramHelper.outputLog(requestPayload));
        const [response] = await client.receiveValidationAsync(requestPayload);
        console.log('✅ Réponse Validation Réception:', MoneyGramHelper_1.MoneyGramHelper.outputLog(response));
        if (!response.readyForCommit) {
            throw new Error('❌ La transaction n’est pas prête à être validée.');
        }
        return response;
    }
    async commitTransaction(client, receiveValidationResponse) {
        const requestPayload = this.createRequest({
            mgiTransactionSessionID: receiveValidationResponse.mgiTransactionSessionID,
            productType: MoneygramInterface_1.ProductType.RCV,
        });
        console.log('🚀 Validation finale et réception des fonds...');
        console.log('📨 Requête:', MoneyGramHelper_1.MoneyGramHelper.outputLog(requestPayload));
        const [response] = await client.commitTransactionAsync(requestPayload);
        console.log('✅ Réponse Commit Transaction:', MoneyGramHelper_1.MoneyGramHelper.outputLog(response));
        return response;
    }
    async receiveMoney(amount, receptionServiceReceiveDetails) {
        var _a;
        try {
            const client = await this.createSOAPClient();
            console.log('🟢 Début du processus de réception des fonds...');
            const referenceNumberResponse = await this.validateTransaction(client, receptionServiceReceiveDetails.referenceNumber);
            console.log('referenceNumberResponse', referenceNumberResponse);
            if (amount !== parseFloat(String(referenceNumberResponse.agentCheckAmount))) {
                throw Error('Le montant saisie et le montant de la transaction ne sont pas égal');
            }
            const requiredFieldsResponse = await this.collectRequiredFields(client, referenceNumberResponse, receptionServiceReceiveDetails.consumerId, receptionServiceReceiveDetails.receiveCurrency, receptionServiceReceiveDetails.receiveCountry);
            const receiveValidationResponse = await this.validateReceiveRequest(client, referenceNumberResponse, receptionServiceReceiveDetails, requiredFieldsResponse);
            const commitTransactionResponse = await this.commitTransaction(client, receiveValidationResponse);
            console.log('🎉 ✅ Fonds reçus avec succès!');
            return {
                success: ((_a = commitTransactionResponse === null || commitTransactionResponse === void 0 ? void 0 : commitTransactionResponse.referenceNumber) === null || _a === void 0 ? void 0 : _a.length) > 1,
                commitTransactionResponse: commitTransactionResponse,
                referenceNumberResponse: referenceNumberResponse,
                requiredFieldsResponse: requiredFieldsResponse,
                receiveValidationResponse: receiveValidationResponse,
                errorMessage: null,
            };
        }
        catch (error) {
            console.error('❌ Erreur dans la transaction:', error.message);
            return {
                success: false,
                commitTransactionResponse: null,
                referenceNumberResponse: null,
                requiredFieldsResponse: null,
                receiveValidationResponse: null,
                errorMessage: MoneyGramHelper_1.MoneyGramHelper.parseError(error.message),
            };
        }
    }
    async checkReference(referenceNumber) {
        var _a;
        try {
            const client = await this.createSOAPClient();
            console.log('🟢 Début du processus de réception des fonds...');
            const referenceNumberResponse = await this.validateTransaction(client, referenceNumber);
            return {
                success: ((_a = referenceNumberResponse === null || referenceNumberResponse === void 0 ? void 0 : referenceNumberResponse.referenceNumber) === null || _a === void 0 ? void 0 : _a.length) > 1,
                referenceNumberResponse: referenceNumberResponse,
                errorMessage: null,
            };
        }
        catch (e) {
            return {
                success: false,
                referenceNumberResponse: null,
                errorMessage: MoneyGramHelper_1.MoneyGramHelper.parseError(e.message),
            };
        }
    }
}
exports.MoneyGramReceiveProvider = MoneyGramReceiveProvider;
setTimeout(function () {
    console.log('PRE-CACHING MONEYGRAM_WSDL_URL URL', process.env.MONEYGRAM_WSDL_URL);
    MoneyGramHelper_1.MoneyGramHelper.createSoapClient(process.env.MONEYGRAM_WSDL_URL)
        .then((client) => {
        console.log('client OK');
    })
        .catch(console.error);
}, 5000);
//# sourceMappingURL=MoneyGramReceiveProvider.js.map