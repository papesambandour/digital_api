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
exports.Actions = void 0;
const typeorm_1 = require("typeorm");
const ActionsProfils_entity_1 = require("./ActionsProfils.entity");
const Modules_entity_1 = require("./Modules.entity");
const CustomBaseModel_1 = require("./CustomBaseModel");
let Actions = class Actions extends CustomBaseModel_1.CustomBaseModel {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], Actions.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'name', length: 255 }),
    __metadata("design:type", String)
], Actions.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'code', unique: true, length: 255 }),
    __metadata("design:type", String)
], Actions.prototype, "code", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'state',
        enum: ['ACTIVED', 'INACTIVED', 'DELETED'],
        default: 'ACTIVED',
    }),
    __metadata("design:type", String)
], Actions.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'created_at' }),
    __metadata("design:type", Date)
], Actions.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'updated_at',
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Actions.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'method', length: 255 }),
    __metadata("design:type", String)
], Actions.prototype, "method", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'url', length: 255 }),
    __metadata("design:type", String)
], Actions.prototype, "url", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'icon', length: 255 }),
    __metadata("design:type", String)
], Actions.prototype, "icon", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'modules_id' }),
    __metadata("design:type", Number)
], Actions.prototype, "modulesId", void 0);
__decorate([
    typeorm_1.OneToMany(() => ActionsProfils_entity_1.ActionsProfils, (actionsProfils) => actionsProfils.actions),
    __metadata("design:type", Array)
], Actions.prototype, "actionsProfils", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Modules_entity_1.Modules, (modules) => modules.actions, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    typeorm_1.JoinColumn([{ name: 'modules_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Modules_entity_1.Modules)
], Actions.prototype, "modules", void 0);
Actions = __decorate([
    typeorm_1.Index('code_UNIQUE', ['code'], { unique: true }),
    typeorm_1.Index('fk_actions_modules1_idx', ['modulesId'], {}),
    typeorm_1.Entity('actions', { schema: 'simbot_db' })
], Actions);
exports.Actions = Actions;
//# sourceMappingURL=Actions.entity.js.map