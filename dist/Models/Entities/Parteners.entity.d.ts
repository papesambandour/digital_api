import { Commission } from './Commission.entity';
import { OperationParteners } from './OperationParteners.entity';
import { PartenerComptes } from './PartenerComptes.entity';
import { PartenerSettings } from './PartenerSettings.entity';
import { SousServicesParteners } from './SousServicesParteners.entity';
import { Transactions } from './Transactions.entity';
import { CustomBaseModel } from './CustomBaseModel';
export declare class Parteners extends CustomBaseModel {
    id: number;
    countriesId: number;
    createdAt: Date;
    updatedAt: Date | null;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    solde: number;
    soldeCommission: number;
    amountReserved: number;
    name: string;
    phone: string;
    email: string;
    waveBusinessRegistrationId: string;
    waveCIBusinessRegistrationId: string;
    adress: string | null;
    password: string;
    firstConnection: number;
    passwordExpired: Date;
    passwordDurationDay: number;
    allowIp: string;
    commissions: Commission[];
    operationParteners: OperationParteners[];
    partenerComptes: PartenerComptes[];
    partenerSettings: PartenerSettings[];
    sousServicesParteners: SousServicesParteners[];
    transactions: Transactions[];
    getCanSendWavePaymentLink(): Promise<boolean>;
    getCanSendOMSnQrCodePaymentLink(): Promise<boolean>;
}
