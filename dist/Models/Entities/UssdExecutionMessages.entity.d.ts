import { Phones } from './Phones.entity';
import { Transactions } from './Transactions.entity';
import { CustomBaseModel } from './CustomBaseModel';
import { SousServices } from './SousServices.entity';
export declare class UssdExecutionMessages extends CustomBaseModel {
    id: number;
    message: string;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    createdAt: Date;
    updatedAt: Date | null;
    phonesId: number;
    transationsId: number;
    sousServicesId: number | null;
    phones: Phones;
    transactions: Transactions;
    sousServices: SousServices;
}
