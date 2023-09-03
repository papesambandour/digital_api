import { BalanceResponse, CheckParams, CheckResponse } from '../../Controllers/api-service/api-manager-interface/api-manager-interface.service';
import { MoovBjCashOutApiManagerService } from '../../Controllers/api-service/moov-bj-cash-out-api-manager/moov-bj-cash-out-api-manager.service';
export declare class MoovProvider {
    static getAuthToken(): string;
    static makeTransferTo(param: {
        amount: number;
        phone: string;
        externalId: string;
        payeeMessage: string;
    }): Promise<{
        success: boolean;
        data?: any;
        referenceId?: string;
        message?: string;
    }>;
    static getBalance(message: string): Promise<BalanceResponse>;
    static checkTransaction(params: CheckParams, apiManagerService: MoovBjCashOutApiManagerService): Promise<CheckResponse>;
    static makeCheckout(params: {
        amount: number;
        phone: string;
        externalId: string;
        payerMessage: string;
    }): Promise<{
        success: boolean;
        data?: any;
        referenceId?: string;
        message?: string;
    }>;
    private static getErrorMessage;
}
