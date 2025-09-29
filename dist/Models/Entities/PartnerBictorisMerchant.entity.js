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
exports.PartnerBictorisMerchant = void 0;
const typeorm_1 = require("typeorm");
const Parteners_entity_1 = require("./Parteners.entity");
let PartnerBictorisMerchant = class PartnerBictorisMerchant extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], PartnerBictorisMerchant.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'partner_id' }),
    __metadata("design:type", Number)
], PartnerBictorisMerchant.prototype, "partnerId", void 0);
__decorate([
    typeorm_1.Column({ name: 'merchant_id', unique: true }),
    __metadata("design:type", String)
], PartnerBictorisMerchant.prototype, "merchantId", void 0);
__decorate([
    typeorm_1.Column({ name: 'public_key', type: 'text' }),
    __metadata("design:type", String)
], PartnerBictorisMerchant.prototype, "publicKey", void 0);
__decorate([
    typeorm_1.Column({ name: 'account_status_id', nullable: true }),
    __metadata("design:type", String)
], PartnerBictorisMerchant.prototype, "accountStatusId", void 0);
__decorate([
    typeorm_1.Column({ name: 'merchant_email' }),
    __metadata("design:type", String)
], PartnerBictorisMerchant.prototype, "merchantEmail", void 0);
__decorate([
    typeorm_1.Column({ name: 'merchant_username' }),
    __metadata("design:type", String)
], PartnerBictorisMerchant.prototype, "merchantUsername", void 0);
__decorate([
    typeorm_1.Column({ name: 'merchant_password', nullable: true }),
    __metadata("design:type", String)
], PartnerBictorisMerchant.prototype, "merchantPassword", void 0);
__decorate([
    typeorm_1.Column({ name: 'merchant_name' }),
    __metadata("design:type", String)
], PartnerBictorisMerchant.prototype, "merchantName", void 0);
__decorate([
    typeorm_1.Column({ name: 'merchant_phone', nullable: true }),
    __metadata("design:type", String)
], PartnerBictorisMerchant.prototype, "merchantPhone", void 0);
__decorate([
    typeorm_1.Column({ name: 'merchant_address', type: 'text', nullable: true }),
    __metadata("design:type", String)
], PartnerBictorisMerchant.prototype, "merchantAddress", void 0);
__decorate([
    typeorm_1.Column({ name: 'merchant_country', default: 'SN' }),
    __metadata("design:type", String)
], PartnerBictorisMerchant.prototype, "merchantCountry", void 0);
__decorate([
    typeorm_1.Column({ name: 'merchant_locale', default: 'fr-SN' }),
    __metadata("design:type", String)
], PartnerBictorisMerchant.prototype, "merchantLocale", void 0);
__decorate([
    typeorm_1.Column({ name: 'merchant_website', nullable: true }),
    __metadata("design:type", String)
], PartnerBictorisMerchant.prototype, "merchantWebsite", void 0);
__decorate([
    typeorm_1.Column({ name: 'merchant_category', default: 'Retail' }),
    __metadata("design:type", String)
], PartnerBictorisMerchant.prototype, "merchantCategory", void 0);
__decorate([
    typeorm_1.Column({ name: 'representative_first_name' }),
    __metadata("design:type", String)
], PartnerBictorisMerchant.prototype, "representativeFirstName", void 0);
__decorate([
    typeorm_1.Column({ name: 'representative_last_name' }),
    __metadata("design:type", String)
], PartnerBictorisMerchant.prototype, "representativeLastName", void 0);
__decorate([
    typeorm_1.Column({ name: 'representative_email' }),
    __metadata("design:type", String)
], PartnerBictorisMerchant.prototype, "representativeEmail", void 0);
__decorate([
    typeorm_1.Column({ name: 'representative_phone', nullable: true }),
    __metadata("design:type", String)
], PartnerBictorisMerchant.prototype, "representativePhone", void 0);
__decorate([
    typeorm_1.Column({ name: 'is_enabled', default: true }),
    __metadata("design:type", Boolean)
], PartnerBictorisMerchant.prototype, "isEnabled", void 0);
__decorate([
    typeorm_1.Column({ name: 'wave_enabled', default: false }),
    __metadata("design:type", Boolean)
], PartnerBictorisMerchant.prototype, "waveEnabled", void 0);
__decorate([
    typeorm_1.Column({ name: 'webhook_configured', default: false }),
    __metadata("design:type", Boolean)
], PartnerBictorisMerchant.prototype, "webhookConfigured", void 0);
__decorate([
    typeorm_1.Column({ name: 'webhook_id', nullable: true }),
    __metadata("design:type", String)
], PartnerBictorisMerchant.prototype, "webhookId", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: 'created_at' }),
    __metadata("design:type", Date)
], PartnerBictorisMerchant.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ name: 'updated_at' }),
    __metadata("design:type", Date)
], PartnerBictorisMerchant.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column({ name: 'sub_merchant_id', nullable: true }),
    __metadata("design:type", String)
], PartnerBictorisMerchant.prototype, "subMerchantId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Parteners_entity_1.Parteners, (partner) => partner.bictorisMerchants, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ name: 'partner_id' }),
    __metadata("design:type", Parteners_entity_1.Parteners)
], PartnerBictorisMerchant.prototype, "partner", void 0);
PartnerBictorisMerchant = __decorate([
    typeorm_1.Entity('partner_bictoris_merchant')
], PartnerBictorisMerchant);
exports.PartnerBictorisMerchant = PartnerBictorisMerchant;
//# sourceMappingURL=PartnerBictorisMerchant.entity.js.map