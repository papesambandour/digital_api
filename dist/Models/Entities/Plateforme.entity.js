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
exports.Plateforme = void 0;
const typeorm_1 = require("typeorm");
const Users_entity_1 = require("./Users.entity");
let Plateforme = class Plateforme extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], Plateforme.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'name', length: 255 }),
    __metadata("design:type", String)
], Plateforme.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'code', nullable: true, length: 255 }),
    __metadata("design:type", String)
], Plateforme.prototype, "code", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'state',
        enum: ['ACTIVED', 'INACTIVED', 'DELETED'],
        default: 'ACTIVED',
    }),
    __metadata("design:type", String)
], Plateforme.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'created_at' }),
    __metadata("design:type", Date)
], Plateforme.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'updated_at', nullable: true }),
    __metadata("design:type", Date)
], Plateforme.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => Users_entity_1.Users, (users) => users.plateforme),
    __metadata("design:type", Array)
], Plateforme.prototype, "users", void 0);
Plateforme = __decorate([
    typeorm_1.Entity('plateforme', { schema: 'simbot_db' })
], Plateforme);
exports.Plateforme = Plateforme;
//# sourceMappingURL=Plateforme.entity.js.map