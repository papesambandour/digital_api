"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomBaseModel = void 0;
const typeorm_1 = require("typeorm");
class CustomBaseModel extends typeorm_1.BaseEntity {
    async save(options) {
        console.log('saving modele', this.constructor.name, 'status', this['statut'], 'id', this['id'], 'needCheckTransaction', this['needCheckTransaction'], 'callbackReady', this['callbackReady'], 'transactionIsFinish', this['transactionIsFinish'], 'callBackRetryCount', this['callBackRetryCount']);
        return super.save(options);
    }
}
exports.CustomBaseModel = CustomBaseModel;
//# sourceMappingURL=CustomBaseModel.js.map