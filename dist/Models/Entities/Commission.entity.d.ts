import { Parteners } from './Parteners.entity';
import { SousServices } from './SousServices.entity';
import { CustomBaseModel } from './CustomBaseModel';
export declare class Commission extends CustomBaseModel {
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
