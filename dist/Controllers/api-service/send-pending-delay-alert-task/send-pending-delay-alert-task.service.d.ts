import { SchedulerRegistry } from '@nestjs/schedule';
import { HelperService } from '../../../helper.service';
export declare class SendPendingDelayAlertTaskService {
    private readonly helper;
    private schedulerRegistry;
    constructor(helper: HelperService, schedulerRegistry: SchedulerRegistry);
    handleCron(): Promise<void>;
    private fetchPendingTransaction;
}
