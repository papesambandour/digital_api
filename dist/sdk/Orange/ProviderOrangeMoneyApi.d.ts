import { ApiManagerInterface, BalanceParams, BalanceResponse, CheckParams, CheckResponse } from '../../Controllers/api-service/api-manager-interface/api-manager-interface.service';
import { Transactions } from '../../Models/Entities/Transactions.entity';
import { HelperService } from '../../helper.service';
interface OmApiResponse {
    success: boolean;
    code: OmApiStatusCode | string;
    message: string | undefined;
    qrCode?: string | undefined;
    deepLink?: string | undefined;
    transaction?: OmApiTransaction;
    externalReference?: string | null;
    newBalance?: number | null | undefined;
    apiResponse: any;
    account?: {
        balance: number;
    };
    transaction_check_status?: 'success' | 'pending' | 'failed' | undefined | null;
}
declare type OmApiStatusCode = 'success' | 'blocked_account' | 'balance_insufficient' | 'unknown_error' | 'daily_limit' | 'weekly_limit' | 'monthly_limit' | 'no_account' | 'suspended_account';
interface OmApiTransaction {
    amount?: number | undefined;
    phoneNumber?: string | undefined;
    identifier?: string;
    externalReference?: string | undefined;
    initialIdentifier?: string | undefined;
}
export default class ProviderOrangeMoneyApi {
    static getInstance(): ProviderOrangeMoneyApi;
    private static readonly appUrl;
    private readonly clientId;
    private readonly clientSecret;
    private readonly merchantCode;
    private readonly distributorPhoneNumber;
    private readonly distributorPinPhoneNumber;
    private readonly receiveNotification;
    private authToken;
    private publicRsaKey?;
    private constructor();
    sendTransaction(transaction: OmApiTransaction): Promise<OmApiResponse>;
    changePin(args: any): Promise<OmApiResponse>;
    initMerchantPayment(transaction: OmApiTransaction): Promise<OmApiResponse>;
    initQrCodeMerchantPayment(transaction: OmApiTransaction, partnerName: string, callbackSuccess: string, callbackFailed: string): Promise<OmApiResponse>;
    getPhoneInfo(transaction: OmApiTransaction): Promise<OmApiResponse>;
    checkTransactionStatus(transaction: OmApiTransaction): Promise<OmApiResponse>;
    checkQrCodeTransactionStatus(transaction: Transactions, helper: HelperService): Promise<OmApiResponse>;
    getBalance(): Promise<OmApiResponse>;
    private doAuth;
    private getPublicKey;
    private encryptRsaPin;
    private static prepareTransaction;
    private static getAPiErrorCode;
    static getMessageFromCode(code: string): any;
    static errorMessage: {
        success: string;
        blocked_account: string;
        balance_insufficient: string;
        unknown_error: string;
        daily_limit: string;
        weekly_limit: string;
        monthly_limit: string;
        no_account: string;
        suspended_account: string;
    };
    static apiManagerCheckStatusTransaction(apiManager: ApiManagerInterface, params: CheckParams): Promise<CheckResponse>;
    static apiManagerGetBalance(params: BalanceParams): Promise<BalanceResponse>;
}
export {};
