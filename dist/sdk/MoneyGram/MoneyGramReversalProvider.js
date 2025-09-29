"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneyGramReversalProvider = void 0;
const MoneygramInterface_1 = require("./MoneygramInterface");
const MoneyGramHelper_1 = require("./MoneyGramHelper");
const process = require("node:process");
class MoneyGramReversalProvider {
    constructor(agentCredentials) {
        this.WSDL_URL = process.env.MONEYGRAM_WSDL_URL;
        this.apiVersion = '1512';
        this.clientSoftwareVersion = '1.0.0';
        this.agentCredentials = agentCredentials;
    }
    async createSOAPClient() {
        console.log('🔵 Initialisation du client SOAP pour reversal...');
        return MoneyGramHelper_1.MoneyGramHelper.createSoapClient(this.WSDL_URL);
    }
    createRequest(data) {
        return Object.assign({ agentID: this.agentCredentials.agentID, locationCode: this.agentCredentials.locationCode, agentSequence: this.agentCredentials.agentSequence, token: this.agentCredentials.token, timeStamp: MoneyGramHelper_1.MoneyGramHelper.getISO8601ExtendedDate(), apiVersion: this.apiVersion, clientSoftwareVersion: this.clientSoftwareVersion, channelType: MoneygramInterface_1.ChannelTypeEnum.SYSTEM }, data);
    }
    determineReversalType(transactionDate) {
        try {
            const txDate = new Date(transactionDate);
            const currentDate = new Date();
            const txDateCentral = new Date(txDate.toLocaleString('en-US', { timeZone: 'America/Chicago' }));
            const currentDateCentral = new Date(currentDate.toLocaleString('en-US', { timeZone: 'America/Chicago' }));
            const txDateOnly = txDateCentral.toISOString().split('T')[0];
            const currentDateOnly = currentDateCentral.toISOString().split('T')[0];
            const isSameDay = txDateOnly === currentDateOnly;
            console.log(`📅 Transaction date: ${txDateOnly}, Current date: ${currentDateOnly}, Same day: ${isSameDay}`);
            return isSameDay ? 'C' : 'R';
        }
        catch (error) {
            console.warn(`⚠️ Erreur lors de la détermination du type de reversal, utilisation de 'C' par défaut:`, error.message);
            return 'C';
        }
    }
    async detailLookup(client, referenceNumber, operatorName) {
        const requestPayload = this.createRequest({
            referenceNumber: referenceNumber,
            includeUseData: false,
            operatorName: operatorName,
        });
        console.log('🔍 Lookup des détails de la transaction...');
        console.log('📨 Requête DetailLookup:', MoneyGramHelper_1.MoneyGramHelper.outputLog(requestPayload));
        const [response] = await client.detailLookupAsync(requestPayload);
        console.log('✅ Réponse DetailLookup:', MoneyGramHelper_1.MoneyGramHelper.outputLog(response));
        return response;
    }
    async sendReversalRequest(client, reversalData) {
        console.log("🚀 Envoi de la demande d'annulation/remboursement...");
        console.log('📨 Requête:', MoneyGramHelper_1.MoneyGramHelper.outputLog(reversalData));
        const [response] = await client.sendReversalAsync(reversalData);
        console.log('✅ Réponse Send Reversal:', MoneyGramHelper_1.MoneyGramHelper.outputLog(response));
        return response;
    }
    async reverse(reversalData) {
        var _a, _b, _c;
        const client = await this.createSOAPClient();
        try {
            console.log("🟢 Début du processus d'annulation/remboursement...");
            console.log(reversalData);
            const transactionInfo = await this.detailLookup(client, reversalData.reversalDetails.referenceNumber, reversalData.reversalDetails.operatorName);
            const reversibleStatuses = ['AVAIL', 'AFR', 'PRCSS'];
            const isReversible = reversibleStatuses.includes(transactionInfo.transactionStatus);
            if (!isReversible) {
                return {
                    success: false,
                    reversalResponse: null,
                    transactionInfo: transactionInfo,
                    errorMessage: `Transaction avec status ${transactionInfo.transactionStatus} n'est pas réversible. Statuts réversibles: ${reversibleStatuses.join(', ')}.`,
                };
            }
            const recommendedReversalType = transactionInfo.dateTimeSent
                ? this.determineReversalType(transactionInfo.dateTimeSent)
                : 'C';
            console.log(`✅ Transaction trouvée - Status: ${transactionInfo.transactionStatus}, Réversible: ${isReversible}, Type recommandé: ${recommendedReversalType}`);
            const reversalRequestData = this.createRequest({
                sendAmount: parseFloat(String(((_a = transactionInfo.sendAmounts) === null || _a === void 0 ? void 0 : _a.sendAmount) || 0)),
                feeAmount: parseFloat(String(((_b = transactionInfo.sendAmounts) === null || _b === void 0 ? void 0 : _b.totalSendFees) || 0)),
                sendCurrency: (_c = transactionInfo.sendAmounts) === null || _c === void 0 ? void 0 : _c.sendCurrency,
                referenceNumber: reversalData.reversalDetails.referenceNumber,
                operatorName: 'Moussa',
                reversalType: recommendedReversalType,
                sendReversalReason: reversalData.reversalDetails.sendReversalReason,
                feeRefund: reversalData.reversalDetails.feeRefund,
            });
            console.log(`🔄 Utilisation du type de reversal: ${recommendedReversalType} ${recommendedReversalType === 'C'
                ? '(Cancel - same day)'
                : '(Refund - next day+)'}`);
            try {
                const reversalResponse = await this.sendReversalRequest(client, reversalRequestData);
                console.log(reversalData);
                const actionType = reversalRequestData.reversalType === 'C'
                    ? 'Annulation'
                    : 'Remboursement';
                console.log(`🎉 ✅ ${actionType} réussi!`);
                return {
                    success: !!(reversalResponse.refundTotalAmount ||
                        reversalResponse.refundFeeAmount ||
                        reversalResponse.transactionDateTime,
                        reversalResponse.totalCheckAmount),
                    reversalResponse: reversalResponse,
                    transactionInfo: transactionInfo,
                    errorMessage: null,
                };
            }
            catch (error) {
                const errorMessage = MoneyGramHelper_1.MoneyGramHelper.parseError(error.message);
                if ((errorMessage.includes('605') ||
                    errorMessage.includes('3401') ||
                    errorMessage.includes('same day')) &&
                    reversalRequestData.reversalType === 'C') {
                    console.log('⚠️ Erreur same-day detectée malgré la détection automatique, retry avec reversalType = R...');
                    reversalRequestData.reversalType = 'R';
                    reversalRequestData.communicationRetryIndicator = true;
                    try {
                        const refundResponse = await this.sendReversalRequest(client, reversalRequestData);
                        console.log('🎉 ✅ Remboursement réussi (fallback)!');
                        return {
                            success: true,
                            reversalResponse: refundResponse,
                            transactionInfo: transactionInfo,
                            errorMessage: null,
                        };
                    }
                    catch (refundError) {
                        console.error('❌ Erreur lors du remboursement (fallback):', refundError.message);
                        return {
                            success: false,
                            reversalResponse: null,
                            transactionInfo: transactionInfo,
                            errorMessage: MoneyGramHelper_1.MoneyGramHelper.parseError(refundError.message),
                        };
                    }
                }
                else {
                    const actionType = reversalRequestData.reversalType === 'C'
                        ? "l'annulation"
                        : 'le remboursement';
                    console.error(`❌ Erreur lors de ${actionType}:`, error.message);
                    return {
                        success: false,
                        reversalResponse: null,
                        transactionInfo: transactionInfo,
                        errorMessage: errorMessage,
                    };
                }
            }
        }
        catch (error) {
            console.error('❌ Erreur dans le processus de reversal:', error.message);
            return {
                success: false,
                reversalResponse: null,
                transactionInfo: null,
                errorMessage: MoneyGramHelper_1.MoneyGramHelper.parseError(error.message),
            };
        }
    }
}
exports.MoneyGramReversalProvider = MoneyGramReversalProvider;
//# sourceMappingURL=MoneyGramReversalProvider.js.map