import { BaseEntity } from 'typeorm';
import { Operators } from './Operators.entity';
export declare class Country extends BaseEntity {
    id: number;
    name: string;
    flag: string;
    callingCodes: string;
    capital: string;
    code: string;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    updatedAt: Date;
    createdAt: Date | null;
    operators: Operators[];
}
