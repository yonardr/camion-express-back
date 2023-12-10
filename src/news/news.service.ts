import { Injectable } from '@nestjs/common';
import {CreateNewsDto} from "./dto/create-news.dto";
import {FileService} from "../documents/file.servise";

@Injectable()
export class NewsService {

    constructor(private fileService : FileService) {}

    createNews(dto: CreateNewsDto, files : any[]){
        files.map(item => {
            this.fileService.addFile(item, true, 'news')
        })
        return 1
    }

}
