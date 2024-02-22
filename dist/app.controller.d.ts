import { AppService } from './app.service';
import { ControllerBase } from './Controllers/Controller';
import { HelperService } from './helper.service';
import { Response } from 'express';
import { Connection } from 'typeorm';
import { Confirm3dsInDto } from './Controllers/api-service/dto/Confirm3dsInDto';
export declare class AppController extends ControllerBase {
    private readonly appService;
    private readonly helper;
    private readonly connection;
    constructor(appService: AppService, helper: HelperService, connection: Connection);
    getHello(request: any): Promise<any>;
    apkVersion(): Promise<any>;
    cleanDataBase(): Promise<{
        ok: string;
    }>;
    fuckFavicon(): Promise<string>;
    deepLink(transactionId: string, res: Response): Promise<void>;
    home(res: Response, message: string | undefined): Promise<void>;
    confirm3dsAuth(confirm3dsAuthInDto: Confirm3dsInDto, transactionId: string, res: Response): Promise<void | Response<any, Record<string, any>> | {
        code: number;
        msg: any;
        error: boolean;
        data: object;
    }>;
}
