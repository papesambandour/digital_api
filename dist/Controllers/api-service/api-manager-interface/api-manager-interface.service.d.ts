import { Transactions } from '../../../Models/Entities/Transactions.entity';
import { OperationInDto } from '../dto/OperationInDto';
import { OperationOutDto } from '../dto/OperationOutDto';
import { Request } from 'express';
import { Phones } from '../../../Models/Entities/Phones.entity';
import { Connection } from 'typeorm';
import { HelperService } from '../../../helper.service';
import { HttpService } from '@nestjs/common';
import { ApiServiceService } from '../api-service.service';
export declare type InitParams = {
    dto: OperationInDto;
};
export declare type InitResponse = OperationOutDto & {
    partnerMessage?: string;
    transaction: Transactions;
    codeHttp: string;
    refundOnFailed: boolean;
    usedPhoneId?: number;
    data?: any;
};
export declare type ConfirmParams = {
    transaction: Transactions;
};
export declare type ConfirmResponse = OperationOutDto & {
    partnerMessage?: string;
    codeHttp: string;
};
export declare type RefundParams = {
    transaction: Transactions;
};
export declare type RefundResponse = OperationOutDto & {
    partnerMessage?: string;
    codeHttp: string;
};
export declare type CheckParams = {
    transaction: Transactions;
};
export declare type CheckResponse = OperationOutDto & {
    partnerMessage?: string;
    codeHttp: string;
};
export declare type CallbackParams = {
    request: Request;
    codeHttp: string;
};
export declare type CallbackResponse = OperationOutDto & {
    partnerMessage?: string;
};
export declare type BalanceParams = {};
export declare type BalanceResponse = {
    success: boolean;
    newBalance: number;
};
export declare const MANAGER_INIT_CASH_IN_SUCCESS_MESSAGE = "Votre op\u00E9ration s'est effectu\u00E9e sans erreur. Veuillez attendre le callback pour avoir l'\u00E9tat final de la transaction";
export declare const MANAGER_INIT_CASH_OUT_SUCCESS_MESSAGE = "Votre op\u00E9ration s'est effectu\u00E9e sans erreur, Vous allez recevoir un message de confirmation";
export declare const MANAGER_INIT_DOWN_MESSAGE = "Le services est indisponible pour le moment(pho)";
export declare const MANAGER_INIT_UNKNOWN_MESSAGE = "Une erreur inconnue s'est produite";
export declare abstract class ApiManagerInterface {
    protected readonly connection: Connection;
    helper: HelperService;
    protected httpService: HttpService;
    protected apiService?: ApiServiceService;
    constructor(connection: Connection, helper: HelperService, httpService: HttpService, apiService?: ApiServiceService);
    abstract initTransaction(params: InitParams): Promise<InitResponse>;
    abstract getBalance(params: BalanceParams): Promise<BalanceResponse>;
    abstract checkStatusTransaction(params: CheckParams): Promise<CheckResponse>;
    abstract confirmTransaction(params: ConfirmParams): Promise<ConfirmResponse>;
    abstract refundTransaction(params: RefundParams): Promise<RefundResponse>;
    abstract handleCallbackTransaction(params: CallbackParams): Promise<CallbackResponse>;
    notImplementedYet(params: any): Promise<any>;
    createTransaction(phone: Phones): Promise<Transactions>;
    loadBalancingPhone(): Promise<Phones>;
    activePhone(phoneId: number, phoneNumber: string): Promise<void>;
    disablePhone(phoneId: number, phoneNumber: string): Promise<void>;
}
