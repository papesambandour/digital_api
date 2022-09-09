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
var CheckTransactionTimeoutCronService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckTransactionTimeoutCronService = void 0;
const common_1 = require("@nestjs/common");
const helper_service_1 = require("../../../helper.service");
const schedule_1 = require("@nestjs/schedule");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
const Transactions_entity_1 = require("../../../Models/Entities/Transactions.entity");
const Queue = require("simple-promise-queue");
const typeorm_1 = require("typeorm");
let CheckTransactionTimeoutCronService = CheckTransactionTimeoutCronService_1 = class CheckTransactionTimeoutCronService {
    constructor(helper, schedulerRegistry) {
        this.helper = helper;
        this.schedulerRegistry = schedulerRegistry;
        console.log(Enum_entity_1.CONSTANT.ACTIVATE_CRON());
    }
    async handleCron() {
        if (CheckTransactionTimeoutCronService_1.canHandle === undefined) {
            CheckTransactionTimeoutCronService_1.canHandle = Enum_entity_1.CONSTANT.ACTIVATE_CRON();
        }
        try {
            if (CheckTransactionTimeoutCronService_1.canHandle) {
                CheckTransactionTimeoutCronService_1.canHandle = false;
                console.debug('CheckTransactionTimeoutCronService when the current occure ' +
                    this.helper.mysqlDate(new Date()));
                const queue = new Queue({
                    autoStart: true,
                    concurrency: Enum_entity_1.CONSTANT.CHECK_TRANSACTION_CONCURENCY_SEND(),
                });
                const promiseArr = [];
                const transactions = await CheckTransactionTimeoutCronService_1.fetchPendingTransaction();
                console.log('transaction for check status fetched', transactions.length);
                for (const transaction of transactions) {
                    promiseArr.push(queue.pushTask(async (resolve) => {
                        transaction.statut = Enum_entity_1.StatusEnum.FAILLED;
                        transaction.preStatut = Enum_entity_1.StatusEnum.FAILLED;
                        transaction.reachedTimeout = 1;
                        transaction
                            .save()
                            .then(async (data) => {
                            await this.helper.operationPartnerCancelTransaction(transaction);
                            resolve(data);
                        })
                            .catch(async (error) => {
                            resolve(error);
                        })
                            .finally(() => {
                            this.helper.setIsCallbackReadyValue(transaction);
                        });
                    }));
                }
                await Promise.all(promiseArr);
                CheckTransactionTimeoutCronService_1.canHandle = true;
            }
        }
        catch (e) {
            console.error(e);
            CheckTransactionTimeoutCronService_1.canHandle = true;
        }
    }
    static async fetchPendingTransaction() {
        return await Transactions_entity_1.Transactions.find({
            where: {
                timeOutAt: typeorm_1.MoreThanOrEqual(new Date()),
                statut: typeorm_1.In([Enum_entity_1.StatusEnum.PROCESSING, Enum_entity_1.StatusEnum.PENDING]),
            },
            relations: ['sousServices'],
        });
    }
};
CheckTransactionTimeoutCronService.canHandle = undefined;
__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_5_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CheckTransactionTimeoutCronService.prototype, "handleCron", null);
CheckTransactionTimeoutCronService = CheckTransactionTimeoutCronService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [helper_service_1.HelperService,
        schedule_1.SchedulerRegistry])
], CheckTransactionTimeoutCronService);
exports.CheckTransactionTimeoutCronService = CheckTransactionTimeoutCronService;
//# sourceMappingURL=check-transaction-timeout-cron.service.js.map