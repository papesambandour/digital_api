import { Services } from './Services.entity';
import { CustomBaseModel } from './CustomBaseModel';
export declare class CategoriesServices extends CustomBaseModel {
    id: number;
    name: string;
    code: string;
    icon: string;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    updatedAt: Date;
    createdAt: Date | null;
    services: Services[];
}
