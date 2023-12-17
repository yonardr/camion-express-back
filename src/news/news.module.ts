import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import {DocumentsService} from "../documents/documents.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {Documents} from "../documents/documents.model";
import {DocsNews} from "./models/docs-news.model";
import {News} from "./news.model";
import {TypesDocuments} from "../documents/types-documents.model";
import {FileService} from "../documents/file.servise";
import {ImagesNews} from "./models/images-news.model";
import {NewsAddress} from "./models/address-news.model";
import {NewsContacts} from "./models/contacts-news.model";


@Module({
  controllers: [NewsController],
  providers: [NewsService, FileService],
  imports: [
      SequelizeModule.forFeature([Documents, DocsNews, News, TypesDocuments, ImagesNews, NewsAddress, NewsContacts]),
  ]
})
export class NewsModule {}
