import { MtnApiOperation, MtnApiRessource, MtnCountry } from './MtnApiProvider';
import { Environment } from 'mtn-momo/lib/common';
export declare type MtnConfig = {
    primaryKey: string;
    secondaryKey: string;
    apiUserId: string;
    callback: string;
    baseUrl: string;
    apiUserKey: string;
    envTarget: Environment;
    ressource: MtnApiRessource;
    operation: MtnApiOperation;
    currency: 'EUR' | 'XOF';
};
export declare const mtnApiConfig: (country: MtnCountry) => {
    remittance: MtnConfig;
    collection: MtnConfig;
};
