import { BaseEntity } from 'typeorm';
import { Actions } from './Actions.entity';
import { Profils } from './Profils.entity';
export declare class ActionsProfils extends BaseEntity {
    id: number;
    actionsId: number;
    profilsId: number;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    createdAt: Date;
    updatedAt: Date | null;
    actions: Actions;
    profils: Profils;
}
