export declare class SetFailedDtoIn {
    id: number;
    message: string;
}
export declare class SetAutoStatusIn {
    paymentBatchId: string;
    country: 'sn' | 'ci';
}
export declare class SetSuccessDtoIn {
    id: number;
    message: string;
}
export declare class ResendCallbackDtoIn {
    id: number;
}
export declare class SetSuccessFailedDtoOut {
    id: number;
    statutTreatment: 'SUCCESS' | 'FAILED';
    messageTreatment: string;
}
export declare class SetAutoWaveDtoOut {
    transactionId?: string;
    paymentBatchId: string;
    statutTreatment: 'SUCCESS' | 'FAILED' | 'PENDING';
    statusTransaction?: string;
    messageTreatment: string;
}
export declare class ResendCallbackDtoOut {
    id: number;
    statutTreatment: 'SUCCESS' | 'FAILED';
    messageTreatment: string;
    responseCallback?: any | undefined;
}
