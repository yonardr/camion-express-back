import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {NestExpressApplication} from "@nestjs/platform-express";
import { join } from 'path';
async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);


  const cors=require("cors");
  const corsOptions ={
    origin:'*',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
  }
  app.use(cors(corsOptions))

  const config = new DocumentBuilder()
      .setTitle('Camion-express')
      .setDescription('Документация REST API')
      .setVersion('1.0.0')
      .addTag('yonardr')
      .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.useStaticAssets(join(__dirname, '..', 'static'));

  await app.listen(PORT, () => console.log(`Server started localhost:${PORT}`));
}

bootstrap();
