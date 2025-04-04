declare class Payer {
    partyIdType: string;
    partyId: string;
}
export declare class MtnBjCallbackData {
    financialTransactionId: string;
    externalId: string;
    amount: number;
    currency: string;
    payer: Payer;
    payeeNote: string;
    status: 'FAILED' | 'SUCCESSFUL';
    reason: string;
}
export {};
