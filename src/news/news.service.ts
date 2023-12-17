import { Injectable } from '@nestjs/common';
import {CreateNewsDto} from "./dto/create-news.dto";
import {InjectModel} from "@nestjs/sequelize";
import {News} from "./news.model";
import {FileService} from "../documents/file.servise";
import {ImagesNews} from "./models/images-news.model";
import {CreateImgNewsDto} from "./dto/create-img-news.dto";
import {NewsAddress} from "./models/address-news.model";
import {NewsContacts} from "./models/contacts-news.model";
import {DocsNews} from "./models/docs-news.model";
import {CreateDocNewsDto} from "./dto/create-doc-news.dto";


@Injectable()
export class NewsService {
    constructor(@InjectModel(News) private newsRepository: typeof News,
                @InjectModel(ImagesNews) private imageNews: typeof ImagesNews,
                @InjectModel(NewsAddress) private newsAddress: typeof NewsAddress,
                @InjectModel(NewsContacts) private newsContacts: typeof NewsContacts,
                @InjectModel(DocsNews) private docsNews: typeof DocsNews,
                private fileService : FileService
                ) {}

    async createNews(dto: CreateNewsDto, images: any[]){
        console.log('Это дтоошка', dto)
        console.log('Это массив фоток', images)
        const news = await this.newsRepository.create(dto)
        dto.address.map(async item=> await this.newsAddress.create({news_id: news.id, value: item}))
        dto.contacts.map(async item=> await this.newsContacts.create({news_id: news.id, value: item}))
        images.map(async item => {
            const dto_img :CreateImgNewsDto  = {
                news_id : news.id,
                path: `/news/${item.originalname}`
            }
            await this.imageNews.create(dto_img)
            await this.fileService.addFile(item, true, 'news')
        })
        return news
    }
    async addDocs(id: number, names: [], docs: any[]){
        const news = await this.newsRepository.findOne({where: {id: id}})
        if(news){
            docs.map(async (item , index) => {
                const dto: CreateDocNewsDto = {
                    news_id: news.id,
                    path: `/news/${item.originalname}`,
                    name : names[index]
                }
                await this.docsNews.create(dto)
                await this.fileService.addFile(item, true, 'news')
            })
        }
        return news;
    }

    async getById(id: number){
        const item = await this.newsRepository.findOne({where: {id: id}, include:{all:true}})
        return item;
    }

    async getAll(){
        const news =  this.newsRepository.findAll({
            include: {all: true}})
        return news
    }

}
