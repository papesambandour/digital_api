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
exports.ActivitiesPhones = void 0;
const typeorm_1 = require("typeorm");
const Phones_entity_1 = require("./Phones.entity");
const Enum_entity_1 = require("./Enum.entity");
let ActivitiesPhones = class ActivitiesPhones extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], ActivitiesPhones.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'message', length: 255, nullable: true }),
    __metadata("design:type", String)
], ActivitiesPhones.prototype, "message", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'state',
        enum: ['ACTIVED', 'INACTIVED', 'DELETED'],
        default: 'ACTIVED',
    }),
    __metadata("design:type", String)
], ActivitiesPhones.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'activity',
        enum: Enum_entity_1.EnumActivitiesPhones,
    }),
    __metadata("design:type", String)
], ActivitiesPhones.prototype, "activity", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'created_at' }),
    __metadata("design:type", Date)
], ActivitiesPhones.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'updated_at',
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], ActivitiesPhones.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'phones_id' }),
    __metadata("design:type", Number)
], ActivitiesPhones.prototype, "phonesId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Phones_entity_1.Phones, (phone) => phone.activitiesPhones, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    typeorm_1.JoinColumn([{ name: 'phones_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Phones_entity_1.Phones)
], ActivitiesPhones.prototype, "phones", void 0);
ActivitiesPhones = __decorate([
    typeorm_1.Entity('activities_phones', { schema: 'simbot_db' })
], ActivitiesPhones);
exports.ActivitiesPhones = ActivitiesPhones;
//# sourceMappingURL=ActivitiesPhones.entity.js.map