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
exports.ActionsProfils = void 0;
const typeorm_1 = require("typeorm");
const Actions_entity_1 = require("./Actions.entity");
const Profils_entity_1 = require("./Profils.entity");
let ActionsProfils = class ActionsProfils extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], ActionsProfils.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'actions_id' }),
    __metadata("design:type", Number)
], ActionsProfils.prototype, "actionsId", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'profils_id' }),
    __metadata("design:type", Number)
], ActionsProfils.prototype, "profilsId", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'state',
        enum: ['ACTIVED', 'INACTIVED', 'DELETED'],
        default: 'ACTIVED',
    }),
    __metadata("design:type", String)
], ActionsProfils.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'created_at' }),
    __metadata("design:type", Date)
], ActionsProfils.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'updated_at',
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], ActionsProfils.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Actions_entity_1.Actions, (actions) => actions.actionsProfils, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    typeorm_1.JoinColumn([{ name: 'actions_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Actions_entity_1.Actions)
], ActionsProfils.prototype, "actions", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Profils_entity_1.Profils, (profils) => profils.actionsProfils, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    typeorm_1.JoinColumn([{ name: 'profils_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Profils_entity_1.Profils)
], ActionsProfils.prototype, "profils", void 0);
ActionsProfils = __decorate([
    typeorm_1.Index('fk_actions_has_profils_actions1_idx', ['actionsId'], {}),
    typeorm_1.Index('fk_actions_has_profils_profils1_idx', ['profilsId'], {}),
    typeorm_1.Entity('actions_profils', { schema: 'simbot_db' })
], ActionsProfils);
exports.ActionsProfils = ActionsProfils;
//# sourceMappingURL=ActionsProfils.entity.js.map