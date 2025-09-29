"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MoneyGramSendProvider_1 = require("./MoneyGramSendProvider");
const MoneyGramHelper_1 = require("./MoneyGramHelper");
const agentCredentials = {
    agentID: '43817027',
    agentSequence: '11',
    token: 'TEST',
};
const moneyGramSendProvider = new MoneyGramSendProvider_1.MoneyGramSendProvider(agentCredentials);
const senderDetails = {
    senderFirstName: 'Moussa',
    senderLastName: 'Ndour',
    senderAddress: '123 Main Street',
    senderCity: 'Dakar',
    senderHomePhone: '772457199',
    senderCountry: 'SEN',
    senderPhoneNumber: '772457199',
    sendCurrency: 'XOF',
    senderCitizenshipCountry: 'SEN',
    sendPurposeOfTransaction: 'GIFT',
    senderPhotoIdNumber: '1672282828282',
    senderPhotoIdCountry: 'SEN',
    senderBirthCountry: 'SEN',
    senderDOB: '1993-05-15',
    senderHomePhoneCountryCode: '221',
    senderPhotoIdType: 'GOV',
    senderGender: 'MALE',
    deliveryOption: 'WILL_CALL',
    agentConsumerID: 'USER1234',
    agentTransactionId: 'T' + Math.random().toString(16),
    sourceOfFunds: 'SALARY_EMPLOY',
    relationshipToReceiver: 'FAMILY',
    senderOccupation: 'ENGINEER',
    senderIntendedUseOfMGIServices: 'FAMILY_FRIENDS_SUPPORT',
};
const receiverDetails = {
    receiverFirstName: 'Aicha',
    receiverLastName: 'Diallo',
    receiverPhone: '772457199',
    receiverPhoneCountryCode: '221',
    receiveCountry: 'SEN',
    receiveCurrency: 'XOF',
    receiverAddress: 'Almadies',
    receiverCity: 'Dakar',
};
const sendAmount = 200000;
async function sendMoneyTransaction() {
    try {
        console.log('🚀 Initiating MoneyGram Send Transaction...');
        const response = await moneyGramSendProvider.sendMoney(sendAmount, senderDetails, receiverDetails);
        console.log('🎉 Transaction Completed Successfully!', response.commitTransactionResponse);
    }
    catch (error) {
        console.error('❌ Error in Sending Transaction:');
        console.log(MoneyGramHelper_1.MoneyGramHelper.parseError(error));
    }
}
sendMoneyTransaction();
//# sourceMappingURL=send.js.map