export declare class SendNotificationDtoIn {
    channel: string;
    message: string;
    event: string;
    isCritic: boolean;
}
export declare class SendNotificationDtoOut {
    channel: string;
    message: string;
    statutTreatment: 'SUCCESS' | 'FAILED';
}
