export declare class SetFailedDtoIn {
    id: number;
    message: string;
}
export declare class SetSuccessDtoIn {
    id: number;
    message: string;
}
export declare class SetSuccessFailedDtoOut {
    id: number;
    statutTreatment: 'SUCCESS' | 'FAILED';
    messageTreatment: string;
}
