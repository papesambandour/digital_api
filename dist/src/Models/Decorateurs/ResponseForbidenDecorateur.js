"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseForbidenDecorateur = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ResponseForbidenDecorateur = (model) => {
    return common_1.applyDecorators(swagger_1.ApiResponse({
        status: 401,
        description: "L'Authentication est requis",
        schema: {
            allOf: [{ $ref: swagger_1.getSchemaPath(model) }],
        },
    }));
};
exports.ResponseForbidenDecorateur = ResponseForbidenDecorateur;
//# sourceMappingURL=ResponseForbidenDecorateur.js.map