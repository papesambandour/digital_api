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
exports.PartenerComptes = void 0;
const typeorm_1 = require("typeorm");
const Parteners_entity_1 = require("./Parteners.entity");
const Transactions_entity_1 = require("./Transactions.entity");
const CustomBaseModel_1 = require("./CustomBaseModel");
let PartenerComptes = class PartenerComptes extends CustomBaseModel_1.CustomBaseModel {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], PartenerComptes.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('enum', { name: 'type_partener_compte', enum: ['API', 'CAISSE'] }),
    __metadata("design:type", String)
], PartenerComptes.prototype, "typePartenerCompte", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'parteners_id' }),
    __metadata("design:type", Number)
], PartenerComptes.prototype, "partenersId", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'created_at' }),
    __metadata("design:type", Date)
], PartenerComptes.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'updated_at',
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], PartenerComptes.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'state',
        enum: ['ACTIVED', 'INACTIVED', 'DELETED'],
        default: 'ACTIVED',
    }),
    __metadata("design:type", String)
], PartenerComptes.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'name', length: 255 }),
    __metadata("design:type", String)
], PartenerComptes.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'app_key',
        nullable: true,
        unique: true,
        length: 255,
    }),
    __metadata("design:type", String)
], PartenerComptes.prototype, "appKey", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Parteners_entity_1.Parteners, (parteners) => parteners.partenerComptes, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    typeorm_1.JoinColumn([{ name: 'parteners_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Parteners_entity_1.Parteners)
], PartenerComptes.prototype, "parteners", void 0);
__decorate([
    typeorm_1.OneToMany(() => Transactions_entity_1.Transactions, (transactions) => transactions.partenerComptes),
    __metadata("design:type", Array)
], PartenerComptes.prototype, "transactions", void 0);
PartenerComptes = __decorate([
    typeorm_1.Index('app_key_UNIQUE', ['appKey'], { unique: true }),
    typeorm_1.Index('fk_partener_comptes_parteners1_idx', ['partenersId'], {}),
    typeorm_1.Entity('partener_comptes', { schema: 'simbot_db' })
], PartenerComptes);
exports.PartenerComptes = PartenerComptes;
//# sourceMappingURL=PartenerComptes.entity.js.map