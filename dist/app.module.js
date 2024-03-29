"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const HttpExceptionFilter_1 = require("./Filters/HttpExceptionFilter");
const services_module_1 = require("./Services/services.module");
const sockets_module_1 = require("./Sockets/sockets.module");
const api_service_module_1 = require("./Controllers/api-service/api-service.module");
const helper_service_1 = require("./helper.service");
const bootstrap_service_1 = require("./bootstrap.service");
const schedule_1 = require("@nestjs/schedule");
const partner_intern_module_1 = require("./Controllers/partener-intern/partner-intern.module");
let AppModule = class AppModule {
    constructor(bootstrapService) {
        this.bootstrapService = bootstrapService;
    }
    async onModuleInit() {
        console.log(`Initialization...`, (process.env.RUNTIME_ENV === 'CRON'
            ? parseInt(process.env.CRON_POOL_CONNECTION_LIMIT)
            : parseInt(process.env.POOL_CONNECTION_LIMIT)) || 10);
        await this.bootstrapService.init();
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DATABASE_HOST,
                port: +process.env.DATABASE_PORT,
                username: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                logging: false,
                synchronize: process.env.SYNC_DATABASE === 'SYNC' &&
                    process.env.RUNTIME_ENV !== 'CRON',
                autoLoadEntities: true,
                extra: {
                    connectionLimit: (process.env.RUNTIME_ENV === 'CRON'
                        ? parseInt(process.env.CRON_POOL_CONNECTION_LIMIT)
                        : parseInt(process.env.POOL_CONNECTION_LIMIT)) || 10,
                },
            }),
            services_module_1.ServicesModule,
            api_service_module_1.ApiServiceModule,
            sockets_module_1.SocketsModule,
            schedule_1.ScheduleModule.forRoot(),
            common_1.HttpModule.register({
                timeout: 60000,
                maxRedirects: 5,
            }),
            partner_intern_module_1.PartnerInternModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            helper_service_1.HelperService,
            {
                provide: core_1.APP_FILTER,
                useClass: HttpExceptionFilter_1.HttpExceptionFilter,
            },
            bootstrap_service_1.BootstrapService,
        ],
        exports: [helper_service_1.HelperService],
    }),
    __metadata("design:paramtypes", [bootstrap_service_1.BootstrapService])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map