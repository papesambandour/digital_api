export declare class DtoServices {
    id: number;
    name: string;
    icon: string;
    code: string;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    createdAt: Date;
    updatedAt: Date | null;
    operatorsId: number;
    accecptePhone: number;
    solde: number;
    amountReserved: number;
    alertLevel_1Solde: number;
    alertLevel_2Solde: number;
    alertLevel_3Solde: number;
    alertLevel_4Solde: number;
    alertLevel_5Solde: number;
    categoriesServicesId: number;
}
