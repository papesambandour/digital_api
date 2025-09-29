export declare class DtoUssdExecutionMessages {
    id: number;
    message: string;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    createdAt: Date;
    updatedAt: Date | null;
    phonesId: number;
    transationsId: number;
}
