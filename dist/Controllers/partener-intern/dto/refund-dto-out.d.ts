import { StatusEnum } from '../../../Models/Entities/Enum.entity';
export declare class RefundDtoIn {
    transactionId: number | string;
    apiKey: string;
}
export declare class RefundDtoOut {
    status: StatusEnum;
    message: string;
    statutTreatment?: 'SUCCESS' | 'FAILED';
}
