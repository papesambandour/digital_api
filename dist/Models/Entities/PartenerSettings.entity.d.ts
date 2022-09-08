import { Parteners } from './Parteners.entity';
import { CustomBaseModel } from './CustomBaseModel';
export declare class PartenerSettings extends CustomBaseModel {
    id: number;
    partenersId: number;
    name: string;
    value: string;
    type: string;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    createdAt: Date;
    updatedAt: Date | null;
    parteners: Parteners;
}
