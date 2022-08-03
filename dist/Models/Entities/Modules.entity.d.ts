import { BaseEntity } from 'typeorm';
import { Actions } from './Actions.entity';
export declare class Modules extends BaseEntity {
    id: number;
    name: string;
    code: string;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    createdAt: Date;
    updatedAt: Date | null;
    modulesId: number | null;
    actions: Actions[];
    modules_2: Modules;
    modules: Modules[];
}
