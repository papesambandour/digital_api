"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionHandler = void 0;
const common_1 = require("@nestjs/common");
class HttpExceptionHandler extends common_1.HttpException {
    constructor() {
        super('Forbidden', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.HttpExceptionHandler = HttpExceptionHandler;
//# sourceMappingURL=HttpExceptionHandler.js.map