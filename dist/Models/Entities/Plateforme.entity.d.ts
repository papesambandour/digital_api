import { Users } from './Users.entity';
import { CustomBaseModel } from './CustomBaseModel';
export declare class Plateforme extends CustomBaseModel {
    id: number;
    name: string;
    code: string | null;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    createdAt: Date;
    updatedAt: Date | null;
    users: Users[];
}
