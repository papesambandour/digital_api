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
exports.ErrorTypes = void 0;
const typeorm_1 = require("typeorm");
const SousServices_entity_1 = require("./SousServices.entity");
const Transactions_entity_1 = require("./Transactions.entity");
const CustomBaseModel_1 = require("./CustomBaseModel");
let ErrorTypes = class ErrorTypes extends CustomBaseModel_1.CustomBaseModel {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], ErrorTypes.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'code', length: 255 }),
    __metadata("design:type", String)
], ErrorTypes.prototype, "code", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'regex', length: 255 }),
    __metadata("design:type", String)
], ErrorTypes.prototype, "regex", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'message', length: 255 }),
    __metadata("design:type", String)
], ErrorTypes.prototype, "message", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'index',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], ErrorTypes.prototype, "index", void 0);
__decorate([
    typeorm_1.Column('tinyint', {
        name: 'is_critic',
        default: 0,
    }),
    __metadata("design:type", Number)
], ErrorTypes.prototype, "isCritic", void 0);
__decorate([
    typeorm_1.Column('tinyint', {
        name: 'reboot_on_error',
        default: 0,
    }),
    __metadata("design:type", Number)
], ErrorTypes.prototype, "rebootOnError", void 0);
__decorate([
    typeorm_1.Column('tinyint', {
        name: 'is_json',
        default: 0,
    }),
    __metadata("design:type", Number)
], ErrorTypes.prototype, "isJson", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'sous_services_id', nullable: true }),
    __metadata("design:type", Number)
], ErrorTypes.prototype, "sousServicesId", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'state',
        enum: ['ACTIVED', 'INACTIVED', 'DELETED'],
        default: 'ACTIVED',
    }),
    __metadata("design:type", String)
], ErrorTypes.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'created_at' }),
    __metadata("design:type", Date)
], ErrorTypes.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'updated_at',
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], ErrorTypes.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(() => SousServices_entity_1.SousServices, (sousServices) => sousServices.errorTypes, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    typeorm_1.JoinColumn([{ name: 'sous_services_id', referencedColumnName: 'id' }]),
    __metadata("design:type", SousServices_entity_1.SousServices)
], ErrorTypes.prototype, "sousServices", void 0);
__decorate([
    typeorm_1.OneToMany(() => Transactions_entity_1.Transactions, (transactions) => transactions.errorTypes),
    __metadata("design:type", Array)
], ErrorTypes.prototype, "transactions", void 0);
ErrorTypes = __decorate([
    typeorm_1.Index('fk_error_type_sous_services1_idx', ['sousServicesId'], {}),
    typeorm_1.Entity('errors_types', { schema: 'simbot_db' })
], ErrorTypes);
exports.ErrorTypes = ErrorTypes;
//# sourceMappingURL=ErrorTypes.entity.js.map