import { EnumActivitiesPhones } from '../Entities/Enum.entity';
export declare class DtoActivitiesPhones {
    id: number;
    message: string;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    activity: EnumActivitiesPhones;
    createdAt: Date;
    updatedAt: Date | null;
    phonesId: number;
}
