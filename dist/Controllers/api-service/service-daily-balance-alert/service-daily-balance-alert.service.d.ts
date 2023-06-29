import { HelperService } from '../../../helper.service';
import { SchedulerRegistry } from '@nestjs/schedule';
export declare class ServiceDailyBalanceAlertService {
    private readonly helper;
    private schedulerRegistry;
    static canHandle: any;
    constructor(helper: HelperService, schedulerRegistry: SchedulerRegistry);
    handleCron(): Promise<void>;
}
