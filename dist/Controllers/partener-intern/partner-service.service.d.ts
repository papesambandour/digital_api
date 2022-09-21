import { HttpService } from '@nestjs/common';
import { HelperService } from '../../helper.service';
import { RefundDtoIn, RefundDtoOut } from './dto/refund-dto-out';
import { ImportBankTransfertBulkDtoIn, ImportBankTransfertBulkDtoOut } from './dto/import-bank-transfert-bulk-dto-in';
import { ServicesBalanceDtoOut } from './dto/services-balance';
import { SetFailedDtoIn, SetSuccessDtoIn, SetSuccessFailedDtoOut } from './dto/set-status';
import { SendNotificationDtoIn, SendNotificationDtoOut } from './dto/notification-dto';
import { RetroDtoIn } from './dto/retro-dto';
import { ExecuteUssdIn } from './dto/execute-ussd-dto';
import { RebootPhoneDtoIn } from './dto/reboot-phone-dto';
export declare class PartnerServiceService {
    private helper;
    private httpService;
    constructor(helper: HelperService, httpService: HttpService);
    refund(refundDtoIn: RefundDtoIn): Promise<RefundDtoOut>;
    importBankTransfer(importBankTransferBulkDto: ImportBankTransfertBulkDtoIn[]): Promise<ImportBankTransfertBulkDtoOut[]>;
    servicesBalance(): Promise<ServicesBalanceDtoOut[]>;
    setSuccessOrFailed(setStatusDtoIn: SetFailedDtoIn | SetSuccessDtoIn, status: 'success' | 'failed'): Promise<SetSuccessFailedDtoOut>;
    sendNotification(sendNotificationDtoIn: SendNotificationDtoIn): Promise<SendNotificationDtoOut>;
    retroTransaction(retroDtoIn: RetroDtoIn): Promise<{
        code: number;
        msg: string;
    }>;
    retroAdminTransaction(retroDtoIn: RetroDtoIn): Promise<{
        code: number;
        msg: string;
    }>;
    executeUssd(executeUssdIn: ExecuteUssdIn): Promise<{
        success: boolean;
        message: string;
        ussd_response: string;
    }>;
    rebootPhone(rebootPhoneDtoIn: RebootPhoneDtoIn): Promise<{
        success: boolean;
        message: string;
    }>;
}
