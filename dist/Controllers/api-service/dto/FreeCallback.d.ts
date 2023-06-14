export declare class FreeCallbackData {
    operationType: 'DEBIT' | 'CASHOUT' | 'MERCHPAY';
    status: 'APPROVED' | 'REJECTED';
    amount: string;
    fId: string;
    externalId: string;
}
