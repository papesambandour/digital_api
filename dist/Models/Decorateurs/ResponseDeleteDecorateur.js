"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseDeleteDecorateur = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ResponseHttp_1 = require("../Response/ResponseHttp");
const ResponseDeleteDecorateur = (model) => {
    return common_1.applyDecorators(swagger_1.ApiResponse({
        status: 204,
        description: 'Les donnés ont été supprimés avec succès',
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
exports.ResponseDeleteDecorateur = ResponseDeleteDecorateur;
//# sourceMappingURL=ResponseDeleteDecorateur.js.map