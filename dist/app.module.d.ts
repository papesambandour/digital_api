import { OnModuleInit } from '@nestjs/common';
import { BootstrapService } from './bootstrap.service';
export declare class AppModule implements OnModuleInit {
    private bootstrapService;
    constructor(bootstrapService: BootstrapService);
    onModuleInit(): Promise<void>;
}
