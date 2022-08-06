import { Logger } from "@nestjs/common";
import { Connection } from 'typeorm';
export declare class BootstrapService {
    private readonly connection;
    static logger: Logger;
    constructor(connection: Connection);
    init(): Promise<void>;
    redefineLog(): void;
}
