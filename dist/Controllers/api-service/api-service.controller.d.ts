import { OperationInDto } from './dto/OperationInDto';
import { ControllerBase } from '../Controller';
import { ApiServiceService } from './api-service.service';
import { HelperService } from '../../helper.service';
import { ListPendingBillInDto, MoneygramReceptionInfo, MoneygramSendInfo } from './dto/ListPendingBillInDto';
import { NewClaimInDtoIn } from './dto/NewClaim';
import { DtoGetTransactionStatusIn } from '../../Models/Dto/DtoGetTransactionStatus';
import { ConfirmKPayDto } from './dto/ConfirmKPay';
import { FreeCallbackData } from './dto/FreeCallback';
import { MtnBjCallbackData } from './dto/MtnBjCallback';
import { RefundDtoIn } from '../partener-intern/dto/refund-dto-out';
import { Hub2CallbackData } from './dto/Hub2Callback';
import { LamAirtimeCallbackData } from './dto/LAMCallback';
import { WaveCallbackData } from './dto/WaveCallback';
import { OmCallbackData } from './dto/OmCallbackData';
import { MoneyGramCallback } from './dto/MoneyGramCallback';
import { BictorisCallbackData } from './dto/BictorisCallback';
export declare class ApiServiceController extends ControllerBase {
    private readonly apiServiceService;
    private readonly helper;
    constructor(apiServiceService: ApiServiceService, helper: HelperService);
    operation(operationInDto: OperationInDto, req: any): Promise<{
        code: number;
        msg: any;
        error: boolean;
        data: object;
    }>;
    transaction(id: string): Promise<{
        msg: string;
    }>;
    confirmKPayDto(confirmKPayDto: ConfirmKPayDto): Promise<{
        code: number;
        msg: any;
        error: boolean;
        data: object;
    }>;
    transactions(): Promise<{
        message: string;
    }>;
    dictionary(): Promise<{
        code: number;
        msg: any;
        error: boolean;
        data: object;
    }>;
    balance(headers: any): Promise<{
        code: number;
        msg: any;
        error: boolean;
        data: object;
    }>;
    balancePost(headers: any, dto: any): Promise<{
        code: number;
        msg: any;
        error: boolean;
        data: object;
    }>;
    getTransactionStatus(headers: any, dto: DtoGetTransactionStatusIn): Promise<{
        code: number;
        msg: any;
        error: boolean;
        data: object;
    }>;
    refund(refundDtoIn: RefundDtoIn): Promise<{
        code: number;
        msg: any;
        error: boolean;
        data: object;
    } | {
        status: any;
        message: string;
        statutTreatment: string;
    }>;
    newClaim(newClaimInDtoIn: NewClaimInDtoIn): Promise<{
        code: number;
        msg: any;
        error: boolean;
        data: object;
    }>;
    mtnCallback(req: any, mtnCallbackData: MtnBjCallbackData): Promise<{
        code: number;
        msg: any;
        error: boolean;
        data: object;
    } | {
        success: boolean;
        message: string;
    }>;
    lamAirtime(req: any, lamCallbackData: LamAirtimeCallbackData): Promise<{
        code: number;
        msg: any;
        error: boolean;
        data: object;
    } | {
        success: boolean;
        message: string;
    }>;
    _hub2CallbackTransfer(req: any, hub2CallbackData: Hub2CallbackData): Promise<{
        status: string;
        message: string;
    }>;
    _hub2CallbackPayment(req: any, hub2CallbackData: Hub2CallbackData): Promise<{
        status: string;
        message: string;
    }>;
    _hub2CMCallbackTransfer(req: any, hub2CallbackData: Hub2CallbackData): Promise<{
        status: string;
        message: string;
    }>;
    _hub2CMCallbackPayment(req: any, hub2CallbackData: Hub2CallbackData): Promise<{
        status: string;
        message: string;
    }>;
    _hub2BFCallbackTransfer(req: any, hub2CallbackData: Hub2CallbackData): Promise<{
        status: string;
        message: string;
    }>;
    _hub2BFCallbackPayment(req: any, hub2CallbackData: Hub2CallbackData): Promise<{
        status: string;
        message: string;
    }>;
    hub2Callback(req: any, hub2CallbackData: Hub2CallbackData, transferKey: any, paymentKey: any): Promise<{
        code: number;
        msg: any;
        error: boolean;
        data: object;
    } | {
        success: boolean;
        message: string;
    }>;
    async: any;
    waveCallback(req: any, waveCallbackData: WaveCallbackData, sharedKey: string): Promise<{
        code: number;
        msg: any;
        error: boolean;
        data: object;
    } | {
        success: boolean;
        message: string;
    }>;
    omCallback(req: any, omCallbackData: OmCallbackData, tag: string): Promise<{
        code: number;
        msg: any;
        error: boolean;
        data: object;
    }>;
    moneyGramCallback(mode: string, moneyGramBody: MoneyGramCallback, req: any): Promise<{
        code: number;
        msg: any;
        error: boolean;
        data: object;
    }>;
    FreeCallback(mode: string, freeCallbackData: FreeCallbackData, req: any): Promise<{
        code: number;
        msg: any;
        error: boolean;
        data: object;
    } | {
        success: boolean;
        message: string;
    }>;
    waveCICallback(req: any, waveCallbackData: WaveCallbackData): Promise<{
        status: string;
        message: string;
    }>;
    waveSNCallback(req: any, waveCallbackData: WaveCallbackData): Promise<{
        status: string;
        message: string;
    }>;
    OmSnQrCodeCallback(req: any, omCallbackData: OmCallbackData): Promise<{
        success: string;
    }>;
    OmSnMerchantPaymentCallback(req: any, omCallbackData: OmCallbackData): Promise<{
        success: string;
    }>;
    bictorisCallback(req: any, bictorisCallbackData: BictorisCallbackData, headers: any): Promise<{
        status: string;
        message: string;
        transactionId?: undefined;
    } | {
        status: string;
        transactionId: string;
        message: string;
    }>;
    services(): Promise<{
        success: boolean;
        services: {
            name: string;
            icon: string;
            codeService: string;
            typeOperation: import("../../Models/Entities/Enum.entity").TypeOperationEnum;
            typeService: string;
        }[];
    }>;
    errors(): Promise<{
        success: boolean;
        services: {
            id: any;
            code: string;
            message: string;
        }[];
    }>;
    listPendingBill(pendingBillDto: ListPendingBillInDto): Promise<{
        code: number;
        msg: any;
        error: boolean;
        data: object;
    }>;
    moneyGramReceptionInfo(moneygramReceptionInfo: MoneygramReceptionInfo): Promise<{
        code: number;
        msg: any;
        error: boolean;
        data: object;
    }>;
    moneyGramSendInfo(moneygramSendInfo: MoneygramSendInfo): Promise<{
        code: number;
        msg: any;
        error: boolean;
        data: object;
    }>;
}
