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
exports.UssdExecutionMessages = void 0;
const typeorm_1 = require("typeorm");
const Phones_entity_1 = require("./Phones.entity");
const Transactions_entity_1 = require("./Transactions.entity");
let UssdExecutionMessages = class UssdExecutionMessages extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], UssdExecutionMessages.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('longtext', { name: 'message', nullable: true }),
    __metadata("design:type", String)
], UssdExecutionMessages.prototype, "message", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'state',
        enum: ['ACTIVED', 'INACTIVED', 'DELETED'],
        default: 'ACTIVED',
    }),
    __metadata("design:type", String)
], UssdExecutionMessages.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'created_at' }),
    __metadata("design:type", Date)
], UssdExecutionMessages.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'updated_at', nullable: true }),
    __metadata("design:type", Date)
], UssdExecutionMessages.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'phones_id' }),
    __metadata("design:type", Number)
], UssdExecutionMessages.prototype, "phonesId", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'transactions_id', nullable: true }),
    __metadata("design:type", Number)
], UssdExecutionMessages.prototype, "transationsId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Phones_entity_1.Phones, (phone) => phone.activitiesPhones, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    typeorm_1.JoinColumn([{ name: 'phones_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Phones_entity_1.Phones)
], UssdExecutionMessages.prototype, "phones", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Transactions_entity_1.Transactions, (transations) => transations.ussdExecutionMessage, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    typeorm_1.JoinColumn([{ name: 'transactions_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Transactions_entity_1.Transactions)
], UssdExecutionMessages.prototype, "transations", void 0);
UssdExecutionMessages = __decorate([
    typeorm_1.Entity('ussd_execution_messages', { schema: 'simbot_db' })
], UssdExecutionMessages);
exports.UssdExecutionMessages = UssdExecutionMessages;
//# sourceMappingURL=UssdExecutionMessages.entity.js.map