"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomBaseModel = void 0;
const typeorm_1 = require("typeorm");
class CustomBaseModel extends typeorm_1.BaseEntity {
    async save(options) {
        console.log('saving modele', this.constructor.name, this['statut']);
        return super.save(options);
    }
}
exports.CustomBaseModel = CustomBaseModel;
//# sourceMappingURL=CustomBaseModel.js.map