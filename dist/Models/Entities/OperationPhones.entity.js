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
var OperationPhones_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationPhones = void 0;
const typeorm_1 = require("typeorm");
const Phones_entity_1 = require("./Phones.entity");
const Enum_entity_1 = require("./Enum.entity");
let OperationPhones = OperationPhones_1 = class OperationPhones extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], OperationPhones.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'commentaire', nullable: true, length: 255 }),
    __metadata("design:type", String)
], OperationPhones.prototype, "commentaire", void 0);
__decorate([
    typeorm_1.Column('double', { name: 'amount', precision: 17, scale: 4 }),
    __metadata("design:type", Number)
], OperationPhones.prototype, "amount", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'state',
        enum: ['ACTIVED', 'INACTIVED', 'DELETED'],
        default: 'ACTIVED',
    }),
    __metadata("design:type", String)
], OperationPhones.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'created_at' }),
    __metadata("design:type", Date)
], OperationPhones.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'updated_at', nullable: true }),
    __metadata("design:type", Date)
], OperationPhones.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('enum', { name: 'type_operation', enum: ['DEBIT', 'CREDIT'] }),
    __metadata("design:type", String)
], OperationPhones.prototype, "typeOperation", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'statut',
        enum: ['SUCCESS', 'PENDING', 'PROCESSING', 'FAILLED', 'CANCELED'],
        default: 'PENDING',
    }),
    __metadata("design:type", String)
], OperationPhones.prototype, "statut", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'date_creation', nullable: true }),
    __metadata("design:type", Date)
], OperationPhones.prototype, "dateCreation", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'date_success', nullable: true }),
    __metadata("design:type", Date)
], OperationPhones.prototype, "dateSuccess", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'date_canceled', nullable: true }),
    __metadata("design:type", Date)
], OperationPhones.prototype, "dateCanceled", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'date_processing', nullable: true }),
    __metadata("design:type", Date)
], OperationPhones.prototype, "dateProcessing", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'date_failled', nullable: true }),
    __metadata("design:type", Date)
], OperationPhones.prototype, "dateFailled", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'phones_id' }),
    __metadata("design:type", Number)
], OperationPhones.prototype, "phonesId", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'operation',
        enum: Enum_entity_1.OperationEnumPhone,
    }),
    __metadata("design:type", String)
], OperationPhones.prototype, "operation", void 0);
__decorate([
    typeorm_1.Column('int', {
        name: 'operation_phones_id',
        nullable: true,
        comment: 'Le transaction ',
    }),
    __metadata("design:type", Number)
], OperationPhones.prototype, "operationPhonesId", void 0);
__decorate([
    typeorm_1.Column('double', { name: 'solde_before', precision: 17, scale: 4 }),
    __metadata("design:type", Number)
], OperationPhones.prototype, "soldeBefor", void 0);
__decorate([
    typeorm_1.Column('double', { name: 'solde_after', precision: 17, scale: 4 }),
    __metadata("design:type", Number)
], OperationPhones.prototype, "soldeAfter", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'solde_api_before',
        precision: 17,
        scale: 4,
        default: '0.0000',
    }),
    __metadata("design:type", Number)
], OperationPhones.prototype, "soldeApiBefor", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'solde_api_after',
        precision: 17,
        scale: 4,
        default: '0.0000',
    }),
    __metadata("design:type", Number)
], OperationPhones.prototype, "soldeApiAfter", void 0);
__decorate([
    typeorm_1.ManyToOne(() => OperationPhones_1, (operationPhones) => operationPhones.operationPhones, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }),
    typeorm_1.JoinColumn([{ name: 'operation_phones_id', referencedColumnName: 'id' }]),
    __metadata("design:type", OperationPhones)
], OperationPhones.prototype, "operationPhones_2", void 0);
__decorate([
    typeorm_1.OneToMany(() => OperationPhones_1, (operationPhones) => operationPhones.operationPhones_2),
    __metadata("design:type", Array)
], OperationPhones.prototype, "operationPhones", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Phones_entity_1.Phones, (phones) => phones.operationPhones, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    typeorm_1.JoinColumn([{ name: 'phones_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Phones_entity_1.Phones)
], OperationPhones.prototype, "phones", void 0);
OperationPhones = OperationPhones_1 = __decorate([
    typeorm_1.Index('fk_operation_phones_operation_phones1_idx', ['operationPhonesId'], {}),
    typeorm_1.Index('fk_operation_phones_phones1_idx', ['phonesId'], {}),
    typeorm_1.Entity('operation_phones', { schema: 'simbot_db' })
], OperationPhones);
exports.OperationPhones = OperationPhones;
//# sourceMappingURL=OperationPhones.entity.js.map