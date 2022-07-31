export declare class DtoActions {
    id: number;
    name: string;
    code: string;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    createdAt: Date;
    updatedAt: Date | null;
    method: string;
    url: string;
    icon: string;
    modulesId: number;
}
