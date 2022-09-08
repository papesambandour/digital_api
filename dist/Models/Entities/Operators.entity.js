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
exports.Operators = void 0;
const typeorm_1 = require("typeorm");
const Services_entity_1 = require("./Services.entity");
const Country_entity_1 = require("./Country.entity");
const CustomBaseModel_1 = require("./CustomBaseModel");
let Operators = class Operators extends CustomBaseModel_1.CustomBaseModel {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], Operators.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'name', length: 255 }),
    __metadata("design:type", String)
], Operators.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'icon', length: 255, nullable: true }),
    __metadata("design:type", String)
], Operators.prototype, "icon", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'code', unique: true, length: 255 }),
    __metadata("design:type", String)
], Operators.prototype, "code", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'state',
        enum: ['ACTIVED', 'INACTIVED', 'DELETED'],
        default: 'ACTIVED',
    }),
    __metadata("design:type", String)
], Operators.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'countries_id' }),
    __metadata("design:type", Number)
], Operators.prototype, "countriesId", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'updated_at', nullable: true }),
    __metadata("design:type", Date)
], Operators.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'created_at' }),
    __metadata("design:type", Date)
], Operators.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => Services_entity_1.Services, (services) => services.operators),
    __metadata("design:type", Array)
], Operators.prototype, "services", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Country_entity_1.Country, (country) => country.operators, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    typeorm_1.JoinColumn([{ name: 'countries_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Country_entity_1.Country)
], Operators.prototype, "country", void 0);
Operators = __decorate([
    typeorm_1.Index('code_UNIQUE', ['code'], { unique: true }),
    typeorm_1.Entity('operators', { schema: 'simbot_db' })
], Operators);
exports.Operators = Operators;
//# sourceMappingURL=Operators.entity.js.map