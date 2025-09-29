import { ApiManagerInterface, BalanceParams, BalanceResponse, CallbackParams, CallbackResponse, CheckParams, CheckResponse, ConfirmParams, ConfirmResponse, InitParams, InitResponse, RefundParams, RefundResponse } from '../api-manager-interface/api-manager-interface.service';
import { Transactions } from '../../../Models/Entities/Transactions.entity';
import { BictorisCallbackData } from '../dto/BictorisCallback';
export declare class BictorisSNCashOutApiManagerService extends ApiManagerInterface {
    private static getBictorisProvider;
    checkStatusTransaction(params: CheckParams): Promise<CheckResponse>;
    confirmTransaction(params: ConfirmParams): Promise<ConfirmResponse>;
    handleCallbackTransaction(params: CallbackParams): Promise<CallbackResponse>;
    initTransaction(params: InitParams): Promise<InitResponse>;
    refundTransaction(params: RefundParams): Promise<RefundResponse>;
    getBalance(params: BalanceParams): Promise<BalanceResponse>;
    handleCallback(callbackData: BictorisCallbackData, transaction: Transactions): Promise<any>;
    private cleanTextField;
    private formatWebsite;
    private extractMerchantEmail;
    private createAndSetupMerchant;
    private completePartialMerchantSetup;
}
