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
exports.Services = void 0;
const typeorm_1 = require("typeorm");
const Phones_entity_1 = require("./Phones.entity");
const Operators_entity_1 = require("./Operators.entity");
const SousServices_entity_1 = require("./SousServices.entity");
const CategoriesServices_entity_1 = require("./CategoriesServices.entity");
let Services = class Services extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], Services.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'name', length: 255 }),
    __metadata("design:type", String)
], Services.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'icon', length: 255, nullable: true }),
    __metadata("design:type", String)
], Services.prototype, "icon", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'code', unique: true, length: 255 }),
    __metadata("design:type", String)
], Services.prototype, "code", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'state',
        enum: ['ACTIVED', 'INACTIVED', 'DELETED'],
        default: 'ACTIVED',
    }),
    __metadata("design:type", String)
], Services.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'created_at' }),
    __metadata("design:type", Date)
], Services.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'updated_at', nullable: true }),
    __metadata("design:type", Date)
], Services.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'operators_id' }),
    __metadata("design:type", Number)
], Services.prototype, "operatorsId", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'categories_services_id' }),
    __metadata("design:type", Number)
], Services.prototype, "categoriesServicesId", void 0);
__decorate([
    typeorm_1.Column('tinyint', {
        name: 'accecpte_phone',
        comment: 'Permet de préciser si cette service peut accepté d’être fait par sim box\n',
        width: 1,
        default: '1',
    }),
    __metadata("design:type", Number)
], Services.prototype, "accecptePhone", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'solde',
        comment: 'Solde globale du service. Exemple solde globale de tous les telephone lié a Wallet orange(Solde orange money global du système)',
        precision: 17,
        scale: 4,
        default: '0.0000',
    }),
    __metadata("design:type", Number)
], Services.prototype, "solde", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'amount_reserved',
        precision: 17,
        scale: 4,
        default: '0.0000',
    }),
    __metadata("design:type", Number)
], Services.prototype, "amountReserved", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'alert_level_1_solde',
        precision: 17,
        scale: 4,
        default: '500000.0000',
    }),
    __metadata("design:type", Number)
], Services.prototype, "alertLevel_1Solde", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'alert_level_2_solde',
        precision: 17,
        scale: 4,
        default: '250000.0000',
    }),
    __metadata("design:type", Number)
], Services.prototype, "alertLevel_2Solde", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'alert_level_3_solde',
        precision: 17,
        scale: 4,
        default: '100000.0000',
    }),
    __metadata("design:type", Number)
], Services.prototype, "alertLevel_3Solde", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'alert_level_4_solde',
        precision: 17,
        scale: 4,
        default: '50000.0000',
    }),
    __metadata("design:type", Number)
], Services.prototype, "alertLevel_4Solde", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'alert_level_5_solde',
        precision: 17,
        scale: 4,
        default: '100000.0000',
    }),
    __metadata("design:type", Number)
], Services.prototype, "alertLevel_5Solde", void 0);
__decorate([
    typeorm_1.OneToMany(() => Phones_entity_1.Phones, (phones) => phones.services),
    __metadata("design:type", Array)
], Services.prototype, "phones", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Operators_entity_1.Operators, (operators) => operators.services, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    typeorm_1.JoinColumn([{ name: 'operators_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Operators_entity_1.Operators)
], Services.prototype, "operators", void 0);
__decorate([
    typeorm_1.OneToMany(() => SousServices_entity_1.SousServices, (sousServices) => sousServices.services),
    __metadata("design:type", Array)
], Services.prototype, "sousServices", void 0);
__decorate([
    typeorm_1.ManyToOne(() => CategoriesServices_entity_1.CategoriesServices, (categoriesServices) => categoriesServices.services, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    typeorm_1.JoinColumn([{ name: 'categories_services_id', referencedColumnName: 'id' }]),
    __metadata("design:type", CategoriesServices_entity_1.CategoriesServices)
], Services.prototype, "categoriesServices", void 0);
Services = __decorate([
    typeorm_1.Index('code_UNIQUE', ['code'], { unique: true }),
    typeorm_1.Index('fk_services_operators_idx', ['operatorsId'], {}),
    typeorm_1.Entity('services', { schema: 'simbot_db' })
], Services);
exports.Services = Services;
//# sourceMappingURL=Services.entity.js.map