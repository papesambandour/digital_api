import { BaseEntity } from 'typeorm';
import { Phones } from './Phones.entity';
import { OperationEnumPhone } from './Enum.entity';
export declare class OperationPhones extends BaseEntity {
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
    phonesId: number;
    operation: OperationEnumPhone;
    operationPhonesId: number | null;
    soldeBefor: number;
    soldeAfter: number;
    soldeApiBefor: number;
    soldeApiAfter: number;
    operationPhones_2: OperationPhones;
    operationPhones: OperationPhones[];
    phones: Phones;
}
