import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);


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

  await app.listen(PORT, () => console.log(`Server started localhost:${PORT}`));
}

bootstrap();
