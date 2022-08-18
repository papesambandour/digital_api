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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const Controller_1 = require("./Controllers/Controller");
const helper_service_1 = require("./helper.service");
const Enum_entity_1 = require("./Models/Entities/Enum.entity");
const SousServices_entity_1 = require("./Models/Entities/SousServices.entity");
const typeorm_1 = require("typeorm");
let AppController = class AppController extends Controller_1.ControllerBase {
    constructor(appService, helper) {
        super();
        this.appService = appService;
        this.helper = helper;
    }
    async getHello(request) {
        try {
            console.log('REQUEST CALLBACK', request.body);
            return { api: 'SimbotService', body: request.body };
        }
        catch (e) {
            return e.message;
        }
    }
    async apkVersion() {
        try {
            return {
                latest: process.env.APK_VERSION,
                url: process.env.APK_URL,
            };
        }
        catch (e) {
            return e.message;
        }
    }
    async deepLink(transactionId, res) {
        console.log('in deep link method');
        const transaction = await this.helper.getTransactionByGeneratedId(transactionId);
        if (!transaction || !transaction.deepLinkUrl) {
            return res.send('');
        }
        if (transaction.statut !== Enum_entity_1.StatusEnum.PROCESSING) {
            if (transaction.statut === Enum_entity_1.StatusEnum.SUCCESS) {
                console.log('here 2');
                return res.redirect(transaction.successRedirectUrl || process.env.APP_INTERNAL_URL);
            }
            else {
                console.log('here 2');
                return res.redirect(transaction.errorRedirectUrl || process.env.APP_INTERNAL_URL);
            }
        }
        console.log('here', transaction.deepLinkUrl);
        const link = transaction.deepLinkUrl;
        return res.render('deep', {
            link,
        });
    }
    async services() {
        const services = await SousServices_entity_1.SousServices.find({
            where: {
                state: typeorm_1.Equal(Enum_entity_1.StateEnum.ACTIVED),
            },
            relations: ['typeServices'],
            select: ['name', 'typeOperation', 'typeServices', 'code'],
            order: {
                id: 'ASC',
            },
        });
        return {
            success: true,
            services: services.map((s) => {
                return {
                    name: s.name,
                    codeService: s.code,
                    typeOperation: s.typeOperation,
                    typeService: s.typeServices.code,
                };
            }),
        };
    }
};
__decorate([
    common_1.Post('/callback'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getHello", null);
__decorate([
    common_1.Get('/checkVersion'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "apkVersion", null);
__decorate([
    common_1.Get('deep/:transactionId'),
    __param(0, common_1.Param('transactionId')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deepLink", null);
__decorate([
    common_1.Get('services'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "services", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        helper_service_1.HelperService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map