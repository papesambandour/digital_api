export declare class OperationOutDto {
    phone: string;
    amount: string;
    codeService: string;
    transactionId?: string;
    status: 'SUCCESS' | 'PENDING' | 'PROCESSING' | 'FAILLED' | 'CANCELED' | 'NOT_IMPLEMENTED';
    externalTransactionId: string;
    callbackUrl: string;
}
