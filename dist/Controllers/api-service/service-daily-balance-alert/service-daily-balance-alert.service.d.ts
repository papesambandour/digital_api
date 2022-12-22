import { HelperService } from '../../../helper.service';
import { SchedulerRegistry } from '@nestjs/schedule';
export declare class ServiceDailyBalanceAlertService {
    private readonly helper;
    private schedulerRegistry;
    constructor(helper: HelperService, schedulerRegistry: SchedulerRegistry);
    handleCron(): Promise<void>;
}
