"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneyGramSendProvider = void 0;
const MoneygramInterface_1 = require("./MoneygramInterface");
const MoneyGramHelper_1 = require("./MoneyGramHelper");
class MoneyGramSendProvider {
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
    async customerLookup(client, customerPhone, maxToReturn = 10) {
        if (!customerPhone) {
            throw new Error('❌ Le numéro de téléphone du client est requis.');
        }
        const requestPayload = this.createRequest({
            customerPhone,
            maxSendersToReturn: maxToReturn,
            maxReceiversToReturn: maxToReturn,
        });
        console.log('🔍 Recherche du client avec le téléphone:', customerPhone);
        console.log('📨 Requête:', MoneyGramHelper_1.MoneyGramHelper.outputLog(requestPayload));
        try {
            const [response] = await client.moneyGramConsumerLookupAsync(requestPayload);
            console.log('✅ Réponse Customer Lookup:', MoneyGramHelper_1.MoneyGramHelper.outputLog(response));
            return response;
        }
        catch (e) {
            if (e.message.includes('"616"')) {
                return null;
            }
            throw e;
        }
    }
    async feeLookup(client, sendAmount, receiveCountry, sendCurrency) {
        if (sendAmount <= 0) {
            throw new Error('❌ Le montant à envoyer doit être supérieur à zéro.');
        }
        const requestPayload = this.createRequest({
            productType: MoneygramInterface_1.ProductType.SEND,
            amountExcludingFee: sendAmount,
            receiveCountry,
            sendCurrency,
            allOptions: true,
        });
        console.log('💰 Recherche des frais de transaction...');
        console.log('📨 Requête:', MoneyGramHelper_1.MoneyGramHelper.outputLog(requestPayload));
        const [response] = await client.feeLookupAsync(requestPayload);
        console.log('✅ Réponse Fee Lookup:', MoneyGramHelper_1.MoneyGramHelper.outputLog(response));
        return response;
    }
    async collectRequiredFields(client, sendAmount, receiveCountry, receiveCurrency, sendCurrency, consumerId, deliveryOption) {
        var _a, _b;
        const requestPayload = this.createRequest({
            receiveCountry,
            deliveryOption: deliveryOption,
            thirdPartyType: MoneygramInterface_1.ThirdPartyType.NONE,
            receiveCurrency,
            amount: sendAmount,
            sendCurrency: sendCurrency,
            productType: MoneygramInterface_1.ProductType.SEND,
            consumerId,
            formFreeStaging: false,
        });
        console.log('📋 Collecte des champs obligatoires...');
        console.log('📨 Requête:', MoneyGramHelper_1.MoneyGramHelper.outputLog(requestPayload));
        const [response] = await client.getFieldsForProductAsync(requestPayload);
        response.requiredProductFieldInfo = (_b = (_a = response) === null || _a === void 0 ? void 0 : _a.productFieldInfo) === null || _b === void 0 ? void 0 : _b.filter((p) => p.visibility === 'REQ');
        console.log('✅ Réponse Required Fields OK');
        return response;
    }
    async validateSendRequest(client, requiredFieldsResponse, senderDetails, receiverDetails, feeLookupResponse, sendAmount, consumerId, sendCurrency, receiveCountry, deliveryOption) {
        var _a, _b, _c;
        console.log('feee', MoneyGramHelper_1.MoneyGramHelper.outputLog(feeLookupResponse), MoneyGramHelper_1.MoneyGramHelper.outputLog(feeLookupResponse.feeInfo));
        const data = {
            agentStagingChannel: undefined,
            operatorName: undefined,
            amount: sendAmount,
            feeAmount: Math.abs(parseFloat(String((_a = feeLookupResponse.feeInfo.find((f) => f.deliveryOption === deliveryOption)) === null || _a === void 0 ? void 0 : _a.validReceiveAmount)) -
                parseFloat(String((_b = feeLookupResponse.feeInfo.find((f) => f.deliveryOption === deliveryOption)) === null || _b === void 0 ? void 0 : _b.totalAmount))),
            mgiRewardsNumber: undefined,
            agentCustomerNumber: undefined,
            destinationCountry: receiveCountry,
            destinationState: undefined,
            deliveryOption,
            receiveCurrency: sendCurrency,
            receiveAgentID: undefined,
            accountNumber: undefined,
            customerReceiveNumber: undefined,
            senderMailingAddress: undefined,
            senderMailingAddress2: undefined,
            senderMailingAddress3: undefined,
            senderMailingCity: undefined,
            senderMailingState: undefined,
            senderMailingZipCode: undefined,
            senderMailingCountry: undefined,
            senderFirstName: senderDetails.senderFirstName,
            senderMiddleName: senderDetails.senderMiddleName,
            senderLastName: senderDetails.senderLastName,
            senderLastName2: senderDetails.senderLastName2,
            senderAddress: senderDetails.senderAddress,
            senderAddress2: senderDetails.senderAddress2,
            senderAddress3: senderDetails.senderAddress3,
            senderCity: senderDetails.senderCity,
            senderState: senderDetails.senderState,
            senderZipCode: senderDetails.senderZipCode,
            senderCountry: senderDetails.senderCountry,
            senderHomePhone: senderDetails.senderHomePhone,
            receiverFirstName: receiverDetails.receiverFirstName,
            receiverMiddleName: receiverDetails.receiverMiddleName,
            receiverLastName: receiverDetails.receiverLastName,
            receiverLastName2: receiverDetails.receiverLastName2,
            receiverAddress: receiverDetails.receiverAddress,
            receiverCity: receiverDetails.receiverCity,
            receiverState: receiverDetails.receiverState,
            receiverZipCode: receiverDetails.receiverZipCode,
            receiverCountry: receiverDetails.receiveCountry,
            receiverPhone: receiverDetails.receiverPhoneNumber,
            receiverPhoneCountryCode: receiverDetails.receiverPhoneCountryCode,
            senderPhotoIdType: senderDetails.senderPhotoIdType,
            senderPhotoIdNumber: senderDetails.senderPhotoIdNumber,
            senderPhotoIdCountry: senderDetails.senderPhotoIdCountry,
            senderDOB: senderDetails.senderDOB,
            senderBirthCountry: senderDetails.senderBirthCountry,
            sendCurrency,
            consumerId,
            agentTransactionId: senderDetails.agentTransactionId,
            mgiTransactionSessionID: (_c = feeLookupResponse.feeInfo.find((f) => f.deliveryOption === deliveryOption)) === null || _c === void 0 ? void 0 : _c.mgiTransactionSessionID,
            formFreeStaging: false,
            sendPurposeOfTransaction: senderDetails.sendPurposeOfTransaction,
            senderCitizenshipCountry: senderDetails.senderCitizenshipCountry,
            senderHomePhoneCountryCode: senderDetails.senderHomePhoneCountryCode,
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
        console.log('🔄 Validation de la transaction avant envoi...');
        console.log('📨 Requête:', MoneyGramHelper_1.MoneyGramHelper.outputLog(requestPayload));
        const [response] = await client.sendValidationAsync(requestPayload);
        console.log('✅ Réponse Validation Send:', MoneyGramHelper_1.MoneyGramHelper.outputLog(response));
        if (!response.readyForCommit) {
            throw new Error('❌ La transaction n’est pas prête à être validée.');
        }
        return response;
    }
    async commitTransaction(client, sendValidationResponse) {
        const requestPayload = this.createRequest({
            mgiTransactionSessionID: sendValidationResponse.mgiTransactionSessionID,
            productType: MoneygramInterface_1.ProductType.SEND,
        });
        console.log('🚀 Validation finale et envoi des fonds...');
        console.log('📨 Requête:', requestPayload);
        const [response] = await client.commitTransactionAsync(requestPayload);
        console.log('✅ Réponse Commit Transaction:', MoneyGramHelper_1.MoneyGramHelper.outputLog(response));
        return response;
    }
    async sendMoney(sendAmount, senderDetails, receiverDetails, onlyGetInfo = false) {
        var _a, _b, _c;
        try {
            const client = await this.createSOAPClient();
            console.log('🟢 Début du processus d’envoi de fonds...');
            const customerLookupResponse = await this.customerLookup(client, senderDetails.senderPhoneNumber);
            const consumerId = ((_b = (_a = customerLookupResponse === null || customerLookupResponse === void 0 ? void 0 : customerLookupResponse.senderInfo) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.consumerId) || '0';
            const feeLookupResponse = await this.feeLookup(client, sendAmount, receiverDetails.receiveCountry, senderDetails.sendCurrency);
            const requiredFieldsResponse = await this.collectRequiredFields(client, sendAmount, receiverDetails.receiveCountry, receiverDetails.receiveCurrency, senderDetails.sendCurrency, consumerId, senderDetails.deliveryOption);
            const sendValidationResponse = await this.validateSendRequest(client, requiredFieldsResponse, senderDetails, receiverDetails, feeLookupResponse, sendAmount, consumerId, senderDetails.sendCurrency, receiverDetails.receiveCountry, senderDetails.deliveryOption);
            if (onlyGetInfo) {
                return {
                    success: true,
                    feeLookupResponse: undefined,
                    sendValidationResponse: sendValidationResponse,
                    customerLookupResponse: undefined,
                    requiredFieldsResponse: undefined,
                    commitTransactionResponse: undefined,
                    errorMessage: null,
                };
            }
            const commitTransactionResponse = await this.commitTransaction(client, sendValidationResponse);
            console.log('🟢 Resultat du commit...', MoneyGramHelper_1.MoneyGramHelper.outputLog(commitTransactionResponse));
            return {
                success: ((_c = commitTransactionResponse === null || commitTransactionResponse === void 0 ? void 0 : commitTransactionResponse.referenceNumber) === null || _c === void 0 ? void 0 : _c.length) > 1,
                commitTransactionResponse: commitTransactionResponse,
                feeLookupResponse: feeLookupResponse,
                customerLookupResponse: customerLookupResponse,
                sendValidationResponse: sendValidationResponse,
                requiredFieldsResponse: requiredFieldsResponse,
                errorMessage: null,
            };
        }
        catch (error) {
            console.error('❌ Erreur dans la transaction:', error.message);
            return {
                success: false,
                commitTransactionResponse: null,
                feeLookupResponse: null,
                customerLookupResponse: null,
                sendValidationResponse: null,
                requiredFieldsResponse: null,
                errorMessage: MoneyGramHelper_1.MoneyGramHelper.parseError(error.message),
            };
        }
    }
}
exports.MoneyGramSendProvider = MoneyGramSendProvider;
//# sourceMappingURL=MoneyGramSendProvider.js.map