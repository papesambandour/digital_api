import { BaseEntity } from 'typeorm';
import { Parteners } from './Parteners.entity';
export declare class PartenerSettings extends BaseEntity {
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
