import { BaseEntity } from 'typeorm';
import { Users } from './Users.entity';
export declare class Plateforme extends BaseEntity {
    id: number;
    name: string;
    code: string | null;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    createdAt: Date;
    updatedAt: Date | null;
    users: Users[];
}
