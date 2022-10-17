import { OperationInDto } from './dto/OperationInDto';
import { ControllerBase } from '../Controller';
import { ApiServiceService } from './api-service.service';
import { HelperService } from '../../helper.service';
import { ListPendingBillInDto } from './dto/ListPendingBillInDto';
import { NewClaimInDtoIn } from './dto/NewClaim';
import { DtoGetTransactionStatusIn } from '../../Models/Dto/DtoGetTransactionStatus';
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
    newClaim(newClaimInDtoIn: NewClaimInDtoIn): Promise<{
        code: number;
        msg: any;
        error: boolean;
        data: object;
    }>;
    mtnCallback(): Promise<{
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
