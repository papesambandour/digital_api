import { MtnConfig } from './config';
import { ApiManagerInterface, CheckParams, CheckResponse } from '../../Controllers/api-service/api-manager-interface/api-manager-interface.service';
export declare type MtnCountry = 'bj';
export declare type MtnApiRessource = 'disbursement' | 'collection';
export declare type MtnApiOperation = 'requesttopay' | 'deposit' | 'transfer';
export declare class MtnApiProvider {
    static apiBaseUrl: string;
    static base64(str: any): string;
    static getAuthToken(config: MtnConfig, from: any): Promise<{
        access_token?: string;
        message?: string;
        success: boolean;
    }>;
    static getBalance(mtnManager: any): Promise<any>;
    static initOperation(param: {
        amount: number;
        phoneNumber: string;
        reference: string;
        externalId: string;
    }, config: MtnConfig, payerNote: string, payeeNote: string): Promise<any>;
    static checkOperationStatus(apiManager: ApiManagerInterface, params: CheckParams, mtnManager: any): Promise<CheckResponse>;
    static getCollection(country: MtnCountry): Promise<any>;
    static getRemittance(country: MtnCountry): Promise<any>;
    static getMessageFromCode(reason: any): string;
}
