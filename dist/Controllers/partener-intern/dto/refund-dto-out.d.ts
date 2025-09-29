import { StatusEnum } from '../../../Models/Entities/Enum.entity';
export declare class RefundDtoIn {
    transactionId: number | string;
    apiKey: string;
    moneyGramOperatorName?: string;
    moneyGramSendReversalReason?: 'NO_RCV_LOC' | 'WRONG_SERVICE' | 'NO_TQ' | 'INCORRECT_AMT' | 'MS_NOT_USED';
    moneyGramFeeRefund?: 'Y' | 'N';
    moneyGramAgentCheckNumber?: string;
    moneyGramAgentCheckType?: 'MTC';
}
export declare class RefundDtoOut {
    status: StatusEnum;
    message: string;
    statutTreatment?: 'SUCCESS' | 'FAILED';
}
