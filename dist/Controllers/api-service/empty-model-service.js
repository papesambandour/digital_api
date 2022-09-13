"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyModelApiManagerService = void 0;
const api_manager_interface_service_1 = require("./api-manager-interface/api-manager-interface.service");
class EmptyModelApiManagerService extends api_manager_interface_service_1.ApiManagerInterface {
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
        return baseResponse;
    }
    async refundTransaction(params) {
        return await this.notImplementedYet(params);
    }
}
exports.EmptyModelApiManagerService = EmptyModelApiManagerService;
//# sourceMappingURL=empty-model-service.js.map