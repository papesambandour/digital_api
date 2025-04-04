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
var HmacInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HmacInterceptor = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
const helper_service_1 = require("../../helper.service");
const Parteners_entity_1 = require("../../Models/Entities/Parteners.entity");
const process = require("process");
let HmacInterceptor = HmacInterceptor_1 = class HmacInterceptor {
    constructor(helper) {
        this.helper = helper;
    }
    static computeHmac() { }
    static isValidTimestamp(timestamp) {
        if (!timestamp) {
            return false;
        }
        const requestDate = new Date(timestamp);
        if (isNaN(requestDate.getTime())) {
            return false;
        }
        const now = new Date();
        const fiveMinutesAgo = new Date(now.getTime() -
            parseInt(process.env['HMAC_TIMESTAMP_EXPIRE_MINUTE']) * 60 * 1000);
        return requestDate >= fiveMinutesAgo && requestDate <= now;
    }
    async intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const hmacSignature = request.headers['hmac-signature'];
        const timestamp = request.headers['timestamp'];
        const httpMethod = request.method;
        let partner = null;
        const partnerCompte = await this.helper.getPartner(request.headers, request.body);
        if (partnerCompte) {
            partner = await Parteners_entity_1.Parteners.findOne(partnerCompte === null || partnerCompte === void 0 ? void 0 : partnerCompte.partenersId);
        }
        if (!partner ||
            partner.useHmacSign === 0 ||
            !['POST'].includes(httpMethod)) {
            return next.handle();
        }
        if (!hmacSignature) {
            throw new common_1.HttpException('HMAC signature is missing', common_1.HttpStatus.BAD_REQUEST);
        }
        if (!timestamp) {
            throw new common_1.HttpException('Timestamp is invalid', common_1.HttpStatus.BAD_REQUEST);
        }
        if (!HmacInterceptor_1.isValidTimestamp(parseInt(timestamp))) {
            throw new common_1.HttpException('Timestamp is invalid or expired', common_1.HttpStatus.BAD_REQUEST);
        }
        const bodyString = JSON.stringify(request.body);
        const hmacData = `${httpMethod}:${timestamp}:${bodyString}`;
        const hmac = crypto
            .createHmac('sha256', partner.hmacSignKey)
            .update(hmacData)
            .digest('hex');
        console.log(bodyString, 'bodyString', httpMethod, hmacData, hmac);
        if (hmac !== hmacSignature) {
            throw new common_1.HttpException('Invalid HMAC signature', common_1.HttpStatus.FORBIDDEN);
        }
        return next.handle();
    }
};
HmacInterceptor = HmacInterceptor_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [helper_service_1.HelperService])
], HmacInterceptor);
exports.HmacInterceptor = HmacInterceptor;
//# sourceMappingURL=HmacInterceptor.js.map