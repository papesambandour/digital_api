import { BalanceResponse, CheckParams, CheckResponse } from '../../Controllers/api-service/api-manager-interface/api-manager-interface.service';
import { MoovBjCashOutApiManagerService } from '../../Controllers/api-service/moov-bj-cash-out-api-manager/moov-bj-cash-out-api-manager.service';
export declare class MoovProvider {
    static getAuthToken(): string;
    static makeTransferTo(phone: any, amount: any, referenceid: any, message: any): Promise<{
        success: boolean;
        rawData?: any;
        error?: any;
        message?: any;
        referenceId?: any;
    }>;
    static getBalance(message: string): Promise<BalanceResponse>;
    static checkTransaction(params: CheckParams, apiManagerService: MoovBjCashOutApiManagerService): Promise<CheckResponse>;
    static makeCheckout(phone: any, amount: any, referenceid: any, message: any): Promise<{
        success: boolean;
        rawData?: any;
        error?: any;
        referenceId?: string;
        message?: string;
    }>;
    private static getErrorMessage;
    static _checkTransactionById(transid: any): Promise<any>;
}
