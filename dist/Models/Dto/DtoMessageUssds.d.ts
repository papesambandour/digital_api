export declare class DtoMessageUssds {
    id: number;
    content: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    sousServicesId: number;
    isMatched: number;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
}
