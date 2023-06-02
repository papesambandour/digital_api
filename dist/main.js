"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeData = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const HttpExceptionFilter_1 = require("./Filters/HttpExceptionFilter");
const path_1 = require("path");
const Utils = require("util");
const serializeData = function (data) {
    try {
        return Utils.inspect(data, false, 5);
    }
    catch (e) {
        console.log(e);
        return '';
    }
};
exports.serializeData = serializeData;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new HttpExceptionFilter_1.HttpExceptionFilter());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('INTECH API SERVICES')
        .setDescription('Documentation Swagger pour SimBot Services')
        .setVersion('1.0')
        .setContact('Pape Samba NDOUR', 'https://api.intech.sn', 'papesambandour@hotmail.com')
        .addBearerAuth({ type: 'apiKey', name: 'apikey', scheme: 'bearer', in: 'header' }, 'apikey')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    app.useStaticAssets(path_1.join(__dirname, '..', 'static'));
    app.setViewEngine('hbs');
    app.enableCors();
    const port = process.env.RUNTIME_ENV === 'CRON'
        ? parseInt(process.env.PORT) + 1
        : parseInt(process.env.PORT);
    console.log('running on port', port);
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map