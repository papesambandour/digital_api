import { RefundDtoIn } from './dto/refund-dto-out';
import { StatusEnum } from '../../Models/Entities/Enum.entity';
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
    refund(refundDtoIn: RefundDtoIn): Promise<{
        status: StatusEnum.PENDING | StatusEnum.PROCESSING | StatusEnum.FAILLED | StatusEnum.CANCELED | StatusEnum.REFUNDED;
        message: string;
        statutTreatment: string;
    }>;
    setSuccess(setSuccessDtoIn: SetSuccessDtoIn): Promise<SetSuccessFailedDtoOut>;
    setFailed(setFailedDtoIn: SetFailedDtoIn): Promise<SetSuccessFailedDtoOut>;
    sendNotification(sendNotificationDtoIn: SendNotificationDtoIn): Promise<SendNotificationDtoOut>;
    servicesBalance(): Promise<ServicesBalanceDtoOut[]>;
    importBankTransfer(importBankTransferBulkDtoIn: ImportBankTransfertBulkDtoIn[]): Promise<ImportBankTransfertBulkDtoOut[]>;
}
