import { BaseEntity } from 'typeorm';
import { Phones } from './Phones.entity';
import { Transactions } from './Transactions.entity';
export declare class UssdExecutionMessages extends BaseEntity {
    id: number;
    message: string;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    createdAt: Date;
    updatedAt: Date | null;
    phonesId: number;
    transationsId: number;
    phones: Phones;
    transations: Transactions;
}
