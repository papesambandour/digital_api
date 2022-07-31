import { BaseEntity } from 'typeorm';
import { SousServices } from './SousServices.entity';
export declare class MessageUssds extends BaseEntity {
    id: number;
    content: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    isMatched: number;
    sousServicesId: number;
    phonesId: number;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    sousServices: SousServices;
}
