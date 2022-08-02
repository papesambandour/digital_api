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
var Modules_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modules = void 0;
const typeorm_1 = require("typeorm");
const Actions_entity_1 = require("./Actions.entity");
let Modules = Modules_1 = class Modules extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], Modules.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'name', length: 255 }),
    __metadata("design:type", String)
], Modules.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'code', unique: true, length: 255 }),
    __metadata("design:type", String)
], Modules.prototype, "code", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'state',
        enum: ['ACTIVED', 'INACTIVED', 'DELETED'],
        default: 'ACTIVED',
    }),
    __metadata("design:type", String)
], Modules.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'created_at' }),
    __metadata("design:type", Date)
], Modules.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'updated_at',
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Modules.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'modules_id', nullable: true }),
    __metadata("design:type", Number)
], Modules.prototype, "modulesId", void 0);
__decorate([
    typeorm_1.OneToMany(() => Actions_entity_1.Actions, (actions) => actions.modules),
    __metadata("design:type", Array)
], Modules.prototype, "actions", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Modules_1, (modules) => modules.modules, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    typeorm_1.JoinColumn([{ name: 'modules_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Modules)
], Modules.prototype, "modules_2", void 0);
__decorate([
    typeorm_1.OneToMany(() => Modules_1, (modules) => modules.modules_2),
    __metadata("design:type", Array)
], Modules.prototype, "modules", void 0);
Modules = Modules_1 = __decorate([
    typeorm_1.Index('code_UNIQUE', ['code'], { unique: true }),
    typeorm_1.Index('fk_modules_modules1_idx', ['modulesId'], {}),
    typeorm_1.Entity('modules', { schema: 'simbot_db' })
], Modules);
exports.Modules = Modules;
//# sourceMappingURL=Modules.entity.js.map