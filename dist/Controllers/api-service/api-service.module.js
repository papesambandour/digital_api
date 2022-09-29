"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiServiceModule = void 0;
const common_1 = require("@nestjs/common");
const api_service_service_1 = require("./api-service.service");
const api_service_controller_1 = require("./api-service.controller");
const helper_service_1 = require("../../helper.service");
const send_callback_task_service_1 = require("./send-callback-task/send-callback-task.service");
const check_transaction_status_cron_service_1 = require("./check-transaction-status-cron/check-transaction-status-cron.service");
const check_transaction_timeout_cron_service_1 = require("./check-transaction-timeout-cron/check-transaction-timeout-cron.service");
const send_pending_delay_alert_task_service_1 = require("./send-pending-delay-alert-task/send-pending-delay-alert-task.service");
let ApiServiceModule = class ApiServiceModule {
};
ApiServiceModule = __decorate([
    common_1.Module({
        exports: [],
        controllers: [api_service_controller_1.ApiServiceController],
        imports: [
            common_1.HttpModule.register({
                timeout: 60000,
                maxRedirects: 5,
            }),
        ],
        providers: [
            api_service_service_1.ApiServiceService,
            helper_service_1.HelperService,
            send_callback_task_service_1.SendCallbackTaskService,
            check_transaction_status_cron_service_1.CheckTransactionStatusCronService,
            check_transaction_timeout_cron_service_1.CheckTransactionTimeoutCronService,
            send_pending_delay_alert_task_service_1.SendPendingDelayAlertTaskService,
        ],
    })
], ApiServiceModule);
exports.ApiServiceModule = ApiServiceModule;
//# sourceMappingURL=api-service.module.js.map