"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
async function bootstrap() {
    const PORT = process.env.PORT || 5000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const cors = require("cors");
    const corsOptions = {
        origin: '*',
        credentials: true,
        optionSuccessStatus: 200,
    };
    app.use(cors(corsOptions));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Camion-express')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('yonardr')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('/api/docs', app, document);
    await app.useStaticAssets((0, path_1.join)(__dirname, '..', 'static'));
    await app.listen(PORT, () => console.log(`Server started localhost:${PORT}`));
}
bootstrap();
//# sourceMappingURL=main.js.map