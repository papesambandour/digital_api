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
exports.OperationParteners = void 0;
const typeorm_1 = require("typeorm");
const Parteners_entity_1 = require("./Parteners.entity");
const Transactions_entity_1 = require("./Transactions.entity");
const Enum_entity_1 = require("./Enum.entity");
const CustomBaseModel_1 = require("./CustomBaseModel");
let OperationParteners = class OperationParteners extends CustomBaseModel_1.CustomBaseModel {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], OperationParteners.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'commentaire', nullable: true, length: 255 }),
    __metadata("design:type", String)
], OperationParteners.prototype, "commentaire", void 0);
__decorate([
    typeorm_1.Column('double', { name: 'amount', precision: 17, scale: 4 }),
    __metadata("design:type", Number)
], OperationParteners.prototype, "amount", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'state',
        enum: ['ACTIVED', 'INACTIVED', 'DELETED'],
        default: 'ACTIVED',
    }),
    __metadata("design:type", String)
], OperationParteners.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'created_at' }),
    __metadata("design:type", Date)
], OperationParteners.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'updated_at',
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], OperationParteners.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('enum', { name: 'type_operation', enum: ['DEBIT', 'CREDIT'] }),
    __metadata("design:type", String)
], OperationParteners.prototype, "typeOperation", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'statut',
        enum: ['SUCCESS', 'PENDING', 'PROCESSING', 'FAILLED', 'CANCELED'],
        default: 'PENDING',
    }),
    __metadata("design:type", String)
], OperationParteners.prototype, "statut", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'date_creation', nullable: true }),
    __metadata("design:type", Date)
], OperationParteners.prototype, "dateCreation", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'date_success', nullable: true }),
    __metadata("design:type", Date)
], OperationParteners.prototype, "dateSuccess", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'date_canceled', nullable: true }),
    __metadata("design:type", Date)
], OperationParteners.prototype, "dateCanceled", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'date_processing', nullable: true }),
    __metadata("design:type", Date)
], OperationParteners.prototype, "dateProcessing", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'date_failled', nullable: true }),
    __metadata("design:type", Date)
], OperationParteners.prototype, "dateFailled", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'parteners_id' }),
    __metadata("design:type", Number)
], OperationParteners.prototype, "partenersId", void 0);
__decorate([
    typeorm_1.Column('int', {
        name: 'transactions_id',
        nullable: true,
        comment: 'Id transaction pour une annulation',
    }),
    __metadata("design:type", Number)
], OperationParteners.prototype, "transactionsId", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'operation',
        enum: Enum_entity_1.OperationEnum,
    }),
    __metadata("design:type", String)
], OperationParteners.prototype, "operation", void 0);
__decorate([
    typeorm_1.Column('double', { name: 'fee', precision: 17, scale: 4 }),
    __metadata("design:type", Number)
], OperationParteners.prototype, "fee", void 0);
__decorate([
    typeorm_1.Column('double', { name: 'commission', precision: 17, scale: 4 }),
    __metadata("design:type", Number)
], OperationParteners.prototype, "commission", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'fee_owner',
        precision: 17,
        scale: 4,
        default: '0.0000',
    }),
    __metadata("design:type", Number)
], OperationParteners.prototype, "feeOwner", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'commission_owner',
        precision: 17,
        scale: 4,
        default: '0.0000',
    }),
    __metadata("design:type", Number)
], OperationParteners.prototype, "commissionOwner", void 0);
__decorate([
    typeorm_1.Column('double', { name: 'solde_befor', precision: 17, scale: 4 }),
    __metadata("design:type", Number)
], OperationParteners.prototype, "soldeBefor", void 0);
__decorate([
    typeorm_1.Column('double', { name: 'solde_after', precision: 17, scale: 4 }),
    __metadata("design:type", Number)
], OperationParteners.prototype, "soldeAfter", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'deposit_amount',
        precision: 17,
        scale: 4,
        default: 0,
    }),
    __metadata("design:type", Number)
], OperationParteners.prototype, "depositAmount", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'users_id', nullable: true }),
    __metadata("design:type", Number)
], OperationParteners.prototype, "usersId", void 0);
__decorate([
    typeorm_1.Column('text', { name: 'attachment_path', nullable: true }),
    __metadata("design:type", Number)
], OperationParteners.prototype, "attachmentPath", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Parteners_entity_1.Parteners, (parteners) => parteners.operationParteners, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    typeorm_1.JoinColumn([{ name: 'parteners_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Parteners_entity_1.Parteners)
], OperationParteners.prototype, "parteners", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Transactions_entity_1.Transactions, (transactions) => transactions.operationParteners, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }),
    typeorm_1.JoinColumn([{ name: 'transactions_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Transactions_entity_1.Transactions)
], OperationParteners.prototype, "transactions", void 0);
OperationParteners = __decorate([
    typeorm_1.Index('fk_operation_parteners_parteners1_idx', ['partenersId'], {}),
    typeorm_1.Index('fk_operation_parteners_transactions1_idx', ['transactionsId'], {}),
    typeorm_1.Index('fk_operation_parteners_users_idx', ['usersId'], {}),
    typeorm_1.Entity('operation_parteners', { schema: 'simbot_db' })
], OperationParteners);
exports.OperationParteners = OperationParteners;
//# sourceMappingURL=OperationParteners.entity.js.map