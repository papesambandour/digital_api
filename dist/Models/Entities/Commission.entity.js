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
exports.Commission = void 0;
const typeorm_1 = require("typeorm");
const Parteners_entity_1 = require("./Parteners.entity");
const SousServices_entity_1 = require("./SousServices.entity");
let Commission = class Commission extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], Commission.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('double', { name: 'amount_start', precision: 17, scale: 4 }),
    __metadata("design:type", Number)
], Commission.prototype, "amountStart", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'amount_end',
        comment: '-1 pour infini ',
        precision: 17,
        scale: 4,
    }),
    __metadata("design:type", Number)
], Commission.prototype, "amountEnd", void 0);
__decorate([
    typeorm_1.Column('double', { name: 'amount_commssion', precision: 17, scale: 4 }),
    __metadata("design:type", Number)
], Commission.prototype, "amountCommssion", void 0);
__decorate([
    typeorm_1.Column('double', { name: 'taux_commission', precision: 17, scale: 4 }),
    __metadata("design:type", Number)
], Commission.prototype, "tauxCommission", void 0);
__decorate([
    typeorm_1.Column('double', { name: 'taux_fee', precision: 17, scale: 4 }),
    __metadata("design:type", Number)
], Commission.prototype, "tauxFee", void 0);
__decorate([
    typeorm_1.Column('double', { name: 'amount_fee', precision: 17, scale: 4 }),
    __metadata("design:type", Number)
], Commission.prototype, "amountFee", void 0);
__decorate([
    typeorm_1.Column('tinyint', { name: 'commission_is_fixe', width: 1 }),
    __metadata("design:type", Number)
], Commission.prototype, "commissionIsFixe", void 0);
__decorate([
    typeorm_1.Column('tinyint', { name: 'fee_is_fixe', width: 1 }),
    __metadata("design:type", Number)
], Commission.prototype, "feeIsFixe", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'parteners_id' }),
    __metadata("design:type", Number)
], Commission.prototype, "partenersId", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'sous_services_id' }),
    __metadata("design:type", Number)
], Commission.prototype, "sousServicesId", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'created_at' }),
    __metadata("design:type", Date)
], Commission.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'updated_at',
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Commission.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'state',
        enum: ['ACTIVED', 'INACTIVED', 'DELETED'],
        default: 'ACTIVED',
    }),
    __metadata("design:type", String)
], Commission.prototype, "state", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Parteners_entity_1.Parteners, (parteners) => parteners.commissions, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    typeorm_1.JoinColumn([{ name: 'parteners_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Parteners_entity_1.Parteners)
], Commission.prototype, "parteners", void 0);
__decorate([
    typeorm_1.ManyToOne(() => SousServices_entity_1.SousServices, (sousServices) => sousServices.commissions, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    typeorm_1.JoinColumn([{ name: 'sous_services_id', referencedColumnName: 'id' }]),
    __metadata("design:type", SousServices_entity_1.SousServices)
], Commission.prototype, "sousServices", void 0);
Commission = __decorate([
    typeorm_1.Index('fk_commission_parteners1_idx', ['partenersId'], {}),
    typeorm_1.Index('fk_commission_sous_services1_idx', ['sousServicesId'], {}),
    typeorm_1.Entity('commission', { schema: 'simbot_db' })
], Commission);
exports.Commission = Commission;
//# sourceMappingURL=Commission.entity.js.map