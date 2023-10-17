import { ApiManagerInterface, BalanceParams, BalanceResponse, CallbackParams, CheckParams, CheckResponse, ConfirmParams, ConfirmResponse, InitParams, InitResponse, RefundParams, RefundResponse, CallbackResponse } from '../api-manager-interface/api-manager-interface.service';
export declare class MoovBjCashInApiManagerService extends ApiManagerInterface {
    static MOOV_BJ_LAST_BALANCE_MESSAGE: string;
    static MOOV_BJ_LAST_BALANCE: any;
    checkStatusTransaction(params: CheckParams): Promise<CheckResponse>;
    confirmTransaction(params: ConfirmParams): Promise<ConfirmResponse>;
    getBalance(params: BalanceParams): Promise<BalanceResponse>;
    handleCallbackTransaction(params: CallbackParams): Promise<CallbackResponse>;
    initTransaction(params: InitParams): Promise<InitResponse>;
    refundTransaction(params: RefundParams): Promise<RefundResponse>;
}
