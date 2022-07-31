import { BaseEntity } from 'typeorm';
import { Phones } from './Phones.entity';
import { Operators } from './Operators.entity';
import { SousServices } from './SousServices.entity';
import { CategoriesServices } from './CategoriesServices.entity';
export declare class Services extends BaseEntity {
    id: number;
    name: string;
    icon: string;
    code: string;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    createdAt: Date;
    updatedAt: Date | null;
    operatorsId: number;
    categoriesServicesId: number;
    accecptePhone: number;
    solde: number;
    amountReserved: number;
    alertLevel_1Solde: number;
    alertLevel_2Solde: number;
    alertLevel_3Solde: number;
    alertLevel_4Solde: number;
    alertLevel_5Solde: number;
    phones: Phones[];
    operators: Operators;
    sousServices: SousServices[];
    categoriesServices: CategoriesServices;
}
