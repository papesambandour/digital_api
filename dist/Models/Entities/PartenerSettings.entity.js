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
exports.PartenerSettings = void 0;
const typeorm_1 = require("typeorm");
const Parteners_entity_1 = require("./Parteners.entity");
let PartenerSettings = class PartenerSettings extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], PartenerSettings.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'parteners_id' }),
    __metadata("design:type", Number)
], PartenerSettings.prototype, "partenersId", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'name', length: 255 }),
    __metadata("design:type", String)
], PartenerSettings.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'value', length: 255 }),
    __metadata("design:type", String)
], PartenerSettings.prototype, "value", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'type', length: 255 }),
    __metadata("design:type", String)
], PartenerSettings.prototype, "type", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'state',
        enum: ['ACTIVED', 'INACTIVED', 'DELETED'],
        default: 'ACTIVED',
    }),
    __metadata("design:type", String)
], PartenerSettings.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'created_at' }),
    __metadata("design:type", Date)
], PartenerSettings.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'updated_at',
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], PartenerSettings.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Parteners_entity_1.Parteners, (parteners) => parteners.partenerSettings, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    typeorm_1.JoinColumn([{ name: 'parteners_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Parteners_entity_1.Parteners)
], PartenerSettings.prototype, "parteners", void 0);
PartenerSettings = __decorate([
    typeorm_1.Index('fk_partener_settings_parteners1_idx', ['partenersId'], {}),
    typeorm_1.Entity('partener_settings', { schema: 'simbot_db' })
], PartenerSettings);
exports.PartenerSettings = PartenerSettings;
//# sourceMappingURL=PartenerSettings.entity.js.map