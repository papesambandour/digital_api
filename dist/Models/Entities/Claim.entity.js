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
exports.Claim = void 0;
const typeorm_1 = require("typeorm");
const CustomBaseModel_1 = require("./CustomBaseModel");
const Enum_entity_1 = require("./Enum.entity");
let Claim = class Claim extends CustomBaseModel_1.CustomBaseModel {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], Claim.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'subject', length: 255, nullable: false }),
    __metadata("design:type", String)
], Claim.prototype, "subject", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'claim_ref', length: 255, nullable: false }),
    __metadata("design:type", String)
], Claim.prototype, "claimRef", void 0);
__decorate([
    typeorm_1.Column('longtext', { name: 'message', nullable: false }),
    __metadata("design:type", String)
], Claim.prototype, "message", void 0);
__decorate([
    typeorm_1.Column('longtext', {
        name: 'comment',
        nullable: true,
        comment: "Le message final définit par l'utilisateur backoffice",
    }),
    __metadata("design:type", String)
], Claim.prototype, "comment", void 0);
__decorate([
    typeorm_1.Column('longtext', { name: 'callback_url', nullable: true }),
    __metadata("design:type", String)
], Claim.prototype, "callbackUrl", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'state',
        enum: Enum_entity_1.StateEnum,
        default: Enum_entity_1.StateEnum.ACTIVED,
    }),
    __metadata("design:type", String)
], Claim.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'statut',
        enum: Enum_entity_1.ClaimStatut,
        default: Enum_entity_1.ClaimStatut.CREATED,
    }),
    __metadata("design:type", String)
], Claim.prototype, "statut", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'parteners_id' }),
    __metadata("design:type", Number)
], Claim.prototype, "partenersId", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'user_id_open', nullable: true }),
    __metadata("design:type", Number)
], Claim.prototype, "userIdOpen", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'user_id_close', nullable: true }),
    __metadata("design:type", Number)
], Claim.prototype, "userIdClose", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'user_id_comment', nullable: true }),
    __metadata("design:type", Number)
], Claim.prototype, "userIdComment", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'transaction_id' }),
    __metadata("design:type", Number)
], Claim.prototype, "transactionId", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'created_at' }),
    __metadata("design:type", Date)
], Claim.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'updated_at',
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Claim.prototype, "updatedAt", void 0);
Claim = __decorate([
    typeorm_1.Entity('claim', { schema: 'simbot_db' }),
    typeorm_1.Index('fk_claim_parteners1_idx', ['partenersId'], {}),
    typeorm_1.Index('fk_claim_user_id_open1_idx', ['userIdOpen'], {}),
    typeorm_1.Index('fk_claim_user_id_close1_idx', ['userIdClose'], {}),
    typeorm_1.Index('fk_claim_transaction_id1_idx', ['transactionId'], {}),
    typeorm_1.Index('uniq_claim_ref_id1_idx', ['claimRef'], { unique: true }),
    typeorm_1.Index('fk_claim_user_id_comment1_idx', ['userIdComment'], {})
], Claim);
exports.Claim = Claim;
//# sourceMappingURL=Claim.entity.js.map