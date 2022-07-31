import { BaseEntity } from 'typeorm';
import { Commission } from './Commission.entity';
import { OperationParteners } from './OperationParteners.entity';
import { PartenerComptes } from './PartenerComptes.entity';
import { PartenerSettings } from './PartenerSettings.entity';
import { SousServicesParteners } from './SousServicesParteners.entity';
import { Transactions } from './Transactions.entity';
export declare class Parteners extends BaseEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    solde: number;
    amountReserved: number;
    name: string;
    phone: string;
    email: string;
    adress: string | null;
    password: string;
    firstConnection: number;
    passwordExpired: Date;
    passwordDurationDay: number;
    commissions: Commission[];
    operationParteners: OperationParteners[];
    partenerComptes: PartenerComptes[];
    partenerSettings: PartenerSettings[];
    sousServicesParteners: SousServicesParteners[];
    transactions: Transactions[];
}
