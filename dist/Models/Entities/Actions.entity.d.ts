import { BaseEntity } from 'typeorm';
import { ActionsProfils } from './ActionsProfils.entity';
import { Modules } from './Modules.entity';
export declare class Actions extends BaseEntity {
    id: number;
    name: string;
    code: string;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    createdAt: Date;
    updatedAt: Date | null;
    method: string;
    url: string;
    icon: string;
    modulesId: number;
    actionsProfils: ActionsProfils[];
    modules: Modules;
}
