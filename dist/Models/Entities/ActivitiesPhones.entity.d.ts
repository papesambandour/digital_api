import { BaseEntity } from 'typeorm';
import { Phones } from './Phones.entity';
import { EnumActivitiesPhones } from './Enum.entity';
export declare class ActivitiesPhones extends BaseEntity {
    id: number;
    message: string;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    activity: EnumActivitiesPhones;
    createdAt: Date;
    updatedAt: Date | null;
    phonesId: number;
    phones: Phones;
}
