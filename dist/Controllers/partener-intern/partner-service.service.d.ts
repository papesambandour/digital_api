import { HelperService } from '../../helper.service';
import { RefundDtoIn, RefundDtoOut } from './dto/refund-dto-out';
import { ImportBankTransfertBulkDtoIn, ImportBankTransfertBulkDtoOut } from './dto/import-bank-transfert-bulk-dto-in';
import { ServicesBalanceDtoOut } from './dto/services-balance';
export declare class PartnerServiceService {
    private helper;
    constructor(helper: HelperService);
    refund(refundDtoIn: RefundDtoIn): Promise<RefundDtoOut>;
    importBankTransfer(importBankTransferBulkDto: ImportBankTransfertBulkDtoIn[]): Promise<ImportBankTransfertBulkDtoOut[]>;
    servicesBalance(): Promise<ServicesBalanceDtoOut[]>;
}
