export declare class NewClaimInDtoIn {
    subject: string;
    apiKey: string;
    message: string;
    transactionId: string;
}
export declare class NewClaimInDtoOut extends NewClaimInDtoIn {
    claimRef: string;
}
