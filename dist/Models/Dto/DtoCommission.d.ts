export declare class DtoCommission {
    id: number;
    amountStart: number;
    amountEnd: number;
    amountCommssion: number;
    tauxCommission: number;
    tauxFee: number;
    amountFee: number;
    commissionIsFixe: number;
    feeIsFixe: number;
    partenersId: number;
    sousServicesId: number;
    createdAt: Date;
    updatedAt: Date | null;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
}
