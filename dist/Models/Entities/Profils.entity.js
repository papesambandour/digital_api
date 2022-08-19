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
exports.Profils = void 0;
const typeorm_1 = require("typeorm");
const ActionsProfils_entity_1 = require("./ActionsProfils.entity");
const Users_entity_1 = require("./Users.entity");
let Profils = class Profils extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], Profils.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'name', length: 255 }),
    __metadata("design:type", String)
], Profils.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'code', unique: true, length: 255 }),
    __metadata("design:type", String)
], Profils.prototype, "code", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'state',
        enum: ['ACTIVED', 'INACTIVED', 'DELETED'],
        default: 'ACTIVED',
    }),
    __metadata("design:type", String)
], Profils.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'created_at' }),
    __metadata("design:type", Date)
], Profils.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'updated_at',
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Profils.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => ActionsProfils_entity_1.ActionsProfils, (actionsProfils) => actionsProfils.profils),
    __metadata("design:type", Array)
], Profils.prototype, "actionsProfils", void 0);
__decorate([
    typeorm_1.OneToMany(() => Users_entity_1.Users, (users) => users.profils),
    __metadata("design:type", Array)
], Profils.prototype, "users", void 0);
Profils = __decorate([
    typeorm_1.Index('code_UNIQUE', ['code'], { unique: true }),
    typeorm_1.Entity('profils', { schema: 'simbot_db' })
], Profils);
exports.Profils = Profils;
//# sourceMappingURL=Profils.entity.js.map