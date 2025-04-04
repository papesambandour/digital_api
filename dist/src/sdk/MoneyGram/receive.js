"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MoneyGramReceiveProvider_1 = require("./MoneyGramReceiveProvider");
const MoneyGramHelper_1 = require("./MoneyGramHelper");
const agentCredentials = {
    agentID: '43817027',
    locationCode: undefined,
    agentSequence: '11',
    token: 'TEST',
};
const receiveProvider = new MoneyGramReceiveProvider_1.MoneyGramReceiveProvider(agentCredentials);
async function receiveMoney() {
    try {
        console.log('🚀 Initiating MoneyGram Receive Transaction...');
        const result = await receiveProvider.receiveMoney(200000, {
            referenceNumber: '64183299',
            consumerId: '0',
            receiveCurrency: 'XOF',
            receiveCountry: 'SEN',
            receiverFirstName: 'Aicha',
            receiverLastName: 'Diallo',
            receiverCity: 'Dakar',
            receiverAddress: 'Almadies',
            receiverCountry: 'SEN',
            receiverPhone: '772457199',
            receiverPhoneCountryCode: '221',
            receiverPhotoIdCountry: 'SEN',
            receiverDOB: '1995-08-10',
            receiverPhotoIdType: 'GOV',
            receiverPhotoIdNumber: '1672282828282',
            receiverCitizenshipCountry: 'SEN',
            receiverBirthCountry: 'SEN',
            receivePurposeOfTransaction: 'GIFT',
            receiverGender: 'MALE',
            agentConsumerID: 'User12345',
            agentTransactionId: 'T' + Math.random().toString(16),
        });
        console.log('🎉 ✅ Money Received Successfully:', result);
    }
    catch (error) {
        console.log('❌- Error in Receiving Transaction:');
        console.log(MoneyGramHelper_1.MoneyGramHelper.parseError(error));
    }
}
receiveMoney();
//# sourceMappingURL=receive.js.map