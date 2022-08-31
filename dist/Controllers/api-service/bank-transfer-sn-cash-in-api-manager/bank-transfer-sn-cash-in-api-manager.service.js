"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankTransferSnCashInApiManagerService = void 0;
const api_manager_interface_service_1 = require("../api-manager-interface/api-manager-interface.service");
class BankTransferSnCashInApiManagerService extends api_manager_interface_service_1.ApiManagerInterface {
    async checkStatusTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async confirmTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async getBalance(params) {
        return Promise.resolve({
            success: false,
            newBalance: null,
        });
    }
    async handleCallbackTransaction(params) {
        return await this.notImplementedYet(params);
    }
    async initTransaction(params) {
        const baseResponse = (await this.notImplementedYet(params));
        baseResponse.refundOnFailed = true;
        return baseResponse;
    }
    async refundTransaction(params) {
        return await this.notImplementedYet(params);
    }
}
exports.BankTransferSnCashInApiManagerService = BankTransferSnCashInApiManagerService;
//# sourceMappingURL=bank-transfer-sn-cash-in-api-manager.service.js.map