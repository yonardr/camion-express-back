import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import { TrucksModule } from './trucks/trucks.module';
import { UsersModule } from './users/users.module';
import {User} from './users/users.model';
import { EmailerModule } from './emailer/emailer.module';
import { DocumentsModule } from './documents/documents.module';
import {Documents} from "./documents/documents.model";
import {TypesDocuments} from "./documents/types-documents.model";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath : `.${process.env.NODE_ENV}.env`
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve( __dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Documents, TypesDocuments],
      autoLoadModels:true
    }),
      TrucksModule, UsersModule, EmailerModule, DocumentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
