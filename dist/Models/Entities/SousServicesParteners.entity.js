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
exports.SousServicesParteners = void 0;
const typeorm_1 = require("typeorm");
const Parteners_entity_1 = require("./Parteners.entity");
const SousServices_entity_1 = require("./SousServices.entity");
let SousServicesParteners = class SousServicesParteners extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], SousServicesParteners.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'sous_services_id' }),
    __metadata("design:type", Number)
], SousServicesParteners.prototype, "sousServicesId", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'parteners_id' }),
    __metadata("design:type", Number)
], SousServicesParteners.prototype, "partenersId", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'state',
        enum: ['ACTIVED', 'INACTIVED', 'DELETED'],
        default: 'ACTIVED',
    }),
    __metadata("design:type", String)
], SousServicesParteners.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'created_at' }),
    __metadata("design:type", Date)
], SousServicesParteners.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'updated_at',
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], SousServicesParteners.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Parteners_entity_1.Parteners, (parteners) => parteners.sousServicesParteners, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    typeorm_1.JoinColumn([{ name: 'parteners_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Parteners_entity_1.Parteners)
], SousServicesParteners.prototype, "parteners", void 0);
__decorate([
    typeorm_1.ManyToOne(() => SousServices_entity_1.SousServices, (sousServices) => sousServices.sousServicesParteners, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }),
    typeorm_1.JoinColumn([{ name: 'sous_services_id', referencedColumnName: 'id' }]),
    __metadata("design:type", SousServices_entity_1.SousServices)
], SousServicesParteners.prototype, "sousServices", void 0);
SousServicesParteners = __decorate([
    typeorm_1.Index('fk_sous_services_has_parteners_parteners1_idx', ['partenersId'], {}),
    typeorm_1.Index('fk_sous_services_has_parteners_sous_services1_idx', ['sousServicesId'], {}),
    typeorm_1.Entity('sous_services_parteners', { schema: 'simbot_db' })
], SousServicesParteners);
exports.SousServicesParteners = SousServicesParteners;
//# sourceMappingURL=SousServicesParteners.entity.js.map