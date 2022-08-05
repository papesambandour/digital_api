import { BaseEntity } from 'typeorm';
import { SousServices } from './SousServices.entity';
import { Transactions } from './Transactions.entity';
export declare class MessageUssds extends BaseEntity {
    id: number;
    transactionsId: number | null;
    content: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    isMatched: number;
    sousServicesId: number;
    phonesId: number;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    sousServices: SousServices;
    transactions: Transactions;
}
