import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import {FileService} from "../documents/file.servise";

@Module({
  controllers: [NewsController],
  providers: [NewsService, FileService],
  imports: [
      FileService
  ]
})
export class NewsModule {}
