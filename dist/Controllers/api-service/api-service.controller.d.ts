import { OperationInDto } from './dto/OperationInDto';
import { ControllerBase } from '../Controller';
import { ApiServiceService } from './api-service.service';
import { HelperService } from '../../helper.service';
import { ListPendingBillInDto } from './dto/ListPendingBillInDto';
import { NewClaimInDtoIn } from './dto/NewClaim';
import { DtoGetTransactionStatusIn } from '../../Models/Dto/DtoGetTransactionStatus';
import { ConfirmKPayDto } from './dto/ConfirmKPay';
import { FreeCallbackData } from './dto/FreeCallback';
import { MtnBjCallbackData } from './dto/MtnBjCallback';
import { RefundDtoIn } from '../partener-intern/dto/refund-dto-out';
import { Hub2CallbackData } from './dto/Hub2Callback';
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
    _hub2CallbackTransfer(req: any, hub2CallbackData: Hub2CallbackData): Promise<{
        code: number;
        msg: any;
        error: boolean;
        data: object;
    } | {
        success: boolean;
        message: string;
    }>;
    _hub2CallbackPayment(req: any, hub2CallbackData: Hub2CallbackData): Promise<{
        code: number;
        msg: any;
        error: boolean;
        data: object;
    } | {
        success: boolean;
        message: string;
    }>;
    hub2Callback(req: any, hub2CallbackData: Hub2CallbackData): Promise<{
        code: number;
        msg: any;
        error: boolean;
        data: object;
    } | {
        success: boolean;
        message: string;
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
    waveCICallback(waveCallbackData: any): Promise<{
        success: string;
    }>;
    waveSNCallback(waveCallbackData: any): Promise<{
        success: string;
    }>;
    OmSnQrCodeCallback(): Promise<{
        success: string;
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
}
