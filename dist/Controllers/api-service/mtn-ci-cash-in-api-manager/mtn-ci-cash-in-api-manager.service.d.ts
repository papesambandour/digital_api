import { ApiManagerInterface, BalanceParams, BalanceResponse, CallbackParams, CheckParams, CheckResponse, ConfirmParams, ConfirmResponse, InitParams, InitResponse, RefundParams, RefundResponse, CallbackResponse } from '../api-manager-interface/api-manager-interface.service';
import { MtnCountry } from '../../../sdk/Mtn/MtnApiProvider';
export declare class MtnCiCashInApiManagerService extends ApiManagerInterface {
    static country: MtnCountry;
    checkStatusTransaction(params: CheckParams): Promise<CheckResponse>;
    confirmTransaction(params: ConfirmParams): Promise<ConfirmResponse>;
    getBalance(params: BalanceParams): Promise<BalanceResponse>;
    handleCallbackTransaction(params: CallbackParams): Promise<CallbackResponse>;
    initTransaction(params: InitParams): Promise<InitResponse>;
    refundTransaction(params: RefundParams): Promise<RefundResponse>;
}
