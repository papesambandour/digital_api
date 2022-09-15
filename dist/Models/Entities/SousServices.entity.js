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
exports.SousServices = void 0;
const typeorm_1 = require("typeorm");
const Commission_entity_1 = require("./Commission.entity");
const MessageUssds_entity_1 = require("./MessageUssds.entity");
const SousServicesParteners_entity_1 = require("./SousServicesParteners.entity");
const SousServicesPhones_entity_1 = require("./SousServicesPhones.entity");
const Services_entity_1 = require("./Services.entity");
const TypeServices_entity_1 = require("./TypeServices.entity");
const Transactions_entity_1 = require("./Transactions.entity");
const Enum_entity_1 = require("./Enum.entity");
const ErrorTypes_entity_1 = require("./ErrorTypes.entity");
const CustomBaseModel_1 = require("./CustomBaseModel");
let SousServices = class SousServices extends CustomBaseModel_1.CustomBaseModel {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], SousServices.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('tinyint', { name: 'need_phone', default: 1 }),
    __metadata("design:type", Number)
], SousServices.prototype, "needPhone", void 0);
__decorate([
    typeorm_1.Column('tinyint', { name: 'need_sole', default: 1 }),
    __metadata("design:type", Number)
], SousServices.prototype, "needSolde", void 0);
__decorate([
    typeorm_1.Column('tinyint', { name: 'has_solde_api', default: 1 }),
    __metadata("design:type", Number)
], SousServices.prototype, "hasSoldeApi", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'name', length: 255 }),
    __metadata("design:type", String)
], SousServices.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'ussd_code', length: 255, nullable: true }),
    __metadata("design:type", String)
], SousServices.prototype, "ussdCode", void 0);
__decorate([
    typeorm_1.Column('text', { name: 'regex_message_validation', nullable: true }),
    __metadata("design:type", String)
], SousServices.prototype, "regexMessageValidation", void 0);
__decorate([
    typeorm_1.Column('text', { name: 'message_retour_ussd', nullable: true }),
    __metadata("design:type", String)
], SousServices.prototype, "messageRetourUssd", void 0);
__decorate([
    typeorm_1.Column('text', { name: 'position_validation_index', nullable: true }),
    __metadata("design:type", String)
], SousServices.prototype, "positionValidationIndex", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'valid_ength', nullable: true }),
    __metadata("design:type", Number)
], SousServices.prototype, "validLength", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'icon', length: 255, nullable: true }),
    __metadata("design:type", String)
], SousServices.prototype, "icon", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'regex_phone',
        length: 255,
        nullable: true,
        default: '([0-9]{9})',
    }),
    __metadata("design:type", String)
], SousServices.prototype, "regexPhone", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'code', unique: true, length: 255 }),
    __metadata("design:type", String)
], SousServices.prototype, "code", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'state',
        enum: ['ACTIVED', 'INACTIVED', 'DELETED'],
        default: 'ACTIVED',
    }),
    __metadata("design:type", String)
], SousServices.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'created_at' }),
    __metadata("design:type", Date)
], SousServices.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'updated_at',
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], SousServices.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'min_limit_transaction',
        comment: 'limite par transaction(VALEUR -1 pour infini)\n',
        precision: 17,
        scale: 4,
        default: '-1.0000',
    }),
    __metadata("design:type", Number)
], SousServices.prototype, "minLimitTransaction", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'limit_time_transaction',
        comment: "Temps d'attende EN MINUTE pour refaire la meme transaction numer/montant In Minute(VALEUR -1 pour aucune limit)\n",
        precision: 17,
        scale: 4,
        default: '15.0000',
    }),
    __metadata("design:type", Number)
], SousServices.prototype, "limitTimeTransaction", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'max_limit_transaction',
        comment: 'limite par transaction(VALEUR -1 pour infini)\n',
        precision: 17,
        scale: 4,
        default: '-1.0000',
    }),
    __metadata("design:type", Number)
], SousServices.prototype, "maxLimitTransaction", void 0);
__decorate([
    typeorm_1.Column('enum', { name: 'type_operation', enum: Enum_entity_1.TypeOperationEnum }),
    __metadata("design:type", String)
], SousServices.prototype, "typeOperation", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'services_id' }),
    __metadata("design:type", Number)
], SousServices.prototype, "servicesId", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'type_services_id' }),
    __metadata("design:type", Number)
], SousServices.prototype, "typeServicesId", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'api_manager_class_name',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], SousServices.prototype, "apiManagerClassName", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'api_manager_namespace',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], SousServices.prototype, "apiManagerNamespace", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'amount_commssion',
        nullable: false,
        default: 0,
        precision: 17,
        scale: 4,
    }),
    __metadata("design:type", Number)
], SousServices.prototype, "amountCommission", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'taux_commission',
        nullable: false,
        default: 0,
        precision: 17,
        scale: 4,
    }),
    __metadata("design:type", Number)
], SousServices.prototype, "tauxCommission", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'taux_fee',
        nullable: false,
        default: 0,
        precision: 17,
        scale: 4,
    }),
    __metadata("design:type", Number)
], SousServices.prototype, "tauxFee", void 0);
__decorate([
    typeorm_1.Column('double', {
        name: 'amount_fee',
        nullable: false,
        default: 0,
        precision: 17,
        scale: 4,
    }),
    __metadata("design:type", Number)
], SousServices.prototype, "amountFee", void 0);
__decorate([
    typeorm_1.Column('int', {
        name: 'pending_timeout',
        default: -1,
        comment: 'Pending Duration in Minute, -1 = never expire',
    }),
    __metadata("design:type", Number)
], SousServices.prototype, "pendingTimeout", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'pre_status_error_type',
        enum: [
            'PENDING_ON_ERROR',
            'FAILED_ON_ERROR',
            'SUCCESS_ON_ERROR',
            'PROCESSING_ON_ERROR',
        ],
        nullable: true,
    }),
    __metadata("design:type", String)
], SousServices.prototype, "preStatusErrorType", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'status_error_type',
        enum: [
            'PROCESSING_ON_ERROR',
            'SUCCESS_ON_ERROR',
            'PENDING_ON_ERROR',
            'FAILED_ON_ERROR',
        ],
        nullable: true,
    }),
    __metadata("design:type", String)
], SousServices.prototype, "statusErrorType", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'pre_status_success_type',
        enum: ['PENDING_ON_SUCCESS', 'SUCCESS_ON_SUCCESS', 'PROCESSING_ON_SUCCESS'],
        nullable: true,
    }),
    __metadata("design:type", String)
], SousServices.prototype, "preStatusSuccessType", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'status_success_type',
        enum: ['PENDING_ON_SUCCESS', 'SUCCESS_ON_SUCCESS', 'PROCESSING_ON_SUCCESS'],
        nullable: true,
    }),
    __metadata("design:type", String)
], SousServices.prototype, "statusSuccessType", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'pre_status_timeout_type',
        enum: [
            'PENDING_ON_TIMEOUT',
            'SUCCESS_ON_TIMEOUT',
            'PROCESSING_ON_TIMEOUT',
            'FAILED_ON_TIMEOUT',
        ],
        nullable: true,
    }),
    __metadata("design:type", String)
], SousServices.prototype, "preStatusTimeOutType", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'status_timeout_type',
        enum: [
            'PENDING_ON_TIMEOUT',
            'SUCCESS_ON_TIMEOUT',
            'PROCESSING_ON_TIMEOUT',
            'FAILED_ON_TIMEOUT',
        ],
        nullable: true,
    }),
    __metadata("design:type", String)
], SousServices.prototype, "statusTimeOutType", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'when_pre_status_for_callback',
        length: 255,
        default: 'SUCCESS',
    }),
    __metadata("design:type", String)
], SousServices.prototype, "whenPreStatusForCallback", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'when_status_for_callback',
        length: 255,
        default: 'SUCCESS',
    }),
    __metadata("design:type", String)
], SousServices.prototype, "whenStatusForCallback", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'execute_type',
        enum: Enum_entity_1.EXECUTE_TYPE_USSD,
        default: Enum_entity_1.EXECUTE_TYPE_USSD.EXECUTE_REQUEST_CODE,
        nullable: true,
    }),
    __metadata("design:type", String)
], SousServices.prototype, "executeType", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'execute_country_call_code_without_plus',
        length: 255,
        default: '',
        nullable: true,
    }),
    __metadata("design:type", String)
], SousServices.prototype, "executeCountryCallCodeWithoutPlus", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'execute_sms_sender',
        length: 255,
        default: '',
        nullable: true,
    }),
    __metadata("design:type", String)
], SousServices.prototype, "executeSmsSender", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'sender_sms_authorize',
        length: 255,
        default: '',
        nullable: true,
        comment: 'La listes des Sender autoriser a valider le sms de validation. Séparer par virgule',
    }),
    __metadata("design:type", String)
], SousServices.prototype, "senderSmsAuthorize", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'center_sms_authorize',
        length: 255,
        default: '',
        nullable: true,
        comment: 'La listes des centre de messagerie autoriser a valider le sms de validation. Séparer par virgule',
    }),
    __metadata("design:type", String)
], SousServices.prototype, "centerSmsAuthorize", void 0);
__decorate([
    typeorm_1.OneToMany(() => Commission_entity_1.Commission, (commission) => commission.sousServices),
    __metadata("design:type", Array)
], SousServices.prototype, "commissions", void 0);
__decorate([
    typeorm_1.OneToMany(() => MessageUssds_entity_1.MessageUssds, (messageUssds) => messageUssds.sousServices),
    __metadata("design:type", Array)
], SousServices.prototype, "messageUssds", void 0);
__decorate([
    typeorm_1.OneToMany(() => SousServicesParteners_entity_1.SousServicesParteners, (sousServicesParteners) => sousServicesParteners.sousServices),
    __metadata("design:type", Array)
], SousServices.prototype, "sousServicesParteners", void 0);
__decorate([
    typeorm_1.OneToMany(() => SousServicesPhones_entity_1.SousServicesPhones, (sousServicesPhones) => sousServicesPhones.sousServices),
    __metadata("design:type", Array)
], SousServices.prototype, "sousServicesPhones", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Services_entity_1.Services, (services) => services.sousServices, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    typeorm_1.JoinColumn([{ name: 'services_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Services_entity_1.Services)
], SousServices.prototype, "services", void 0);
__decorate([
    typeorm_1.ManyToOne(() => TypeServices_entity_1.TypeServices, (typeServices) => typeServices.sousServices, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    typeorm_1.JoinColumn([{ name: 'type_services_id', referencedColumnName: 'id' }]),
    __metadata("design:type", TypeServices_entity_1.TypeServices)
], SousServices.prototype, "typeServices", void 0);
__decorate([
    typeorm_1.OneToMany(() => Transactions_entity_1.Transactions, (transactions) => transactions.sousServices),
    __metadata("design:type", Array)
], SousServices.prototype, "transactions", void 0);
__decorate([
    typeorm_1.OneToMany(() => ErrorTypes_entity_1.ErrorTypes, (errorTypes) => errorTypes.sousServices),
    __metadata("design:type", Array)
], SousServices.prototype, "errorTypes", void 0);
SousServices = __decorate([
    typeorm_1.Index('code_UNIQUE', ['code'], { unique: true }),
    typeorm_1.Index('fk_sous_services_services1_idx', ['servicesId'], {}),
    typeorm_1.Index('fk_sous_services_type_services1_idx', ['typeServicesId'], {}),
    typeorm_1.Entity('sous_services', { schema: 'simbot_db' })
], SousServices);
exports.SousServices = SousServices;
//# sourceMappingURL=SousServices.entity.js.map