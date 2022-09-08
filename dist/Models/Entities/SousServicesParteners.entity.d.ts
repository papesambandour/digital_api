import { Parteners } from './Parteners.entity';
import { SousServices } from './SousServices.entity';
import { CustomBaseModel } from './CustomBaseModel';
export declare class SousServicesParteners extends CustomBaseModel {
    id: number;
    sousServicesId: number;
    partenersId: number;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    createdAt: Date;
    updatedAt: Date | null;
    parteners: Parteners;
    sousServices: SousServices;
}
