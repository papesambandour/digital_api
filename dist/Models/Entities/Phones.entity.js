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
exports.Phones = void 0;
const typeorm_1 = require("typeorm");
const OperationPhones_entity_1 = require("./OperationPhones.entity");
const Services_entity_1 = require("./Services.entity");
const SousServicesPhones_entity_1 = require("./SousServicesPhones.entity");
const Transactions_entity_1 = require("./Transactions.entity");
const ActivitiesPhones_entity_1 = require("./ActivitiesPhones.entity");
const UssdExecutionMessages_entity_1 = require("./UssdExecutionMessages.entity");
const Enum_entity_1 = require("./Enum.entity");
const CustomBaseModel_1 = require("./CustomBaseModel");
let Phones = class Phones extends CustomBaseModel_1.CustomBaseModel {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], Phones.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'solde',
        comment: 'Solde reel du service lié ',
        precision: 17,
        scale: 4,
        default: '0.0000',
    }),
    __metadata("design:type", Number)
], Phones.prototype, "solde", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'solde_api',
        comment: 'Solde fourni par le provider ',
        precision: 17,
        scale: 4,
        default: '0.0000',
    }),
    __metadata("design:type", Number)
], Phones.prototype, "soldeApi", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'number',
        comment: 'Le numero de telephone ',
        length: 255,
    }),
    __metadata("design:type", String)
], Phones.prototype, "number", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'codeSecret',
        comment: 'Le code secret du telephone: Code de 9 chiffre ou le code PUK',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], Phones.prototype, "codeSecret", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'pin',
        comment: 'Le code pin de la push ',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], Phones.prototype, "pin", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'ltd',
        comment: "L'Alitude",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], Phones.prototype, "ltd", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'lgd',
        comment: 'Longitude',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], Phones.prototype, "lgd", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'imei',
        comment: 'Le code imeil du telephone',
        length: 255,
        nullable: true,
        unique: true,
    }),
    __metadata("design:type", String)
], Phones.prototype, "imei", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'uid',
        comment: 'Le UID du telephone',
        length: 255,
        nullable: true,
        unique: true,
    }),
    __metadata("design:type", String)
], Phones.prototype, "uid", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'state',
        enum: ['ACTIVED', 'INACTIVED', 'DELETED'],
        default: 'INACTIVED',
    }),
    __metadata("design:type", String)
], Phones.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'created_at' }),
    __metadata("design:type", Date)
], Phones.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'last_used', nullable: true }),
    __metadata("design:type", Date)
], Phones.prototype, "lastUsed", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'last_unused', nullable: true }),
    __metadata("design:type", Date)
], Phones.prototype, "lastUnused", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'updated_at',
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Phones.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'socket',
        enum: ['CONNECTED', 'DISCONNECTED'],
        default: 'DISCONNECTED',
    }),
    __metadata("design:type", String)
], Phones.prototype, "socket", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'phone_state',
        enum: Enum_entity_1.PhoneState,
        default: Enum_entity_1.PhoneState.UNUSED,
    }),
    __metadata("design:type", String)
], Phones.prototype, "phoneState", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'amount_reserved',
        precision: 17,
        scale: 4,
        default: '0.0000',
    }),
    __metadata("design:type", Number)
], Phones.prototype, "amountReserved", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'max_solde',
        precision: 17,
        scale: 4,
        default: '-1.0000',
    }),
    __metadata("design:type", Number)
], Phones.prototype, "maxSolde", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'alert_level_1_solde',
        comment: 'Niveaux alert 1 : mettre -1 pour ignorer l’alerte ',
        precision: 17,
        scale: 4,
        default: '500000.0000',
    }),
    __metadata("design:type", Number)
], Phones.prototype, "alertLevel_1Solde", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'alert_level_2_solde',
        comment: 'Niveaux alert 2 : mettre -1 pour ignorer l’alerte ',
        precision: 17,
        scale: 4,
        default: '250000.0000',
    }),
    __metadata("design:type", Number)
], Phones.prototype, "alertLevel_2Solde", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'alert_level_3_solde',
        comment: 'Niveaux alert 3 : mettre -1 pour ignorer l’alerte ',
        precision: 17,
        scale: 4,
        default: '100000.0000',
    }),
    __metadata("design:type", Number)
], Phones.prototype, "alertLevel_3Solde", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'alert_level_4_solde',
        comment: 'Niveaux alert 4 : mettre -1 pour ignorer l’alerte ',
        precision: 17,
        scale: 4,
        default: '50000.0000',
    }),
    __metadata("design:type", Number)
], Phones.prototype, "alertLevel_4Solde", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'alert_level_5_solde',
        comment: 'Niveaux alert 5 : mettre -1 pour ignorer l’alerte ',
        precision: 17,
        scale: 4,
        default: '25000.0000',
    }),
    __metadata("design:type", Number)
], Phones.prototype, "alertLevel_5Solde", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'services_id' }),
    __metadata("design:type", Number)
], Phones.prototype, "servicesId", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'sim_provider',
        enum: Enum_entity_1.SIM_PROVIDER,
        default: Enum_entity_1.SIM_PROVIDER.NONE,
    }),
    __metadata("design:type", String)
], Phones.prototype, "simProvider", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'daily_count_limit',
        comment: 'Nombre cumul Trx max par jour (VALEUR -1 pour infini)\n',
        precision: 17,
        scale: 4,
        default: '-1.0000',
    }),
    __metadata("design:type", Number)
], Phones.prototype, "dailyCountLimit", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'daily_amount_limit',
        comment: 'Montant cumul max par jours  (VALEUR -1 pour infini)\n',
        precision: 17,
        scale: 4,
        default: '-1.0000',
    }),
    __metadata("design:type", Number)
], Phones.prototype, "dailyAmountLimit", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'weekly_count_limit',
        comment: 'Nombre cumul Trx max par mois (VALEUR -1 pour infini)\n',
        precision: 17,
        scale: 4,
        default: '-1.0000',
    }),
    __metadata("design:type", Number)
], Phones.prototype, "weeklyCountLimit", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'weekly_amount_limit',
        comment: 'Montant cumul max par semaine (VALEUR -1 pour infini)\n',
        precision: 17,
        scale: 4,
        default: '-1.0000',
    }),
    __metadata("design:type", Number)
], Phones.prototype, "weeklyAmountLimit", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'monthly_count_limit',
        comment: 'Nombre cumul trx max par mois  (VALEUR -1 pour infini)\n',
        precision: 17,
        scale: 4,
        default: '-1.0000',
    }),
    __metadata("design:type", Number)
], Phones.prototype, "monthlyCountLimit", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'monthly_amount_limit',
        comment: 'Montant cumul max par mois (VALEUR -1 pour infini)\n',
        precision: 17,
        scale: 4,
        default: '-1.0000',
    }),
    __metadata("design:type", Number)
], Phones.prototype, "monthlyAmountLimit", void 0);
__decorate([
    typeorm_1.OneToMany(() => OperationPhones_entity_1.OperationPhones, (operationPhones) => operationPhones.phones),
    __metadata("design:type", Array)
], Phones.prototype, "operationPhones", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Services_entity_1.Services, (services) => services.phones, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    typeorm_1.JoinColumn([{ name: 'services_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Services_entity_1.Services)
], Phones.prototype, "services", void 0);
__decorate([
    typeorm_1.OneToMany(() => SousServicesPhones_entity_1.SousServicesPhones, (sousServicesPhones) => sousServicesPhones.phones),
    __metadata("design:type", Array)
], Phones.prototype, "sousServicesPhones", void 0);
__decorate([
    typeorm_1.OneToMany(() => Transactions_entity_1.Transactions, (transactions) => transactions.phones),
    __metadata("design:type", Array)
], Phones.prototype, "transactions", void 0);
__decorate([
    typeorm_1.OneToMany(() => ActivitiesPhones_entity_1.ActivitiesPhones, (activitiesPhones) => activitiesPhones.phones),
    __metadata("design:type", Array)
], Phones.prototype, "activitiesPhones", void 0);
__decorate([
    typeorm_1.OneToMany(() => UssdExecutionMessages_entity_1.UssdExecutionMessages, (activitiesPhones) => activitiesPhones.phones),
    __metadata("design:type", Array)
], Phones.prototype, "ussdExecutionMessageEntities", void 0);
Phones = __decorate([
    typeorm_1.Index('fk_phones_services1_idx', ['servicesId'], {}),
    typeorm_1.Entity('phones', { schema: 'simbot_db' })
], Phones);
exports.Phones = Phones;
//# sourceMappingURL=Phones.entity.js.map