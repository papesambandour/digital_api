import { Actions } from './Actions.entity';
import { CustomBaseModel } from './CustomBaseModel';
export declare class Modules extends CustomBaseModel {
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
