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
exports.CategoriesServices = void 0;
const typeorm_1 = require("typeorm");
const Services_entity_1 = require("./Services.entity");
let CategoriesServices = class CategoriesServices extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], CategoriesServices.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'name', length: 255 }),
    __metadata("design:type", String)
], CategoriesServices.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'code', unique: true, length: 255 }),
    __metadata("design:type", String)
], CategoriesServices.prototype, "code", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'icon', length: 255, nullable: true }),
    __metadata("design:type", String)
], CategoriesServices.prototype, "icon", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'state',
        enum: ['ACTIVED', 'INACTIVED', 'DELETED'],
        default: 'ACTIVED',
    }),
    __metadata("design:type", String)
], CategoriesServices.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'updated_at', nullable: true }),
    __metadata("design:type", Date)
], CategoriesServices.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'created_at' }),
    __metadata("design:type", Date)
], CategoriesServices.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => Services_entity_1.Services, (services) => services.categoriesServices),
    __metadata("design:type", Array)
], CategoriesServices.prototype, "services", void 0);
CategoriesServices = __decorate([
    typeorm_1.Index('code_UNIQUE', ['code'], { unique: true }),
    typeorm_1.Entity('categories_services', { schema: 'simbot_db' })
], CategoriesServices);
exports.CategoriesServices = CategoriesServices;
//# sourceMappingURL=CategoriesServices.entity.js.map