export declare class DtoPartenerComptes {
    id: number;
    typePartenerCompte: 'API' | 'CAISSE';
    partenersId: number;
    createdAt: Date;
    updatedAt: Date | null;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    name: string;
    appKey: string | null;
}
