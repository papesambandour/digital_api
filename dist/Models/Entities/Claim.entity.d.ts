import { CustomBaseModel } from './CustomBaseModel';
import { ClaimStatut, StateEnum } from './Enum.entity';
export declare class Claim extends CustomBaseModel {
    id: number;
    subject: string;
    claimRef: string;
    message: string;
    comment: string;
    callbackUrl: string;
    state: StateEnum;
    statut: ClaimStatut;
    partenersId: number;
    userIdOpen: number;
    userIdClose: number;
    userIdComment: number;
    transactionId: number;
    createdAt: Date;
    updatedAt: Date | null;
    openedAt: Date | null;
    closeAt: Date | null;
}
