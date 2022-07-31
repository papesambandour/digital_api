import { BaseEntity } from 'typeorm';
import { ActionsProfils } from './ActionsProfils.entity';
import { Users } from './Users.entity';
export declare class Profils extends BaseEntity {
    id: number;
    name: string;
    code: string;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    createdAt: Date;
    updatedAt: Date | null;
    actionsProfils: ActionsProfils[];
    users: Users[];
}
