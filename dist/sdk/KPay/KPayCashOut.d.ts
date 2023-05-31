import { BalanceResponse, ConfirmParams } from '../../Controllers/api-service/api-manager-interface/api-manager-interface.service';
export declare class KPayCashOut {
    static getToken(): Promise<string>;
    static requestToPay(param: {
        correlationReference: string;
        amount: number;
        description: string;
        phone: string;
        partnerName: string;
    }): Promise<any>;
    static confirmPaymentFunction(params: ConfirmParams): Promise<any>;
    static getBalance(): Promise<BalanceResponse>;
}
