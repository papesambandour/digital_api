"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHttpPaginationDecorateur = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const PaginatedDto_1 = require("../Response/PaginatedDto");
const ResponseHttpPaginationDecorateur = (model) => {
    return common_1.applyDecorators(swagger_1.ApiOkResponse({
        schema: {
            allOf: [
                { $ref: swagger_1.getSchemaPath(PaginatedDto_1.PaginatedDto) },
                {
                    properties: {
                        results: {
                            type: 'array',
                            items: { $ref: swagger_1.getSchemaPath(model) },
                        },
                    },
                },
            ],
        },
    }));
};
exports.ResponseHttpPaginationDecorateur = ResponseHttpPaginationDecorateur;
//# sourceMappingURL=ResponseHttpPaginationDecorateur.js.map