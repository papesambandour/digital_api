import { SousServices } from './SousServices.entity';
import { Transactions } from './Transactions.entity';
import { CustomBaseModel } from './CustomBaseModel';
export declare class ErrorTypes extends CustomBaseModel {
    id: number;
    code: string;
    regex: string;
    message: string;
    index: string;
    isCritic: number;
    isJson: number;
    sousServicesId: number;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    createdAt: Date;
    updatedAt: Date | null;
    sousServices: SousServices;
    transactions: Transactions[];
}
