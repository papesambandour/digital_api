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
var CheckTransactionStatusCronService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckTransactionStatusCronService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const helper_service_1 = require("../../../helper.service");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
const Transactions_entity_1 = require("../../../Models/Entities/Transactions.entity");
const Queue = require("simple-promise-queue");
const typeorm_1 = require("typeorm");
const main_1 = require("../../../main");
let CheckTransactionStatusCronService = CheckTransactionStatusCronService_1 = class CheckTransactionStatusCronService {
    constructor(helper, schedulerRegistry) {
        this.helper = helper;
        this.schedulerRegistry = schedulerRegistry;
    }
    async handleCron() {
        if (CheckTransactionStatusCronService_1.canHandle === undefined) {
            CheckTransactionStatusCronService_1.canHandle =
                Enum_entity_1.CONSTANT.ACTIVATE_CRON() && process.env.RUNTIME_ENV === 'CRON';
        }
        let queue;
        try {
            if (CheckTransactionStatusCronService_1.canHandle) {
                CheckTransactionStatusCronService_1.canHandle = false;
                queue = new Queue({
                    autoStart: true,
                    concurrency: Enum_entity_1.CONSTANT.CHECK_TRANSACTION_CONCURENCY_SEND(),
                });
                const promiseArr = [];
                const transactions = await CheckTransactionStatusCronService_1.fetchPendingTransaction();
                console.log('transaction for check status fetched', transactions.length);
                for (const transaction of transactions) {
                    promiseArr.push(queue.pushTask(async (resolve, _) => {
                        setTimeout(() => {
                            resolve(['timeout checkstatus', transaction]);
                        }, Enum_entity_1.CONSTANT.CHECK_STATUS_TASK_ITEM_TIME_OUT_IN_SECOND() * 1000);
                        const apiManager = await this.helper.getApiManagerInterface(transaction.sousServices.code, null);
                        apiManager
                            .checkStatusTransaction({
                            transaction: transaction,
                        })
                            .then(async (data) => {
                            resolve(data);
                        })
                            .catch(async (error) => {
                            resolve(error);
                            this.helper
                                .notifyAdmin(`Un CheckStatusTransaction resout avec une erreur\n${error === null || error === void 0 ? void 0 : error.message}\n\n${error === null || error === void 0 ? void 0 : error.stack}\n${main_1.serializeData(error)}`, Enum_entity_1.TypeEvenEnum.CRON_EXCEPTION, {}, true)
                                .then();
                        });
                    }));
                }
                await Promise.all(promiseArr);
                CheckTransactionStatusCronService_1.canHandle = true;
                queue === null || queue === void 0 ? void 0 : queue.end();
            }
        }
        catch (e) {
            console.error(e);
            this.helper
                .notifyAdmin(`Une exception c'est produite dans le cron Check Status\n${e.message}\n${e.stack}`, Enum_entity_1.TypeEvenEnum.CRON_EXCEPTION, {}, true)
                .then();
            CheckTransactionStatusCronService_1.canHandle = true;
            queue === null || queue === void 0 ? void 0 : queue.end();
        }
    }
    static async fetchPendingTransaction() {
        const where = [
            {
                needCheckTransaction: 1,
                statut: typeorm_1.In([Enum_entity_1.StatusEnum.PROCESSING, Enum_entity_1.StatusEnum.PENDING]),
                timeOutAt: typeorm_1.MoreThan(new Date()),
                initResponseEndAt: typeorm_1.Not(typeorm_1.IsNull()),
            },
            {
                needCheckTransaction: 1,
                statut: typeorm_1.In([Enum_entity_1.StatusEnum.PROCESSING, Enum_entity_1.StatusEnum.PENDING]),
                timeOutAt: typeorm_1.IsNull(),
                initResponseEndAt: typeorm_1.Not(typeorm_1.IsNull()),
            },
        ];
        return await Transactions_entity_1.Transactions.find({
            where: where,
            relations: ['sousServices'],
        });
    }
};
CheckTransactionStatusCronService.canHandle = undefined;
__decorate([
    schedule_1.Cron('*/3 * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CheckTransactionStatusCronService.prototype, "handleCron", null);
CheckTransactionStatusCronService = CheckTransactionStatusCronService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [helper_service_1.HelperService,
        schedule_1.SchedulerRegistry])
], CheckTransactionStatusCronService);
exports.CheckTransactionStatusCronService = CheckTransactionStatusCronService;
//# sourceMappingURL=check-transaction-status-cron.service.js.map