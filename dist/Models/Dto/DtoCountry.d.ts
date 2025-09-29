export declare class DtoCountry {
    id: number;
    name: string;
    capital: string;
    callingCodes: string;
    flag: string;
    code: string;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    updatedAt: Date;
    createdAt: Date | null;
}
