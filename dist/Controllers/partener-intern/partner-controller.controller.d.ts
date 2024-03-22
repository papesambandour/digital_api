import { RefundDtoIn } from './dto/refund-dto-out';
import { StatusEnum } from '../../Models/Entities/Enum.entity';
import { ImportBankTransfertBulkDtoIn, ImportBankTransfertBulkDtoOut } from './dto/import-bank-transfert-bulk-dto-in';
import { ServicesBalanceDtoOut } from './dto/services-balance';
import { ResendCallbackDtoIn, ResendCallbackDtoOut, SetFailedDtoIn, SetSuccessDtoIn, SetSuccessFailedDtoOut } from './dto/set-status';
import { SendNotificationDtoIn, SendNotificationDtoOut } from './dto/notification-dto';
import { RetroDtoIn } from './dto/retro-dto';
import { ExecuteUssdIn } from './dto/execute-ussd-dto';
import { RebootPhoneDtoIn } from './dto/reboot-phone-dto';
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
    retro(retroDtoIn: RetroDtoIn): Promise<{
        statutTreatment: string;
        message: string;
        apiResponse: {
            code: number;
            msg: string;
            data?: any;
        };
    }>;
    retroAdmin(retroDtoIn: RetroDtoIn): Promise<{
        statutTreatment: string;
        message: string;
        apiResponse: {
            code: number;
            msg: string;
            data?: any;
        };
    }>;
    executeUssd(executeUssdIn: ExecuteUssdIn): Promise<{
        statutTreatment: string;
        message: string;
        phoneId: number;
        ussd: string;
        ussd_response: string;
    }>;
    rebootPhone(rebootPhoneDtoIn: RebootPhoneDtoIn): Promise<{
        statutTreatment: string;
        message: string;
        phoneId: number;
    }>;
    setSuccess(setSuccessDtoIn: SetSuccessDtoIn): Promise<SetSuccessFailedDtoOut>;
    setFailed(setFailedDtoIn: SetFailedDtoIn): Promise<SetSuccessFailedDtoOut>;
    resendCallback(resendCallbackDtoIn: ResendCallbackDtoIn): Promise<ResendCallbackDtoOut>;
    sendNotification(sendNotificationDtoIn: SendNotificationDtoIn): Promise<SendNotificationDtoOut>;
    servicesBalance(): Promise<ServicesBalanceDtoOut[]>;
    importBankTransfer(importBankTransferBulkDtoIn: ImportBankTransfertBulkDtoIn[]): Promise<ImportBankTransfertBulkDtoOut[]>;
}
