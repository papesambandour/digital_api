import { SchedulerRegistry } from '@nestjs/schedule';
import { HelperService } from '../../../helper.service';
export declare class SendCallbackTaskService {
    private readonly helper;
    private schedulerRegistry;
    static canHandle: any;
    constructor(helper: HelperService, schedulerRegistry: SchedulerRegistry);
    handleCron(): Promise<void>;
    private static fetchPendingTransaction;
}
