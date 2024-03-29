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
var SendPendingDelayAlertTaskService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendPendingDelayAlertTaskService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
const Transactions_entity_1 = require("../../../Models/Entities/Transactions.entity");
const typeorm_1 = require("typeorm");
const helper_service_1 = require("../../../helper.service");
const config_1 = require("../../../sdk/Discord/config");
let SendPendingDelayAlertTaskService = SendPendingDelayAlertTaskService_1 = class SendPendingDelayAlertTaskService {
    constructor(helper, schedulerRegistry) {
        this.helper = helper;
        this.schedulerRegistry = schedulerRegistry;
    }
    async handleCron() {
        if (SendPendingDelayAlertTaskService_1.canHandle === undefined) {
            SendPendingDelayAlertTaskService_1.canHandle =
                Enum_entity_1.CONSTANT.ACTIVATE_CRON() && process.env.RUNTIME_ENV === 'CRON';
        }
        const transactions = await this.fetchPendingTransaction();
        const trInfo = transactions
            .map((tr) => `TR ID: ${tr.transactionId}: ${tr.codeSousService}`)
            .join('\n');
        const trIdResume = transactions
            .map((tr) => `${tr.transactionId}`)
            .join(',');
        const message = `Transaction en pending apres le délais:\n${trInfo}\n${trIdResume}`;
        console.log(message, transactions.length);
        if (!transactions.length) {
            return;
        }
        await this.helper.notifyAdmin(message, Enum_entity_1.TypeEvenEnum.PENDING_AFTER_DELAY, {}, false, config_1.discordApiConfig().pendingAfterDelayChannelName);
        console.log('---------');
    }
    async fetchPendingTransaction() {
        const timeBeforeCashin = this.helper.addMinuteToDate(new Date(), -parseInt(process.env.CASHIN_DELAY_PENDING_TRANSACTION_MINUTE_BEFORE_ALERT));
        const timeBeforeCashOut = this.helper.addMinuteToDate(new Date(), -parseInt(process.env.CASHOUT_DELAY_PENDING_TRANSACTION_MINUTE_BEFORE_ALERT));
        return await Transactions_entity_1.Transactions.find({
            where: [
                {
                    statut: typeorm_1.In([Enum_entity_1.StatusEnum.PROCESSING, Enum_entity_1.StatusEnum.PENDING]),
                    typeOperation: Enum_entity_1.TypeOperationEnum.DEBIT,
                    createdAt: typeorm_1.LessThan(timeBeforeCashin),
                    dateCreation: typeorm_1.MoreThanOrEqual(new Date(process.env.DELAY_PENDING_REF_START_DATE)),
                    codeSousService: typeorm_1.Not([
                        Enum_entity_1.SOUS_SERVICE_ENUM.BANK_TRANSFER_SN_API_CASH_IN,
                    ]),
                },
                {
                    statut: typeorm_1.In([Enum_entity_1.StatusEnum.PROCESSING, Enum_entity_1.StatusEnum.PENDING]),
                    typeOperation: Enum_entity_1.TypeOperationEnum.CREDIT,
                    createdAt: typeorm_1.LessThan(timeBeforeCashOut),
                    dateCreation: typeorm_1.MoreThanOrEqual(new Date(process.env.DELAY_PENDING_REF_START_DATE)),
                    codeSousService: typeorm_1.Not([
                        Enum_entity_1.SOUS_SERVICE_ENUM.BANK_TRANSFER_SN_API_CASH_IN,
                    ]),
                },
            ],
            take: 50,
            relations: [],
        });
    }
};
SendPendingDelayAlertTaskService.canHandle = undefined;
__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_5_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SendPendingDelayAlertTaskService.prototype, "handleCron", null);
SendPendingDelayAlertTaskService = SendPendingDelayAlertTaskService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [helper_service_1.HelperService,
        schedule_1.SchedulerRegistry])
], SendPendingDelayAlertTaskService);
exports.SendPendingDelayAlertTaskService = SendPendingDelayAlertTaskService;
//# sourceMappingURL=send-pending-delay-alert-task.service.js.map