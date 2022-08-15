import { BaseEntity } from 'typeorm';
import { OperationParteners } from './OperationParteners.entity';
import { Parteners } from './Parteners.entity';
import { PartenerComptes } from './PartenerComptes.entity';
import { Phones } from './Phones.entity';
import { SousServices } from './SousServices.entity';
import { UssdExecutionMessages } from './UssdExecutionMessages.entity';
import { OperationPhones } from './OperationPhones.entity';
import { EnumCodeUssdResponse, EnumValidationStatus, TypeOperationEnum } from './Enum.entity';
import { MessageUssds } from './MessageUssds.entity';
export declare class Transactions extends BaseEntity {
    id: number;
    typeOperation: TypeOperationEnum;
    codeUssdResponse: EnumCodeUssdResponse;
    ussdResponseMatch: number;
    sousServicesId: number;
    phonesId: number | null;
    partenerComptesId: number;
    partenersId: number;
    isSoldeCommission: number;
    solde: number;
    soldeCommission: number;
    commissionAmount: number;
    feeAmount: number;
    commissionAmountPsp: number;
    feeAmountPsn: number;
    commissionAmountOwner: number;
    feeAmountOwner: number;
    createdAt: Date;
    updatedAt: Date | null;
    callbackSendedAt: Date | null;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    statut: 'SUCCESS' | 'PENDING' | 'PROCESSING' | 'FAILLED' | 'CANCELED';
    preStatut: 'SUCCESS' | 'PENDING' | 'PROCESSING' | 'FAILLED' | 'CANCELED';
    statutUssdResponse: EnumValidationStatus;
    statutSmsResponse: EnumValidationStatus;
    dateCreation: Date | null;
    dateSuccess: Date | null;
    datePreSuccess: Date | null;
    dateCanceled: Date | null;
    dateProcessing: Date | null;
    dateFailled: Date | null;
    serviceName: string;
    message: string;
    errorMessage: string;
    transactionId: string;
    externalTransactionId: string;
    sousServiceTransactionId: string;
    sousServiceName: string;
    operateurName: string;
    telephoneNumberService: string | null;
    partnerCompteName: string;
    partenerName: string;
    commentaire: string | null;
    data: string | null;
    amount: number;
    urlIpn: string;
    phone: string;
    dataSended: string;
    codeSousService: string;
    dataResponseCallback: string;
    callbackIsSend: number;
    needCheckTransaction: number;
    callbackReady: number;
    nextSendCallbackDate: Date;
    checkTransactionResponse: string;
    deepLinkUrl: string;
    successRedirectUrl: string;
    errorRedirectUrl: string;
    transactionIsFinish: number;
    reachedTimeout: number;
    timeOutAt: Date;
    operationParteners: OperationParteners[];
    parteners: Parteners;
    partenerComptes: PartenerComptes;
    phones: Phones;
    sousServices: SousServices;
    ussdExecutionMessage: UssdExecutionMessages[];
    operationPhones: OperationPhones[];
    messagesUssds: MessageUssds[];
}
