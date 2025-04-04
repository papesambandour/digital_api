import { AgentCredentials, ReferenceNumberResponse, GetFieldsForProductResponse, ReceiveValidationResponse, CommitTransactionResponse, ReceptionServiceReceiveDetails } from './MoneygramInterface';
export declare class MoneyGramReceiveProvider {
    private WSDL_URL;
    private agentCredentials;
    private apiVersion;
    private clientSoftwareVersion;
    constructor(agentCredentials: AgentCredentials);
    private createSOAPClient;
    private createRequest;
    private validateTransaction;
    private collectRequiredFields;
    private validateReceiveRequest;
    private commitTransaction;
    receiveMoney(amount: number, receptionServiceReceiveDetails: ReceptionServiceReceiveDetails): Promise<{
        success: boolean;
        commitTransactionResponse: CommitTransactionResponse | null;
        referenceNumberResponse: ReferenceNumberResponse | null;
        requiredFieldsResponse: GetFieldsForProductResponse | null;
        receiveValidationResponse: ReceiveValidationResponse | null;
        errorMessage: null | string;
    }>;
    checkReference(referenceNumber: string): Promise<{
        success: boolean;
        referenceNumberResponse: ReferenceNumberResponse | null;
        errorMessage: null | string;
    }>;
}
