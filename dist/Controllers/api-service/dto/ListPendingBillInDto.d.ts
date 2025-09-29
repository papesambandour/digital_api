import { MoneygramSendData } from '../../../sdk/MoneyGram/MoneygramInterface';
export declare class ListPendingBillInDto {
    apiKey: string;
    codeService: string;
    billAccountNumber?: string;
}
export declare class MoneygramReceptionInfo {
    apiKey: string;
    codeService: string;
    referenceNumber?: string;
}
export declare class MoneygramSendInfo {
    apiKey: string;
    codeService: string;
    amount: number;
    moneygramSendData?: MoneygramSendData;
}
