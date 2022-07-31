import { BaseEntity } from 'typeorm';
import { OperationPhones } from './OperationPhones.entity';
import { Services } from './Services.entity';
import { SousServicesPhones } from './SousServicesPhones.entity';
import { Transactions } from './Transactions.entity';
import { ActivitiesPhones } from './ActivitiesPhones.entity';
import { UssdExecutionMessages } from './UssdExecutionMessages.entity';
import { PhoneState } from './Enum.entity';
export declare class Phones extends BaseEntity {
    id: number;
    solde: number;
    number: string;
    codeSecret: string;
    pin: string;
    ltd: string;
    lgd: string;
    imei: string;
    uid: string;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    createdAt: Date;
    lastUsed: Date;
    lastUnused: Date;
    updatedAt: Date | null;
    socket: 'CONNECTED' | 'DISCONNECTED';
    phoneState: PhoneState;
    amountReserved: number;
    maxSolde: number;
    alertLevel_1Solde: number;
    alertLevel_2Solde: number;
    alertLevel_3Solde: number;
    alertLevel_4Solde: number;
    alertLevel_5Solde: number;
    servicesId: number;
    operationPhones: OperationPhones[];
    services: Services;
    sousServicesPhones: SousServicesPhones[];
    transactions: Transactions[];
    activitiesPhones: ActivitiesPhones[];
    ussdExecutionMessageEntities: UssdExecutionMessages[];
}
