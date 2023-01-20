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
var DailyPartnerBalanceAlertService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyPartnerBalanceAlertService = void 0;
const common_1 = require("@nestjs/common");
const helper_service_1 = require("../../../helper.service");
const schedule_1 = require("@nestjs/schedule");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
const WhatsAppApiProvider_1 = require("../../../sdk/WhatsApp/WhatsAppApiProvider");
const Parteners_entity_1 = require("../../../Models/Entities/Parteners.entity");
let DailyPartnerBalanceAlertService = DailyPartnerBalanceAlertService_1 = class DailyPartnerBalanceAlertService {
    constructor(helper, schedulerRegistry) {
        this.helper = helper;
        this.schedulerRegistry = schedulerRegistry;
    }
    async handleCron() {
        console.log('sok');
        if (DailyPartnerBalanceAlertService_1.canHandle === undefined) {
            DailyPartnerBalanceAlertService_1.canHandle =
                Enum_entity_1.CONSTANT.ACTIVATE_CRON() && process.env.RUNTIME_ENV !== 'CRON';
        }
        const partners = await Parteners_entity_1.Parteners.find({
            where: {
                state: 'ACTIVED',
            },
        });
        let output = `SOlDE PARTENAIRES INTECH API au ${new Date()
            .toISOString()
            .replace('T', '')
            .substring(0, 19)}\n\n`;
        for (const partner of partners) {
            const balance = partner.solde + partner.soldeCommission;
            output += `${partner.name}: ${this.helper.formatMoney(balance)} CFA\n\n\n`;
        }
        this.helper.notifyAdmin(output, Enum_entity_1.TypeEvenEnum.SOLDE_PARTNER).then();
        const tos = this.helper.getBalanceAlertTo();
        for (const to of tos) {
            await WhatsAppApiProvider_1.default.sendMessageToOne(to, output).then();
        }
    }
};
DailyPartnerBalanceAlertService.canHandle = undefined;
__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DailyPartnerBalanceAlertService.prototype, "handleCron", null);
DailyPartnerBalanceAlertService = DailyPartnerBalanceAlertService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [helper_service_1.HelperService,
        schedule_1.SchedulerRegistry])
], DailyPartnerBalanceAlertService);
exports.DailyPartnerBalanceAlertService = DailyPartnerBalanceAlertService;
//# sourceMappingURL=daily-partner-balance-alert.service.js.map