import { ApiManagerInterface, BalanceParams, BalanceResponse, CallbackParams, CallbackResponse, CheckParams, CheckResponse, ConfirmParams, ConfirmResponse, InitParams, InitResponse, RefundParams, RefundResponse } from '../api-manager-interface/api-manager-interface.service';
export declare class WizallMoneySnCashInApiManagerService extends ApiManagerInterface {
    checkStatusTransaction(params: CheckParams): Promise<CheckResponse>;
    confirmTransaction(params: ConfirmParams): Promise<ConfirmResponse>;
    getBalance(params: BalanceParams): Promise<BalanceResponse>;
    handleCallbackTransaction(params: CallbackParams): Promise<CallbackResponse>;
    initTransaction(params: InitParams): Promise<InitResponse>;
    refundTransaction(params: RefundParams): Promise<RefundResponse>;
}
