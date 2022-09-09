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
exports.MessageUssds = void 0;
const typeorm_1 = require("typeorm");
const SousServices_entity_1 = require("./SousServices.entity");
const Transactions_entity_1 = require("./Transactions.entity");
const CustomBaseModel_1 = require("./CustomBaseModel");
let MessageUssds = class MessageUssds extends CustomBaseModel_1.CustomBaseModel {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], MessageUssds.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('int', {
        name: 'transactions_id',
        nullable: true,
    }),
    __metadata("design:type", Number)
], MessageUssds.prototype, "transactionsId", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 500, name: 'content', nullable: true }),
    __metadata("design:type", String)
], MessageUssds.prototype, "content", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 255, name: 'sender', nullable: true }),
    __metadata("design:type", String)
], MessageUssds.prototype, "sender", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 255, name: 'messagerie', nullable: true }),
    __metadata("design:type", String)
], MessageUssds.prototype, "messagerie", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'created_at' }),
    __metadata("design:type", Date)
], MessageUssds.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'updated_at',
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], MessageUssds.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('tinyint', { name: 'is_matched', default: 1 }),
    __metadata("design:type", Number)
], MessageUssds.prototype, "isMatched", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'sous_services_id', nullable: true }),
    __metadata("design:type", Number)
], MessageUssds.prototype, "sousServicesId", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'phones_id', nullable: true }),
    __metadata("design:type", Number)
], MessageUssds.prototype, "phonesId", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'state',
        enum: ['ACTIVED', 'INACTIVED', 'DELETED'],
        default: 'ACTIVED',
    }),
    __metadata("design:type", String)
], MessageUssds.prototype, "state", void 0);
__decorate([
    typeorm_1.ManyToOne(() => SousServices_entity_1.SousServices, (sousServices) => sousServices.messageUssds, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    typeorm_1.JoinColumn([{ name: 'sous_services_id', referencedColumnName: 'id' }]),
    __metadata("design:type", SousServices_entity_1.SousServices)
], MessageUssds.prototype, "sousServices", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Transactions_entity_1.Transactions, (transactions) => transactions.messagesUssds, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    typeorm_1.JoinColumn([{ name: 'transactions_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Transactions_entity_1.Transactions)
], MessageUssds.prototype, "transactions", void 0);
MessageUssds = __decorate([
    typeorm_1.Index('fk_message_ussds_sous_services1_idx', ['sousServicesId'], {}),
    typeorm_1.Index('fk_message_ussds_phones_id1_idx', ['phonesId'], {}),
    typeorm_1.Unique('unique_content_created_at_phones_id', [
        'content',
        'createdAt',
        'phonesId',
    ]),
    typeorm_1.Entity('message_ussds', { schema: 'simbot_db' })
], MessageUssds);
exports.MessageUssds = MessageUssds;
//# sourceMappingURL=MessageUssds.entity.js.map