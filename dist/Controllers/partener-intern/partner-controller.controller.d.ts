import { RefundDtoIn, RefundDtoOut } from './dto/refund-dto-out';
import { ImportBankTransfertBulkDtoIn, ImportBankTransfertBulkDtoOut } from './dto/import-bank-transfert-bulk-dto-in';
export declare class PartnerControllerController {
    private partnerServiceService;
    home(): Promise<{
        api: string;
        version: string;
    }>;
    refund(refundDtoIn: RefundDtoIn): Promise<RefundDtoOut>;
    importBankTransfer(importBankTransferBulkDtoIn: ImportBankTransfertBulkDtoIn[]): Promise<ImportBankTransfertBulkDtoOut[]>;
}
