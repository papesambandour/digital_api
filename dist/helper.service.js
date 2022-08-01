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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperService = void 0;
const common_1 = require("@nestjs/common");
const Enum_entity_1 = require("./Models/Entities/Enum.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const OperationPhones_entity_1 = require("./Models/Entities/OperationPhones.entity");
const DtoOperationPhones_1 = require("./Models/Dto/DtoOperationPhones");
let HelperService = class HelperService {
    constructor(connection) {
        this.connection = connection;
    }
    async notifyAdmin(message, typeEvent, data = {}) {
        console.log(`CONTACTA ADMIN TO ${message} for EVEN : ${typeEvent}. Data:`, data);
    }
    async setSoldeTable(value, tableName, id, field) {
        return this.connection.query(`update ${tableName} set ${field} =  ${field} + ${value} where id=${id}`);
    }
    async operationPhone(phone, amount, typeOperation, comment, operationId = null, operation = Enum_entity_1.OperationEnumPhone.TRANSACTION) {
        const operationPhones = new DtoOperationPhones_1.DtoOperationPhones();
        operationPhones.commentaire = comment;
        operationPhones.amount = Math.abs(amount);
        operationPhones.statut = Enum_entity_1.StatusEnum.SUCCESS;
        operationPhones.createdAt = new Date();
        operationPhones.dateCreation = new Date();
        operationPhones.dateSuccess = new Date();
        operationPhones.dateProcessing = new Date();
        operationPhones.typeOperation = typeOperation;
        operationPhones.phonesId = phone.id;
        operationPhones.operation = operation;
        operationPhones.operationPhonesId = operationId;
        operationPhones.soldeBefor = phone.solde;
        operationPhones.soldeAfter = phone.solde + amount;
        await OperationPhones_entity_1.OperationPhones.insert(operationPhones, {
            transaction: true,
        });
    }
};
HelperService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectConnection()),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], HelperService);
exports.HelperService = HelperService;
//# sourceMappingURL=helper.service.js.map