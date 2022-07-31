import { BaseEntity } from 'typeorm';
import { Phones } from './Phones.entity';
import { SousServices } from './SousServices.entity';
export declare class SousServicesPhones extends BaseEntity {
    id: number;
    sousServicesId: number;
    phonesId: number;
    createdAt: Date;
    updatedAt: Date | null;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    phones: Phones;
    sousServices: SousServices;
}
