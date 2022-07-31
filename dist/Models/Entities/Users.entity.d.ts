import { BaseEntity } from 'typeorm';
import { Plateforme } from './Plateforme.entity';
import { Profils } from './Profils.entity';
export declare class Users extends BaseEntity {
    id: number;
    email: string;
    password: string;
    phone: string;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    createdAt: Date;
    updatedAt: Date | null;
    plateformeId: number;
    profilsId: number;
    fName: string;
    lName: string;
    code: string;
    address: string | null;
    plateforme: Plateforme;
    profils: Profils;
}
