export declare class FreeCallbackData {
    operationType: 'DEBIT' | 'CASHOUT' | 'MERCHPAY' | 'FRECASHOUT';
    status: 'APPROVED' | 'REJECTED';
    amount: string;
    fId: string;
    externalId: string;
}
