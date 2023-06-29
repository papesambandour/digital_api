import { ActionsProfils } from './ActionsProfils.entity';
import { Users } from './Users.entity';
import { CustomBaseModel } from './CustomBaseModel';
export declare class Profils extends CustomBaseModel {
    id: number;
    name: string;
    code: string;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    createdAt: Date;
    updatedAt: Date | null;
    actionsProfils: ActionsProfils[];
    users: Users[];
}
