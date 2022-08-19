import { BaseEntity } from 'typeorm';
import { SousServices } from './SousServices.entity';
export declare class TypeServices extends BaseEntity {
    id: number;
    name: string;
    code: string;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    createdAt: Date;
    updatedAt: Date | null;
    typeOperation: 'DEBIT' | 'CREDIT';
    sousServices: SousServices[];
}
