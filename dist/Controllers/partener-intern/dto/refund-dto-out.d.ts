import { StatusEnum } from '../../../Models/Entities/Enum.entity';
export declare class RefundDtoIn {
    transactionId: number;
}
export declare class RefundDtoOut {
    status: StatusEnum;
    message: string;
}
