import { Logger } from '@nestjs/common';
import { Connection } from "typeorm";
import { HelperService } from './helper.service';
export declare class BootstrapService {
    private readonly connection;
    private helper;
    static logger: Logger;
    constructor(connection: Connection, helper: HelperService);
    init(): Promise<void>;
    testConfig(): Promise<void>;
    redefineLog(): void;
}
