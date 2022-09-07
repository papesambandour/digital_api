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
exports.PartnerServiceService = void 0;
const common_1 = require("@nestjs/common");
const helper_service_1 = require("../../helper.service");
const Enum_entity_1 = require("../../Models/Entities/Enum.entity");
let PartnerServiceService = class PartnerServiceService {
    constructor(helper) {
        this.helper = helper;
    }
    async refund(refundDtoIn) {
        const transaction = await this.helper.getTransactionById(refundDtoIn.transactionId, []);
        const canRefund = await this.helper.canRefundOperation(transaction);
        if (!canRefund.allow) {
            return {
                status: Enum_entity_1.StatusEnum.FAILLED,
                message: canRefund.message,
            };
        }
        const apiManager = (await this.helper.getApiManagerInterface(transaction.codeSousService, null));
        const refund = await apiManager.refundTransaction({
            transaction: transaction,
        });
        if (refund.status === Enum_entity_1.StatusEnum.SUCCESS) {
            await this.helper.operationPartnerCancelTransaction(transaction, true);
        }
        return {
            status: refund.status,
            message: refund.partnerMessage,
        };
    }
};
PartnerServiceService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [helper_service_1.HelperService])
], PartnerServiceService);
exports.PartnerServiceService = PartnerServiceService;
//# sourceMappingURL=partner-service.service.js.map