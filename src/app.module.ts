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
import { RolesController } from './roles/roles.controller';
import { RolesModule } from './roles/roles.module';
import * as path from "path";
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import {News} from "./news/news.model";
import {DocsNews} from "./news/models/docs-news.model";
import {DocumentsService} from "./documents/documents.service";
import {NewsAddress} from "./news/models/address-news.model";
import {NewsContacts} from "./news/models/contacts-news.model";
import {ImagesNews} from "./news/models/images-news.model";
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
      models: [User, Documents, TypesDocuments, Role, UserRoles, News, DocsNews, NewsAddress, NewsContacts, ImagesNews],
      autoLoadModels:true
    }),
      TrucksModule, UsersModule, EmailerModule, DocumentsModule, RolesModule, AuthModule, NewsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
