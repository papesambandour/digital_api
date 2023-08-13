import { Services } from './Services.entity';
import { Country } from './Country.entity';
import { CustomBaseModel } from './CustomBaseModel';
export declare class Operators extends CustomBaseModel {
    id: number;
    name: string;
    icon: string;
    code: string;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    countriesId: number;
    updatedAt: Date;
    createdAt: Date | null;
    services: Services[];
    country: Country;
}
