export declare const wizallApiConfig: (type: 'payment' | 'bill') => {
    wizallLogin: string;
    wizallPassword: string;
    wizallClientId: string;
    wizallClientSecret: string;
    wizallUrl: string;
    isBill: boolean;
    wizallAgentPhoneNumber?: undefined;
    wizallAgentPin?: undefined;
    wizallPartnerId?: undefined;
} | {
    wizallLogin: string;
    wizallPassword: string;
    wizallClientId: string;
    wizallClientSecret: string;
    wizallUrl: string;
    isBill: boolean;
    wizallAgentPhoneNumber: string;
    wizallAgentPin: string;
    wizallPartnerId: string;
};
