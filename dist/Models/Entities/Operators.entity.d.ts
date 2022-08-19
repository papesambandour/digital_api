import { BaseEntity } from 'typeorm';
import { Services } from './Services.entity';
import { Country } from './Country.entity';
export declare class Operators extends BaseEntity {
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
