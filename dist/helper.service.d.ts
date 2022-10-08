import { HttpService } from '@nestjs/common';
import { OperationEnumPhone, StatusEnum, TypeEvenEnum, TypeOperationEnum } from './Models/Entities/Enum.entity';
import { Connection } from 'typeorm';
import { Phones } from './Models/Entities/Phones.entity';
import { Transactions } from './Models/Entities/Transactions.entity';
import { ApiManagerInterface } from './Controllers/api-service/api-manager-interface/api-manager-interface.service';
import { SousServices } from './Models/Entities/SousServices.entity';
import { ApiServiceService } from './Controllers/api-service/api-service.service';
import { OperationInDto } from './Controllers/api-service/dto/OperationInDto';
import { ErrorTypes } from './Models/Entities/ErrorTypes.entity';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';
import { Claim } from './Models/Entities/Claim.entity';
export declare type Rib = {
    bankCode: RibItem;
    ribKey: RibItem;
    accountNumber: RibItem;
    branchCode: RibItem;
    rib: RibItem;
};
export declare type RibItem = {
    value: string | undefined | null;
    isValid: boolean;
};
export declare class HelperService {
    private readonly connection;
    private httpService;
    constructor(connection: Connection, httpService: HttpService);
    notifyAdmin(message: string, typeEvent: TypeEvenEnum, data?: {}, isCritic?: boolean, channelName?: any): Promise<void>;
    setSoldeTableOnly(value: number, tableName: string, id: number, field: string): Promise<any>;
    setSoldeTableFromValue(value: number, tableName: string, id: number, field: string): Promise<any>;
    incrementSolde(value: number, tableName: string, id: number, field: string): Promise<any>;
    operationPhone(phone: Phones, soldeApi: number, amount: number, transactionId: number, typeOperation: TypeOperationEnum, comment: string, operationId?: number | null, operation?: OperationEnumPhone): Promise<void>;
    waitSome(second: number): Promise<unknown>;
    waitSomeMs(ms: number): Promise<unknown>;
    mysqlDate(d: Date): string;
    getApiManagerInterface(codeService: string, apiService: ApiServiceService): Promise<ApiManagerInterface>;
    getTransactionById(transactionId: number, extraRelation?: any[]): Promise<Transactions>;
    getTransactionByGeneratedId(transactionId: string, extraRelation?: any[]): Promise<Transactions>;
    setIsCallbackReadyValue(transaction: Transactions): Promise<void>;
    setTimeOutDate(transaction: Transactions): Promise<void>;
    sendCallBack(transaction: Transactions): Promise<any>;
    addMinuteToDate(date: Date, minutes: number): Date;
    setSoldeTableForDebitOnly(sousServices: SousServices, value: number, tableName: string, id: number, field?: string): Promise<any>;
    setSoldeTableForCreditOnly(sousServices: SousServices, value: number, tableName: string, id: number, field?: string): Promise<any>;
    generateTransactionId(): string;
    generateRandomId(prefix: any, length?: number): string;
    operationPartnerDoTransaction(transaction: Transactions): Promise<void>;
    operationPartnerCancelTransaction(transaction: Transactions, isRefund?: boolean): Promise<boolean>;
    updateApiBalance(apiManager: ApiManagerInterface, usedPhoneId: number): Promise<void>;
    base64(str: any): Promise<string>;
    sendSms(tos: string[], message: string, sender: string, whatsappAlso?: boolean, whatsAppDelaySecond?: number): Promise<boolean>;
    getStatusAfterExec(execResult: 'success' | 'timeout' | 'failed', service: SousServices): {
        preStatus: any;
        status: any;
    };
    getColumnMap(model: string, dbKeyName: string): Promise<ColumnMetadata>;
    checkServiceConfig(): Promise<void>;
    private disableSousService;
    handleSuccessTransactionCreditDebit(transaction: Transactions, sousServiceTransactionId?: any): Promise<boolean>;
    isNotCancelable(preStatus: StatusEnum | any | string, status: StatusEnum | any | string): boolean;
    appendQueryParams(url: string, queryParams?: any): string;
    private getTransactionCallBackHash;
    sha256(data: string): string;
    b64ToFilePath(attachedMedia: string, attachedMediaExtension: string, attachedMediaName: string): Promise<string>;
    getAmountForMessenger(operationInDto: OperationInDto): Promise<number>;
    provideErrorType(transaction: Transactions, providedErrorMessage?: string | undefined, providedError?: ErrorTypes | undefined, defaultMessageIfUnknowNoError?: string | undefined): Promise<any>;
    getErrorType(errorMessage: string, codeSousService: string, amount: string): Promise<ErrorTypes | null>;
    alertForUnknownResponse(responseData: string, codeService: string, transactionId: number): void;
    ribFromString(rib: string, country?: 'sn' | 'ci'): Rib;
    getDeepLinkNotificationMessage(transaction: Transactions, deepLink: string): Promise<string>;
    canRefundOperation(transaction: Transactions): Promise<{
        allow: boolean;
        message: string;
    }>;
    handleTransactionRefundSuccess(transaction: Transactions): Promise<void>;
    escapeMysql(val: string): string;
    createClaimForTransaction(transaction: Transactions, subject: string, content: string): Promise<Claim>;
    private verseComissionForTransaction;
    uuid(): string;
    formatMoney(number: string | number, decimals?: number, dec_point?: string, thousands_sep?: string): any;
    private regexEscape;
    getNowDateWithoutSubUnity(): Date;
    getNowDateWithoutSecond(): Date;
    waitUntilSecondBetween(min: number, max: number): Promise<unknown>;
    convertCurrency(from: string, to: string, amount: number): number;
    getCurrencyList(): string[];
    runWithMaxWaitMs(call: () => Promise<any>, maxWaitMs: number): Promise<unknown>;
    getBalanceAlertTo(): string[];
    getSimDisconnectSenegalTo(): string[];
    getSimDisconnectIvoryCoastTo(): string[];
    notifySimDisconnected(phone: Phones): Promise<void>;
    notifySimConnected(phone: Phones): Promise<void>;
}
