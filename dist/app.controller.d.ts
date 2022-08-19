import { AppService } from './app.service';
import { ControllerBase } from './Controllers/Controller';
import { HelperService } from './helper.service';
import { Response } from 'express';
export declare class AppController extends ControllerBase {
    private readonly appService;
    private readonly helper;
    constructor(appService: AppService, helper: HelperService);
    getHello(request: any): Promise<any>;
    apkVersion(): Promise<any>;
    deepLink(transactionId: string, res: Response): Promise<void | Response<any, Record<string, any>>>;
}
