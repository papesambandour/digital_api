export declare class DtoSousServices {
    id: number;
    name: string;
    ussdCode: string;
    regexMessageValidation: string;
    message_retour_ussd: string;
    regexPhone: string;
    positionValidationIndex: string;
    validLength: number;
    icon: string;
    code: string;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    createdAt: Date;
    updatedAt: Date | null;
    maxLimitTransaction: number;
    maxLimitDay: number;
    maxLimitWeek: number;
    maxLimitMonth: number;
    maxLimitTrimest: number;
    typeOperation: 'DEBIT' | 'CREDIT';
    servicesId: number;
    typeServicesId: number;
}
