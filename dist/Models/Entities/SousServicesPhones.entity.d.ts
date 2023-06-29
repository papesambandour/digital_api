import { Phones } from './Phones.entity';
import { SousServices } from './SousServices.entity';
import { CustomBaseModel } from './CustomBaseModel';
export declare class SousServicesPhones extends CustomBaseModel {
    id: number;
    sousServicesId: number;
    phonesId: number;
    createdAt: Date;
    updatedAt: Date | null;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    phones: Phones;
    sousServices: SousServices;
}
