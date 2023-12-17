import {Body, Controller, Get, Param, Post, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {CreateNewsDto} from "./dto/create-news.dto";
import {NewsService} from "./news.service";
import {FilesInterceptor, MulterModule} from "@nestjs/platform-express";
import {AddDocsNewsDto} from "./dto/addDocs-news.dto";

@Controller('news')
export class NewsController {
    constructor(private newsService : NewsService) {}

    @Get()
    getAll(){
        return this.newsService.getAll()
    }

    @Get('/:id')
    getById(@Param('id') id: number){
        return this.newsService.getById(id)
    }

    @UseInterceptors(FilesInterceptor('images'))
    @Post()
    create(@Body() dto: CreateNewsDto,
           @UploadedFiles() images: Array<MulterModule>){
        return this.newsService.createNews(dto, images);
    }

    @UseInterceptors(FilesInterceptor('docs'))
    @Post('/:id')
    addDocs(@Param('id') id: number,
            @Body() name: AddDocsNewsDto,
           @UploadedFiles() docs: Array<MulterModule>){
        return this.newsService.addDocs(id, name.name, docs)
    }
}
