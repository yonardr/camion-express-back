import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import {FileService} from "./file.servise";
import {SequelizeModule} from "@nestjs/sequelize";
import {Documents} from "./documents.model";
import {TypesDocuments} from "./types-documents.model";
import {DocsNews} from "../news/models/docs-news.model";
import {News} from "../news/news.model";

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService, FileService],
  imports:[
    SequelizeModule.forFeature([Documents, TypesDocuments, DocsNews, News])
  ],
  exports:[
      DocumentsService
  ]
})
export class DocumentsModule {}
