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
exports.TypeServices = void 0;
const typeorm_1 = require("typeorm");
const SousServices_entity_1 = require("./SousServices.entity");
let TypeServices = class TypeServices extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], TypeServices.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'name', length: 255 }),
    __metadata("design:type", String)
], TypeServices.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'code', unique: true, length: 255 }),
    __metadata("design:type", String)
], TypeServices.prototype, "code", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'state',
        enum: ['ACTIVED', 'INACTIVED', 'DELETED'],
        default: 'ACTIVED',
    }),
    __metadata("design:type", String)
], TypeServices.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'created_at' }),
    __metadata("design:type", Date)
], TypeServices.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'updated_at',
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], TypeServices.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('enum', { name: 'type_operation', enum: ['DEBIT', 'CREDIT'] }),
    __metadata("design:type", String)
], TypeServices.prototype, "typeOperation", void 0);
__decorate([
    typeorm_1.OneToMany(() => SousServices_entity_1.SousServices, (sousServices) => sousServices.typeServices),
    __metadata("design:type", Array)
], TypeServices.prototype, "sousServices", void 0);
TypeServices = __decorate([
    typeorm_1.Index('code_UNIQUE', ['code'], { unique: true }),
    typeorm_1.Entity('type_services', { schema: 'simbot_db' })
], TypeServices);
exports.TypeServices = TypeServices;
//# sourceMappingURL=TypeServices.entity.js.map