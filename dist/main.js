"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const HttpExceptionFilter_1 = require("./Filters/HttpExceptionFilter");
const path_1 = require("path");
require("allsettled-polyfill");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new HttpExceptionFilter_1.HttpExceptionFilter());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('SIMBOT SERVICES')
        .setDescription('Documentation Swagger pour SimBot Services')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    app.useStaticAssets(path_1.join(__dirname, '..', 'static'));
    app.setViewEngine('hbs');
    app.enableCors();
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map