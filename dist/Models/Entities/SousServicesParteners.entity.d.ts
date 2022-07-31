import { BaseEntity } from 'typeorm';
import { Parteners } from './Parteners.entity';
import { SousServices } from './SousServices.entity';
export declare class SousServicesParteners extends BaseEntity {
    id: number;
    sousServicesId: number;
    partenersId: number;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    createdAt: Date;
    updatedAt: Date | null;
    parteners: Parteners;
    sousServices: SousServices;
}
