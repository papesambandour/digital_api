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
exports.Country = void 0;
const typeorm_1 = require("typeorm");
const Operators_entity_1 = require("./Operators.entity");
const CustomBaseModel_1 = require("./CustomBaseModel");
let Country = class Country extends CustomBaseModel_1.CustomBaseModel {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], Country.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'name', length: 255 }),
    __metadata("design:type", String)
], Country.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'flag', length: 255 }),
    __metadata("design:type", String)
], Country.prototype, "flag", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'calling_codes', length: 255 }),
    __metadata("design:type", String)
], Country.prototype, "callingCodes", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'capital', length: 255 }),
    __metadata("design:type", String)
], Country.prototype, "capital", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'code', unique: true, length: 255 }),
    __metadata("design:type", String)
], Country.prototype, "code", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'state',
        enum: ['ACTIVED', 'INACTIVED', 'DELETED'],
        default: 'ACTIVED',
    }),
    __metadata("design:type", String)
], Country.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'updated_at',
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Country.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'created_at' }),
    __metadata("design:type", Date)
], Country.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => Operators_entity_1.Operators, (operators) => operators.country),
    __metadata("design:type", Array)
], Country.prototype, "operators", void 0);
Country = __decorate([
    typeorm_1.Index('code_UNIQUE', ['code'], { unique: true }),
    typeorm_1.Entity('country', { schema: 'simbot_db' })
], Country);
exports.Country = Country;
//# sourceMappingURL=Country.entity.js.map