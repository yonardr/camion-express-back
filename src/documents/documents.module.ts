import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import {FileService} from "./file.servise";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Documents} from "./documents.model";
import {TypesDocuments} from "./types-documents.model";

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService, FileService],
  imports:[
    SequelizeModule.forFeature([Documents, TypesDocuments])
  ]
})
export class DocumentsModule {}
