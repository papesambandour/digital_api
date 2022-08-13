import { OperationInDto } from './dto/OperationInDto';
import { ControllerBase } from '../Controller';
import { ApiServiceService } from './api-service.service';
import { HelperService } from '../../helper.service';
export declare class ApiServiceController extends ControllerBase {
    private readonly apiServiceService;
    private readonly helper;
    constructor(apiServiceService: ApiServiceService, helper: HelperService);
    operation(operationInDto: OperationInDto): Promise<{
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
}
