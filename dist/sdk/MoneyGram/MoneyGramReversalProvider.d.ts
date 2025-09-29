import { AgentCredentials, SendReversalResponseData, DetailLookupResponse, MoneyGramReversalData } from './MoneygramInterface';
export declare class MoneyGramReversalProvider {
    private WSDL_URL;
    private agentCredentials;
    private apiVersion;
    private clientSoftwareVersion;
    constructor(agentCredentials: AgentCredentials);
    private createSOAPClient;
    private createRequest;
    private determineReversalType;
    private detailLookup;
    private sendReversalRequest;
    reverse(reversalData: MoneyGramReversalData): Promise<{
        success: boolean;
        reversalResponse: SendReversalResponseData | null;
        transactionInfo: DetailLookupResponse | null;
        errorMessage: string | null;
    }>;
}
