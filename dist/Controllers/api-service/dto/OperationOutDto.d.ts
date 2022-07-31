export declare class OperationOutDto {
    phone: string;
    amount: string;
    codeService: string;
    transactionId: string;
    status: 'SUCCESS' | 'PENDING' | 'PROCESSING' | 'FAILLED' | 'CANCELED';
    externalTransactionId: string;
    callbackUrl: string;
}
