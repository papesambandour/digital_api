import { Operators } from './Operators.entity';
import { CustomBaseModel } from './CustomBaseModel';
export declare class Country extends CustomBaseModel {
    id: number;
    name: string;
    flag: string;
    callingCodes: string;
    capital: string;
    code: string;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    updatedAt: Date | null;
    createdAt: Date | null;
    operators: Operators[];
}
