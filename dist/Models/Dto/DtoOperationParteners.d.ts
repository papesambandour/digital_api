import { OperationEnum } from '../Entities/Enum.entity';
export declare class DtoOperationParteners {
    id: number;
    commentaire: string;
    amount: number;
    fee: number;
    commission: number;
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
    soldeBefor: number;
    soldeAfter: number;
}
