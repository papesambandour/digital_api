import { SousServices } from './SousServices.entity';
import { CustomBaseModel } from './CustomBaseModel';
export declare class TypeServices extends CustomBaseModel {
    id: number;
    name: string;
    code: string;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    createdAt: Date;
    updatedAt: Date | null;
    typeOperation: 'DEBIT' | 'CREDIT';
    sousServices: SousServices[];
}
