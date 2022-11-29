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
exports.ServiceDailyBalanceAlertService = void 0;
const common_1 = require("@nestjs/common");
const helper_service_1 = require("../../../helper.service");
const schedule_1 = require("@nestjs/schedule");
const Services_entity_1 = require("../../../Models/Entities/Services.entity");
const Phones_entity_1 = require("../../../Models/Entities/Phones.entity");
const WhatsAppApiProvider_1 = require("../../../sdk/WhatsApp/WhatsAppApiProvider");
let ServiceDailyBalanceAlertService = class ServiceDailyBalanceAlertService {
    constructor(helper, schedulerRegistry) {
        this.helper = helper;
        this.schedulerRegistry = schedulerRegistry;
    }
    async handleCron() {
        console.log('sok');
        const services = await Services_entity_1.Services.find({
            where: {
                state: 'ACTIVED',
            },
        });
        let output = `SOlDE INTECH API au ${new Date()
            .toISOString()
            .replace('T', '')
            .substring(0, 19)}\n\n`;
        for (const service of services) {
            const phone = await Phones_entity_1.Phones.find({
                where: {
                    servicesId: service.id,
                },
            });
            const balance = phone.reduce((acc, cur) => acc + cur.solde, 0);
            const balanceApi = phone.reduce((acc, cur) => acc + cur.soldeApi, 0);
            output += `${service.name}: Système(${this.helper.formatMoney(balance)} CFA) / Reél(${this.helper.formatMoney(balanceApi)} CFA)\n\n\n`;
        }
        const tos = this.helper.getBalanceAlertTo();
        for (const to of tos) {
            await WhatsAppApiProvider_1.default.sendMessageToOne(to, output).then();
        }
    }
};
__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServiceDailyBalanceAlertService.prototype, "handleCron", null);
ServiceDailyBalanceAlertService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [helper_service_1.HelperService,
        schedule_1.SchedulerRegistry])
], ServiceDailyBalanceAlertService);
exports.ServiceDailyBalanceAlertService = ServiceDailyBalanceAlertService;
//# sourceMappingURL=service-daily-balance-alert.service.js.map