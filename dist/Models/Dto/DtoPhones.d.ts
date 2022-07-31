export declare class DtoPhones {
    id: number;
    solde: number;
    number: string;
    uid: string;
    imei: string;
    lgd: string;
    ltd: string;
    pin: string;
    codeSecret: string;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    createdAt: Date;
    updatedAt: Date | null;
    socket: 'CONNECTED' | 'DISCONNECTED';
    amountReserved: number;
    maxSolde: number;
    alertLevel_1Solde: number;
    alertLevel_2Solde: number;
    alertLevel_3Solde: number;
    alertLevel_4Solde: number;
    alertLevel_5Solde: number;
    servicesId: number;
}
