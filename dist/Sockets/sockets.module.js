"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketsModule = void 0;
const common_1 = require("@nestjs/common");
const sockets_gateway_1 = require("./sockets.gateway");
const SocketService_service_1 = require("./SocketService.service");
const helper_service_1 = require("../helper.service");
let SocketsModule = class SocketsModule {
};
SocketsModule = __decorate([
    common_1.Module({
        providers: [sockets_gateway_1.SocketsGateway, SocketService_service_1.SocketServiceService, helper_service_1.HelperService],
        exports: [sockets_gateway_1.SocketsGateway, SocketService_service_1.SocketServiceService],
        imports: [
            common_1.HttpModule.register({
                timeout: 60000,
                maxRedirects: 5,
            }),
        ],
    })
], SocketsModule);
exports.SocketsModule = SocketsModule;
//# sourceMappingURL=sockets.module.js.map