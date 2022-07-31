import { BaseEntity } from 'typeorm';
import { Parteners } from './Parteners.entity';
import { Transactions } from './Transactions.entity';
export declare class PartenerComptes extends BaseEntity {
    id: number;
    typePartenerCompte: 'API' | 'CAISSE';
    partenersId: number;
    createdAt: Date;
    updatedAt: Date | null;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    name: string;
    appKey: string | null;
    parteners: Parteners;
    transactions: Transactions[];
}
