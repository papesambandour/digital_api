export declare class DtoPartenerSettings {
    id: number;
    partenersId: number;
    name: string;
    value: string;
    type: string;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    createdAt: Date;
    updatedAt: Date | null;
}
