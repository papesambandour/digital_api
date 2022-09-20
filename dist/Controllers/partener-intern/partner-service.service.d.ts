import { HelperService } from '../../helper.service';
import { RefundDtoIn, RefundDtoOut } from './dto/refund-dto-out';
import { ImportBankTransfertBulkDtoIn, ImportBankTransfertBulkDtoOut } from './dto/import-bank-transfert-bulk-dto-in';
import { ServicesBalanceDtoOut } from './dto/services-balance';
import { SetFailedDtoIn, SetSuccessFailedDtoOut } from './dto/set-status';
import { SendNotificationDtoIn, SendNotificationDtoOut } from './dto/notification-dto';
import { RetroDtoIn } from './dto/retro-dto';
import { ExecuteUssdIn } from './dto/execute-ussd-dto';
export declare class PartnerServiceService {
    private helper;
    constructor(helper: HelperService);
    refund(refundDtoIn: RefundDtoIn): Promise<RefundDtoOut>;
    importBankTransfer(importBankTransferBulkDto: ImportBankTransfertBulkDtoIn[]): Promise<ImportBankTransfertBulkDtoOut[]>;
    servicesBalance(): Promise<ServicesBalanceDtoOut[]>;
    setSuccessOrFailed(setStatusDtoIn: SetFailedDtoIn | SetFailedDtoIn, status: 'success' | 'failed'): Promise<SetSuccessFailedDtoOut>;
    sendNotification(sendNotificationDtoIn: SendNotificationDtoIn): Promise<SendNotificationDtoOut>;
    retroTransaction(retroDtoIn: RetroDtoIn): Promise<{
        code: number;
        msg: string;
        error: boolean;
        data: {
            phone: string;
            amount: number;
            codeService: string;
            transactionId: string;
            status: string;
            externalTransactionId: string;
            callbackUrl: string;
            errorType: any;
            notificationMessage: string;
            deepLinkUrl: string;
            _be_removed_deepLinkUrl: string;
        };
    }>;
    executeUssd(executeUssdIn: ExecuteUssdIn): Promise<{
        success: boolean;
        message: string;
        ussd_response: string;
    }>;
}
