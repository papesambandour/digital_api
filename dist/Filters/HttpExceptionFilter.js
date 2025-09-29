"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        console.log(exception);
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        if (process.env.MODE === 'dev') {
            return response.status(status).json({
                code: status,
                error: true,
                msg: exception === null || exception === void 0 ? void 0 : exception.message,
                data: (exception === null || exception === void 0 ? void 0 : exception.trace) || {},
                path: request.url,
            });
        }
        else {
            return response.status(status).json({
                code: status,
                error: true,
                msg: 'Une erreur est survenue',
                _msg: exception === null || exception === void 0 ? void 0 : exception.message,
                _d: exception === null || exception === void 0 ? void 0 : exception.trace,
                data: {},
                path: '',
            });
        }
    }
};
HttpExceptionFilter = __decorate([
    common_1.Catch()
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=HttpExceptionFilter.js.map