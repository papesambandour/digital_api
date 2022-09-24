import { SousServices } from './SousServices.entity';
import { Transactions } from './Transactions.entity';
import { CustomBaseModel } from './CustomBaseModel';
import { Phones } from './Phones.entity';
export declare class MessageUssds extends CustomBaseModel {
    id: number;
    transactionsId: number | null;
    sousServicesId: number | null;
    content: string | null;
    shaSubContent: string | null;
    sender: string | null;
    messagerie: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    isMatched: number;
    phonesId: number;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    sousServices: SousServices;
    transactions: Transactions;
    phone: Phones;
}
