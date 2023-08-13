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
exports.AppSettings = exports.APP_SETTING_WIZALL_TOKEN_NAME = void 0;
const typeorm_1 = require("typeorm");
const CustomBaseModel_1 = require("./CustomBaseModel");
exports.APP_SETTING_WIZALL_TOKEN_NAME = 'APP_SETTING_WIZALL_TOKEN_NAME';
let AppSettings = class AppSettings extends CustomBaseModel_1.CustomBaseModel {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], AppSettings.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'name', length: 255 }),
    __metadata("design:type", String)
], AppSettings.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'value', length: 255, nullable: true }),
    __metadata("design:type", String)
], AppSettings.prototype, "value", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'state',
        enum: ['ACTIVED', 'INACTIVED', 'DELETED'],
        default: 'ACTIVED',
    }),
    __metadata("design:type", String)
], AppSettings.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'created_at' }),
    __metadata("design:type", Date)
], AppSettings.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column('datetime', {
        name: 'updated_at',
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], AppSettings.prototype, "updatedAt", void 0);
AppSettings = __decorate([
    typeorm_1.Entity('app__settings', { schema: 'simbot_db' })
], AppSettings);
exports.AppSettings = AppSettings;
//# sourceMappingURL=AppSettings.entity.js.map