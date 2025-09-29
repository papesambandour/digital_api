export declare class DtoParteners {
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    solde: number;
    amountReserved: number;
    name: string;
    phone: string;
    email: string;
    adress: string | null;
    password: string;
    firstConnection: number;
    passwordExpired: Date;
    passwordDurationDay: number;
}
