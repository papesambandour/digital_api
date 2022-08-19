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
exports.RequiredForService = exports.RequiredForServiceRule = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
let RequiredForServiceRule = class RequiredForServiceRule {
    constructor() { }
    async validate(value, args) {
        const targetServiceCode = args.object['codeService'];
        if (args.constraints.includes(targetServiceCode)) {
            if (!value) {
                return false;
            }
        }
        return true;
    }
    defaultMessage(args) {
        return `${args.property} est requis pour ce service`;
    }
};
RequiredForServiceRule = __decorate([
    class_validator_1.ValidatorConstraint({ name: 'RequiredForService', async: true }),
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], RequiredForServiceRule);
exports.RequiredForServiceRule = RequiredForServiceRule;
function RequiredForService(servicesCode, validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            name: 'RequiredForService',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: RequiredForServiceRule,
            constraints: servicesCode,
        });
    };
}
exports.RequiredForService = RequiredForService;
//# sourceMappingURL=required-for-service.decorator.js.map