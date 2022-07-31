"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseListDecorateur = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ResponseHttp_1 = require("../Response/ResponseHttp");
const ResponseListDecorateur = (model) => {
    return common_1.applyDecorators(swagger_1.ApiResponse({
        status: 200,
        description: 'Donnés disponible',
        schema: {
            allOf: [
                { $ref: swagger_1.getSchemaPath(ResponseHttp_1.ResponseHttp) },
                {
                    properties: {
                        data: {
                            type: 'array',
                            items: { $ref: swagger_1.getSchemaPath(model) },
                        },
                    },
                },
            ],
        },
    }));
};
exports.ResponseListDecorateur = ResponseListDecorateur;
//# sourceMappingURL=ResponseListDecorateur.js.map