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
var SendCallbackTaskService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendCallbackTaskService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const helper_service_1 = require("../../../helper.service");
const Transactions_entity_1 = require("../../../Models/Entities/Transactions.entity");
const typeorm_1 = require("typeorm");
const Queue = require("simple-promise-queue");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
let SendCallbackTaskService = SendCallbackTaskService_1 = class SendCallbackTaskService {
    constructor(helper, schedulerRegistry) {
        this.helper = helper;
        this.schedulerRegistry = schedulerRegistry;
    }
    async handleCron() {
        if (SendCallbackTaskService_1.canHandle === undefined) {
            SendCallbackTaskService_1.canHandle = Enum_entity_1.CONSTANT.ACTIVATE_CRON();
        }
        try {
            if (SendCallbackTaskService_1.canHandle) {
                SendCallbackTaskService_1.canHandle = false;
                console.debug('SendCallbackTaskService when the current occure ' +
                    this.helper.mysqlDate(new Date()));
                const queue = new Queue({
                    autoStart: true,
                    concurrency: Enum_entity_1.CONSTANT.CALLBACK_CONCURENCY_SEND(),
                });
                const promiseArr = [];
                const transactions = await SendCallbackTaskService_1.fetchPendingTransaction();
                console.log('traansaction for send callback fetched', transactions.length);
                for (const transaction of transactions) {
                    promiseArr.push(queue.pushTask((resolve) => {
                        this.helper
                            .sendCallBack(transaction)
                            .then((data) => {
                            resolve(data);
                        })
                            .catch((error) => {
                            resolve(error);
                        });
                    }));
                }
                await Promise.all(promiseArr);
                SendCallbackTaskService_1.canHandle = true;
            }
        }
        catch (e) {
            console.error(e);
            SendCallbackTaskService_1.canHandle = true;
        }
    }
    static async fetchPendingTransaction() {
        return await Transactions_entity_1.Transactions.find({
            where: {
                callbackReady: 1,
                nextSendCallbackDate: typeorm_1.LessThanOrEqual(new Date()),
                callBackRetryCount: typeorm_1.LessThan(parseInt(process.env.MAX_IPN_RETRY)),
                callbackIsSend: typeorm_1.In([0, 2]),
            },
            take: Enum_entity_1.CONSTANT.CALLBACK_CONCURENCY_SEND(),
            relations: ['sousServices'],
        });
    }
};
SendCallbackTaskService.canHandle = undefined;
__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_5_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SendCallbackTaskService.prototype, "handleCron", null);
SendCallbackTaskService = SendCallbackTaskService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [helper_service_1.HelperService,
        schedule_1.SchedulerRegistry])
], SendCallbackTaskService);
exports.SendCallbackTaskService = SendCallbackTaskService;
//# sourceMappingURL=send-callback-task.service.js.map