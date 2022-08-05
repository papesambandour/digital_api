import { Connection } from 'typeorm';
export declare class BootstrapService {
    private readonly connection;
    constructor(connection: Connection);
    init(): Promise<void>;
    redefineLog(): void;
}
