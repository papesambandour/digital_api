export declare class DtoMessageUssds {
    id: number;
    transactionsId: number | null;
    content: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    sousServicesId: number;
    phonesId: number;
    isMatched: number;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
}