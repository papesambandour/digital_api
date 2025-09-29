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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const Plateforme_entity_1 = require("./Plateforme.entity");
const Profils_entity_1 = require("./Profils.entity");
const CustomBaseModel_1 = require("./CustomBaseModel");
let Users = class Users extends CustomBaseModel_1.CustomBaseModel {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'email', unique: true, length: 255 }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'password', length: 255 }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'phone', unique: true, length: 255 }),
    __metadata("design:type", String)
], Users.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'state',
        enum: ['ACTIVED', 'INACTIVED', 'DELETED'],
        default: 'ACTIVED',
    }),
    __metadata("design:type", String)
], Users.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'created_at' }),
    __metadata("design:type", Date)
], Users.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'updated_at',
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Users.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'plateforme_id' }),
    __metadata("design:type", Number)
], Users.prototype, "plateformeId", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'profils_id' }),
    __metadata("design:type", Number)
], Users.prototype, "profilsId", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'f_name', length: 255 }),
    __metadata("design:type", String)
], Users.prototype, "fName", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'l_name', length: 255 }),
    __metadata("design:type", String)
], Users.prototype, "lName", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'code', unique: true, length: 255 }),
    __metadata("design:type", String)
], Users.prototype, "code", void 0);
__decorate([
    typeorm_1.Column('longtext', { name: 'address', nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "address", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Plateforme_entity_1.Plateforme, (plateforme) => plateforme.users, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    typeorm_1.JoinColumn([{ name: 'plateforme_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Plateforme_entity_1.Plateforme)
], Users.prototype, "plateforme", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Profils_entity_1.Profils, (profils) => profils.users, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    typeorm_1.JoinColumn([{ name: 'profils_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Profils_entity_1.Profils)
], Users.prototype, "profils", void 0);
Users = __decorate([
    typeorm_1.Index('code_UNIQUE', ['code'], { unique: true }),
    typeorm_1.Index('email_UNIQUE', ['email'], { unique: true }),
    typeorm_1.Index('fk_users_plateforme1_idx', ['plateformeId'], {}),
    typeorm_1.Index('fk_users_profils1_idx', ['profilsId'], {}),
    typeorm_1.Index('phone_UNIQUE', ['phone'], { unique: true }),
    typeorm_1.Entity('users', { schema: 'simbot_db' })
], Users);
exports.Users = Users;
//# sourceMappingURL=Users.entity.js.map