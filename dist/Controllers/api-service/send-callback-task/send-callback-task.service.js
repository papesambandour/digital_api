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
        console.debug('SendCallbackTaskService when the current occure ', this.helper.mysqlDate(new Date()), SendCallbackTaskService_1.canHandle);
        let queue;
        try {
            if (SendCallbackTaskService_1.canHandle) {
                SendCallbackTaskService_1.canHandle = false;
                queue = new Queue({
                    autoStart: true,
                    concurrency: Enum_entity_1.CONSTANT.CALLBACK_CONCURENCY_SEND(),
                });
                const promiseArr = [];
                let transactions = await SendCallbackTaskService_1.fetchPendingTransaction();
                this.shuffleArray(transactions);
                transactions = transactions.slice(0, Enum_entity_1.CONSTANT.CALLBACK_CONCURENCY_SEND());
                console.log('traansaction for send callback fetched', transactions.length);
                for (const transaction of transactions) {
                    promiseArr.push(queue.pushTask((resolve) => {
                        setTimeout(() => {
                            resolve(['timeout callback', transaction]);
                        }, Enum_entity_1.CONSTANT.IPN_TASK_ITEM_TIME_OUT_IN_SECOND() * 1000);
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
                queue === null || queue === void 0 ? void 0 : queue.end();
            }
        }
        catch (e) {
            console.error(e);
            SendCallbackTaskService_1.canHandle = true;
            queue === null || queue === void 0 ? void 0 : queue.end();
        }
    }
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    static async fetchPendingTransaction() {
        return await Transactions_entity_1.Transactions.find({
            where: [
                {
                    callbackReady: 1,
                    nextSendCallbackDate: typeorm_1.LessThanOrEqual(new Date()),
                    callBackRetryCount: typeorm_1.LessThan(Enum_entity_1.CONSTANT.MAX_RETRY_CALLBACK()),
                    callbackIsSend: typeorm_1.In([0, 2]),
                },
                {
                    callbackReady: 0,
                    nextSendCallbackDate: typeorm_1.IsNull(),
                    callBackRetryCount: typeorm_1.LessThan(Enum_entity_1.CONSTANT.MAX_RETRY_CALLBACK()),
                    callbackIsSend: typeorm_1.In([0, 2]),
                    statut: typeorm_1.In([Enum_entity_1.StatusEnum.FAILLED, Enum_entity_1.StatusEnum.SUCCESS]),
                    dateCreation: typeorm_1.MoreThanOrEqual(new Date(process.env.NEW_CRON_IPN_REF_START_DATE)),
                },
            ],
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