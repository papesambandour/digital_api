import { AgentCredentials, CommitTransactionResponse, FeeLookupResponse, GetFieldsForProductResponse, MoneyGramConsumerLookupResponse, SendServiceReceiverDetails, SendServiceSenderDetails, SendValidationResponse } from './MoneygramInterface';
export declare class MoneyGramSendProvider {
    private WSDL_URL;
    private agentCredentials;
    private apiVersion;
    private clientSoftwareVersion;
    constructor(agentCredentials: AgentCredentials);
    private createSOAPClient;
    private createRequest;
    private customerLookup;
    private feeLookup;
    private collectRequiredFields;
    private validateSendRequest;
    private commitTransaction;
    sendMoney(sendAmount: number, senderDetails: SendServiceSenderDetails, receiverDetails: SendServiceReceiverDetails, onlyGetInfo?: boolean): Promise<{
        success: boolean;
        commitTransactionResponse: CommitTransactionResponse | null;
        feeLookupResponse: FeeLookupResponse | null;
        customerLookupResponse: MoneyGramConsumerLookupResponse | null;
        sendValidationResponse: SendValidationResponse | null;
        requiredFieldsResponse: GetFieldsForProductResponse | null;
        errorMessage: null | string;
    }>;
}
