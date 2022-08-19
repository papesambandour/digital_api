import { SchedulerRegistry } from '@nestjs/schedule';
import { HelperService } from '../../../helper.service';
export declare class CheckTransactionStatusCronService {
    private readonly helper;
    private schedulerRegistry;
    static canHandle: boolean;
    constructor(helper: HelperService, schedulerRegistry: SchedulerRegistry);
    handleCron(): Promise<void>;
    private static fetchPendingTransaction;
}
