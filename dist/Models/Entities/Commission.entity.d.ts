import { BaseEntity } from 'typeorm';
import { Parteners } from './Parteners.entity';
import { SousServices } from './SousServices.entity';
export declare class Commission extends BaseEntity {
    id: number;
    amountStart: number;
    amountEnd: number;
    amountCommssion: number;
    tauxCommission: number;
    tauxFee: number;
    amountFee: number;
    commissionIsFixe: number;
    feeIsFixe: number;
    partenersId: number;
    sousServicesId: number;
    createdAt: Date;
    updatedAt: Date | null;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    parteners: Parteners;
    sousServices: SousServices;
}
