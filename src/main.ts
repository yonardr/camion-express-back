import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, () => console.log(`Server started localhost:3000`));


  const config = new DocumentBuilder()
      .setTitle('Camion-express')
      .setDescription('Документация REST API')
      .setVersion('1.0.0')
      .addTag('yonardr')
      .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
}

bootstrap();
