import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HelperService } from '../../helper.service';
export declare class HmacInterceptor implements NestInterceptor {
    private readonly helper;
    static computeHmac(): void;
    constructor(helper: HelperService);
    static isValidTimestamp(timestamp: number): boolean;
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
