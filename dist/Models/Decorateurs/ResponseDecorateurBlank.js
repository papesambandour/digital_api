"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseDecorateurBlank = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ResponseDecorateurBlank = (model, status, description) => {
    return common_1.applyDecorators(swagger_1.ApiResponse({
        status: status,
        description: description,
        schema: {
            allOf: [{ $ref: swagger_1.getSchemaPath(model) }],
        },
    }));
};
exports.ResponseDecorateurBlank = ResponseDecorateurBlank;
//# sourceMappingURL=ResponseDecorateurBlank.js.map