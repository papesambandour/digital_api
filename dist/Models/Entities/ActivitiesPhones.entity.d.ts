import { Phones } from './Phones.entity';
import { EnumActivitiesPhones } from './Enum.entity';
import { CustomBaseModel } from './CustomBaseModel';
export declare class ActivitiesPhones extends CustomBaseModel {
    id: number;
    message: string;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    activity: EnumActivitiesPhones;
    createdAt: Date;
    updatedAt: Date | null;
    phonesId: number;
    phones: Phones;
}
