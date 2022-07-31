import { AppService } from './app.service';
import { ControllerBase } from './Controllers/Controller';
export declare class AppController extends ControllerBase {
    private readonly appService;
    constructor(appService: AppService);
    getHello(request: any): Promise<any>;
    apkVersion(): Promise<any>;
}
