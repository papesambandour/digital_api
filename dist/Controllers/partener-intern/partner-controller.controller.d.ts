import { RefundDtoIn, RefundDtoOut } from './dto/refund-dto-out';
import { ImportBankTransfertBulkDtoIn, ImportBankTransfertBulkDtoOut } from './dto/import-bank-transfert-bulk-dto-in';
import { ServicesBalanceDtoOut } from './dto/services-balance';
import { SetFailedDtoIn, SetSuccessDtoIn, SetSuccessFailedDtoOut } from './dto/set-status';
import { SendNotificationDtoIn, SendNotificationDtoOut } from './dto/notification-dto';
export declare class PartnerControllerController {
    private partnerServiceService;
    home(): Promise<{
        api: string;
        version: string;
    }>;
    refund(refundDtoIn: RefundDtoIn): Promise<RefundDtoOut>;
    setSuccess(setSuccessDtoIn: SetSuccessDtoIn): Promise<SetSuccessFailedDtoOut>;
    setFailed(setFailedDtoIn: SetFailedDtoIn): Promise<SetSuccessFailedDtoOut>;
    sendNotification(sendNotificationDtoIn: SendNotificationDtoIn): Promise<SendNotificationDtoOut>;
    servicesBalance(): Promise<ServicesBalanceDtoOut[]>;
    importBankTransfer(importBankTransferBulkDtoIn: ImportBankTransfertBulkDtoIn[]): Promise<ImportBankTransfertBulkDtoOut[]>;
}
