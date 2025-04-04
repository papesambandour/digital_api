declare class Partner {
    idType: string;
    id: string;
}
declare class Customer {
    idType: string;
    id: string;
}
declare class Amount {
    value: number;
    unit: string;
}
declare class Metadata {
    successRedirectUrl: string;
    cancelRedirectUrl: string;
    idQr: string;
    reference_id: string;
}
export declare class OmCallbackData {
    partner?: Partner;
    customer?: Customer;
    amount?: Amount;
    type: string;
    paymentMethod: string;
    channel: string;
    reference: string;
    transactionId: string;
    createdAt: string | null;
    status: string;
    detail: string | null;
    metadata?: Metadata;
}
export {};
