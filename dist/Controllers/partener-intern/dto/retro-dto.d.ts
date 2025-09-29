export declare class RetroDtoIn {
    transactionId: number;
    codeService: string;
    motif: string | undefined;
    amount: number | undefined;
}
export declare class RetroDtoOut {
    message: string;
    statutTreatment?: 'SUCCESS' | 'FAILED';
    apiResponse: any;
}
