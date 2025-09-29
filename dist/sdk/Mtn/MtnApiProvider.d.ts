import { ApiManagerInterface, CheckParams, CheckResponse } from '../../Controllers/api-service/api-manager-interface/api-manager-interface.service';
export declare type MtnCountry = 'bj' | 'ci';
export declare type MtnApiRessource = 'disbursement' | 'collection';
export declare type MtnApiOperation = 'requesttopay' | 'transfer';
export declare class MtnApiProvider {
    static base64(str: any): string;
    static getBalance(mtnManager: any): Promise<any>;
    static wait(ms: any): Promise<unknown>;
    static getTransactionWithTimeout(mtnManager: any, transactionId: any, timeout: any): Promise<any>;
    static checkOperationStatus(apiManager: ApiManagerInterface, params: CheckParams, mtnManager: any): Promise<CheckResponse>;
    static getCollection(country: MtnCountry): Promise<any>;
    static getRemittance(country: MtnCountry): Promise<any>;
    static getMessageFromCode(reason: any): string;
    private static getHostFromUrl;
}
