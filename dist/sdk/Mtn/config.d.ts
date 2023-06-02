import { MtnApiOperation, MtnApiRessource, MtnCountry } from './MtnApiProvider';
export declare type MtnConfig = {
    primaryKey: string;
    secondaryKey: string;
    apiUserId: string;
    callback: string;
    apiUserKey: string;
    envTarget: string;
    ressource: MtnApiRessource;
    operation: MtnApiOperation;
    currency: 'EUR' | 'XOF';
};
export declare const mtnApiConfig: (country: MtnCountry) => {
    remittance: MtnConfig;
    collection: MtnConfig;
};
