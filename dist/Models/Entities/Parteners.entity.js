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
exports.Parteners = void 0;
const typeorm_1 = require("typeorm");
const Commission_entity_1 = require("./Commission.entity");
const OperationParteners_entity_1 = require("./OperationParteners.entity");
const PartenerComptes_entity_1 = require("./PartenerComptes.entity");
const PartenerSettings_entity_1 = require("./PartenerSettings.entity");
const SousServicesParteners_entity_1 = require("./SousServicesParteners.entity");
const Transactions_entity_1 = require("./Transactions.entity");
const CustomBaseModel_1 = require("./CustomBaseModel");
let Parteners = class Parteners extends CustomBaseModel_1.CustomBaseModel {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], Parteners.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'countries_id' }),
    __metadata("design:type", Number)
], Parteners.prototype, "countriesId", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'created_at' }),
    __metadata("design:type", Date)
], Parteners.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'updated_at',
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Parteners.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'state',
        enum: ['ACTIVED', 'INACTIVED', 'DELETED'],
        default: 'ACTIVED',
    }),
    __metadata("design:type", String)
], Parteners.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'solde',
        precision: 17,
        scale: 4,
        default: '0.0000',
    }),
    __metadata("design:type", Number)
], Parteners.prototype, "solde", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'solde_commission',
        precision: 17,
        scale: 4,
        default: '0.0000',
    }),
    __metadata("design:type", Number)
], Parteners.prototype, "soldeCommission", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'amount_reserved',
        precision: 17,
        scale: 4,
        default: '0.0000',
    }),
    __metadata("design:type", Number)
], Parteners.prototype, "amountReserved", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'name', length: 255 }),
    __metadata("design:type", String)
], Parteners.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'phone', unique: true, length: 255 }),
    __metadata("design:type", String)
], Parteners.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'email', unique: true, length: 255 }),
    __metadata("design:type", String)
], Parteners.prototype, "email", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'wave_business_registration_id',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], Parteners.prototype, "waveBusinessRegistrationId", void 0);
__decorate([
    typeorm_1.Column('longtext', { name: 'adress', nullable: true }),
    __metadata("design:type", String)
], Parteners.prototype, "adress", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'password', length: 255 }),
    __metadata("design:type", String)
], Parteners.prototype, "password", void 0);
__decorate([
    typeorm_1.Column('tinyint', {
        name: 'first_connection',
        comment: 'Premier connexion , l’utilisateur doit changer son mot de passe',
        width: 1,
        default: '1',
    }),
    __metadata("design:type", Number)
], Parteners.prototype, "firstConnection", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'password_expired', nullable: true }),
    __metadata("design:type", Date)
], Parteners.prototype, "passwordExpired", void 0);
__decorate([
    typeorm_1.Column('int', {
        name: 'password_duration_day',
        default: '-1',
    }),
    __metadata("design:type", Number)
], Parteners.prototype, "passwordDurationDay", void 0);
__decorate([
    typeorm_1.Column('text', { name: 'allow_id', nullable: true }),
    __metadata("design:type", String)
], Parteners.prototype, "allowIp", void 0);
__decorate([
    typeorm_1.OneToMany(() => Commission_entity_1.Commission, (commission) => commission.parteners),
    __metadata("design:type", Array)
], Parteners.prototype, "commissions", void 0);
__decorate([
    typeorm_1.OneToMany(() => OperationParteners_entity_1.OperationParteners, (operationParteners) => operationParteners.parteners),
    __metadata("design:type", Array)
], Parteners.prototype, "operationParteners", void 0);
__decorate([
    typeorm_1.OneToMany(() => PartenerComptes_entity_1.PartenerComptes, (partenerComptes) => partenerComptes.parteners),
    __metadata("design:type", Array)
], Parteners.prototype, "partenerComptes", void 0);
__decorate([
    typeorm_1.OneToMany(() => PartenerSettings_entity_1.PartenerSettings, (partenerSettings) => partenerSettings.parteners),
    __metadata("design:type", Array)
], Parteners.prototype, "partenerSettings", void 0);
__decorate([
    typeorm_1.OneToMany(() => SousServicesParteners_entity_1.SousServicesParteners, (sousServicesParteners) => sousServicesParteners.parteners),
    __metadata("design:type", Array)
], Parteners.prototype, "sousServicesParteners", void 0);
__decorate([
    typeorm_1.OneToMany(() => Transactions_entity_1.Transactions, (transactions) => transactions.parteners),
    __metadata("design:type", Array)
], Parteners.prototype, "transactions", void 0);
Parteners = __decorate([
    typeorm_1.Index('email_UNIQUE', ['email'], { unique: true }),
    typeorm_1.Index('phone_UNIQUE', ['phone'], { unique: true }),
    typeorm_1.Index('countriesId_INDEX', ['countriesId'], {}),
    typeorm_1.Entity('parteners', { schema: 'simbot_db' })
], Parteners);
exports.Parteners = Parteners;
//# sourceMappingURL=Parteners.entity.js.map