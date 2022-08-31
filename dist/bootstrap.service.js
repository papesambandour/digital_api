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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var BootstrapService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootstrapService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const helper_service_1 = require("./helper.service");
const WhatsAppApiProvider_1 = require("./sdk/WhatsApp/WhatsAppApiProvider");
const DiscordApiProvider_1 = require("./sdk/Discord/DiscordApiProvider");
const Enum_entity_1 = require("./Models/Entities/Enum.entity");
let BootstrapService = BootstrapService_1 = class BootstrapService {
    constructor(connection, helper) {
        this.connection = connection;
        this.helper = helper;
    }
    async init() {
        this.redefineLog();
        await this.testConfig();
        await this.initExternalService();
        try {
            console.log('Init phone');
            await this.connection.query(`update phones
       set phone_state = 'UNUSED',
           socket      = 'DISCONNECTED'`);
            console.log('Finish init phone');
        }
        catch (e) {
            console.log('Error init phone');
        }
    }
    async testConfig() {
        if (process.env.ACTIVE_TEST_CONFIG === 'true') {
            await this.helper.checkServiceConfig();
        }
    }
    redefineLog() {
        if (process.env.MODE != 'dev') {
            console.log = (...args) => {
                try {
                    BootstrapService_1.logger.log(JSON.stringify(args));
                }
                catch (e) { }
            };
            console.error = (...args) => {
                try {
                    BootstrapService_1.logger.log(JSON.stringify(args));
                }
                catch (e) { }
            };
            console.table = (...args) => {
                try {
                    BootstrapService_1.logger.log(JSON.stringify(args));
                }
                catch (e) { }
            };
            console.info = (...args) => {
                try {
                    BootstrapService_1.logger.log(JSON.stringify(args));
                }
                catch (e) { }
            };
            console.debug = (...args) => {
                try {
                    BootstrapService_1.logger.log(JSON.stringify(args));
                }
                catch (e) { }
            };
            console.trace = (...args) => {
                try {
                    BootstrapService_1.logger.log(JSON.stringify(args));
                }
                catch (e) { }
            };
            console.warn = (...args) => {
                try {
                    BootstrapService_1.logger.log(JSON.stringify(args));
                }
                catch (e) { }
            };
        }
    }
    async initExternalService() {
        WhatsAppApiProvider_1.default.getInstance().then();
        DiscordApiProvider_1.default.getInstance().then((discord) => {
            if (process.env.MODE === 'production') {
                this.helper.notifyAdmin('Serveur Restart', Enum_entity_1.TypeEvenEnum.SERVER_RESTART);
            }
        });
    }
};
BootstrapService.logger = new common_1.Logger('INTECH_API_LOGS');
BootstrapService = BootstrapService_1 = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectConnection()),
    __metadata("design:paramtypes", [typeorm_2.Connection,
        helper_service_1.HelperService])
], BootstrapService);
exports.BootstrapService = BootstrapService;
//# sourceMappingURL=bootstrap.service.js.map