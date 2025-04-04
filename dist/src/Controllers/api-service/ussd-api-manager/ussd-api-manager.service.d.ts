import { ApiManagerInterface, BalanceParams, BalanceResponse, CallbackParams, CallbackResponse, CheckParams, CheckResponse, ConfirmParams, ConfirmResponse, InitParams, InitResponse, RefundParams, RefundResponse } from '../api-manager-interface/api-manager-interface.service';
import { Phones } from '../../../Models/Entities/Phones.entity';
import { Transactions } from '../../../Models/Entities/Transactions.entity';
import { SocketBodyFinish } from '../../../Models/MobileSocket/SocketModel';
export declare class UssdApiManagerService extends ApiManagerInterface {
    private data;
    initTransaction(params: InitParams): Promise<InitResponse>;
    checkStatusTransaction(params: CheckParams): Promise<CheckResponse>;
    confirmTransaction(params: ConfirmParams): Promise<ConfirmResponse>;
    handleCallbackTransaction(params: CallbackParams): Promise<CallbackResponse>;
    refundTransaction(params: RefundParams): Promise<RefundResponse>;
    executeUssdCall(phone: Phones, transaction: Transactions): Promise<boolean>;
    finishExecUssd(socketBodyFinish: SocketBodyFinish, transaction: Transactions): Promise<boolean>;
    getUssDCode(regexCodeUss: string, phone: Phones): string;
    getBalance(params: BalanceParams): Promise<BalanceResponse>;
    private executeSms;
}
