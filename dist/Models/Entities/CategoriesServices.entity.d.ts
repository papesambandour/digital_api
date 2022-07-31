import { BaseEntity } from 'typeorm';
import { Services } from "./Services.entity";
export declare class CategoriesServices extends BaseEntity {
    id: number;
    name: string;
    code: string;
    icon: string;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    updatedAt: Date;
    createdAt: Date | null;
    services: Services[];
}
