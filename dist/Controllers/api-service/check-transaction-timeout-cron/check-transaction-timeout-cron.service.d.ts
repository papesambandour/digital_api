import { HelperService } from '../../../helper.service';
import { SchedulerRegistry } from '@nestjs/schedule';
export declare class CheckTransactionTimeoutCronService {
    private readonly helper;
    private schedulerRegistry;
    static canHandle: boolean;
    constructor(helper: HelperService, schedulerRegistry: SchedulerRegistry);
    handleCron(): Promise<void>;
    private static fetchPendingTransaction;
}
