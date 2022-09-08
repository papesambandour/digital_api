import { Actions } from './Actions.entity';
import { Profils } from './Profils.entity';
import { CustomBaseModel } from './CustomBaseModel';
export declare class ActionsProfils extends CustomBaseModel {
    id: number;
    actionsId: number;
    profilsId: number;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    createdAt: Date;
    updatedAt: Date | null;
    actions: Actions;
    profils: Profils;
}
