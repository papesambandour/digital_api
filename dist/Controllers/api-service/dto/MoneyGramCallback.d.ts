export declare class DataToCollect {
    Code: number;
    dataCollection: string;
}
export declare class TransactionSubStatus {
    subStatus: string;
    message: string;
    targetCustomer: string;
    dataToCollect?: DataToCollect[];
}
export declare class EventPayload {
    transactionId: string;
    agentPartnerId: string;
    referenceNumber: string;
    partnerTransactionId?: string;
    transactionSendDate: string;
    transactionStatusDate: string;
    transactionStatus: string;
    transactionSubStatus?: TransactionSubStatus[];
}
export declare class MoneyGramCallback {
    eventId: string;
    eventDate: string;
    subscriptionId: string;
    subscriptionType: string;
    eventPayload: EventPayload;
}
