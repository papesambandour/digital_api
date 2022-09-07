"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerInternModule = void 0;
const common_1 = require("@nestjs/common");
const partner_controller_controller_1 = require("./partner-controller.controller");
const partner_service_service_1 = require("./partner-service.service");
const helper_service_1 = require("../../helper.service");
const partner_middleware_middleware_1 = require("./partner-middleware.middleware");
let PartnerInternModule = class PartnerInternModule {
    configure(consumer) {
        consumer.apply(partner_middleware_middleware_1.PartnerMiddlewareMiddleware).forRoutes('*');
    }
};
PartnerInternModule = __decorate([
    common_1.Module({
        controllers: [partner_controller_controller_1.PartnerControllerController],
        imports: [
            common_1.HttpModule.register({
                timeout: 60000,
                maxRedirects: 5,
            }),
        ],
        providers: [partner_service_service_1.PartnerServiceService, helper_service_1.HelperService],
    })
], PartnerInternModule);
exports.PartnerInternModule = PartnerInternModule;
//# sourceMappingURL=partner-intern.module.js.map