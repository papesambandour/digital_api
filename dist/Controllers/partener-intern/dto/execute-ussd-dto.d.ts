export declare class ExecuteUssdIn {
    phoneId: number;
    ussd: string;
}
export declare class ExecuteUssdOut {
    message: string;
    statutTreatment?: 'SUCCESS' | 'FAILED';
    phoneId: number;
    ussd: string;
    ussd_response: string;
}
