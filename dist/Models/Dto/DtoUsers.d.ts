export declare class DtoUsers {
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
}
