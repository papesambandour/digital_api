"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseDecorateur = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ResponseHttp_1 = require("../Response/ResponseHttp");
const ResponseHttpDefaultData_1 = require("../Response/ResponseHttpDefaultData");
const ResponseDecorateur = (model, status, description, isArray = false) => {
    if (model === null) {
        return common_1.applyDecorators(swagger_1.ApiResponse({
            status: status,
            description: description,
            schema: {
                allOf: [{ $ref: swagger_1.getSchemaPath(ResponseHttpDefaultData_1.ResponseHttpDefaultData) }],
            },
        }));
    }
    if (!isArray) {
        return common_1.applyDecorators(swagger_1.ApiResponse({
            status: status,
            description: description,
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
    }
    else {
        return common_1.applyDecorators(swagger_1.ApiResponse({
            status: status,
            description: description,
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
    }
};
exports.ResponseDecorateur = ResponseDecorateur;
//# sourceMappingURL=ResponseDecorateur.js.map