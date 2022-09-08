import { Phones } from './Phones.entity';
import { Transactions } from './Transactions.entity';
import { CustomBaseModel } from './CustomBaseModel';
export declare class UssdExecutionMessages extends CustomBaseModel {
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
