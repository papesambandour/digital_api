import { BaseEntity } from 'typeorm';
import { Parteners } from './Parteners.entity';
import { Transactions } from './Transactions.entity';
import { OperationEnum } from './Enum.entity';
export declare class OperationParteners extends BaseEntity {
    id: number;
    commentaire: string | null;
    amount: number;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    createdAt: Date;
    updatedAt: Date | null;
    typeOperation: 'DEBIT' | 'CREDIT';
    statut: 'SUCCESS' | 'PENDING' | 'PROCESSING' | 'FAILLED' | 'CANCELED';
    dateCreation: Date;
    dateSuccess: Date | null;
    dateCanceled: Date | null;
    dateProcessing: Date | null;
    dateFailled: Date | null;
    partenersId: number;
    transactionsId: number | null;
    operation: OperationEnum;
    fee: number;
    commission: number;
    soldeBefor: number;
    soldeAfter: number;
    parteners: Parteners;
    transactions: Transactions;
}
