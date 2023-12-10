import {Body, Controller, Get, Post, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {CreateNewsDto} from "./dto/create-news.dto";
import {NewsService} from "./news.service";
import {FilesInterceptor, MulterModule} from "@nestjs/platform-express";

@Controller('news')
export class NewsController {
    constructor(private newsService : NewsService) {}

    @Get()
    getAll(){

    }

    @UseInterceptors(FilesInterceptor('files'))
    @Post()
    create(@Body() dto: CreateNewsDto, @UploadedFiles() files: Array<MulterModule>){
        return this.newsService.createNews(dto, files);
    }
}
