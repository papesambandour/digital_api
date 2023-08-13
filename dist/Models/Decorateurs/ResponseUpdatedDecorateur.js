"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseUpdatedDecorateur = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ResponseHttp_1 = require("../Response/ResponseHttp");
const ResponseUpdatedDecorateur = (model) => {
    return common_1.applyDecorators(swagger_1.ApiResponse({
        status: 201,
        description: 'Les donnés ont été mis a jour avec succès',
        schema: {
            allOf: [
                { $ref: swagger_1.getSchemaPath(ResponseHttp_1.ResponseHttp) },
                {
                    properties: {
                        data: { $ref: swagger_1.getSchemaPath(model) },
                    },
                },
            ],
        },
    }));
};
exports.ResponseUpdatedDecorateur = ResponseUpdatedDecorateur;
//# sourceMappingURL=ResponseUpdatedDecorateur.js.map