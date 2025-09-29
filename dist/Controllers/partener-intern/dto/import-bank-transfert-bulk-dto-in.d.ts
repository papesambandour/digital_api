export declare class ImportBankTransfertBulkDtoIn {
    id: number;
    statut: 'SUCCESS' | 'FAILED';
    message: string;
}
export declare class ImportBankTransfertBulkDtoOut extends ImportBankTransfertBulkDtoIn {
    statutTreatment: 'SUCCESS' | 'FAILED';
    messageTreatment: string;
}
