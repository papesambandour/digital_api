import { MtnConfig } from './config';
import { ApiManagerInterface, CheckParams, CheckResponse } from '../../Controllers/api-service/api-manager-interface/api-manager-interface.service';
export declare type MtnCountry = 'ci';
export declare type MtnApiRessource = 'remittance' | 'collection';
export declare type MtnApiOperation = 'requesttowithdraw' | 'transfer';
export declare class MtnApiProvider {
    static apiBaseUrl: string;
    static base64(str: any): string;
    static getAuthToken(config: MtnConfig): Promise<{
        access_token?: string;
        message?: string;
        success: boolean;
    }>;
    static getBalance(config: MtnConfig): Promise<any>;
    static initOperation(param: {
        amount: number;
        phoneNumber: string;
        reference: string;
        externalId: string;
    }, config: MtnConfig, payerNote: string, payeeNote: string): Promise<any>;
    static checkOperationStatus(apiManager: ApiManagerInterface, params: CheckParams, config: MtnConfig): Promise<CheckResponse>;
}
