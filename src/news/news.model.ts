import {Table, Model, Column, DataType, BelongsToMany, HasMany} from 'sequelize-typescript'
import {ApiProperty} from '@nestjs/swagger'
import {Documents} from "../documents/documents.model";
import {DocsNews} from "./models/docs-news.model";
import {NewsAddress} from "./models/address-news.model";
import {NewsContacts} from "./models/contacts-news.model";
import {ImagesNews} from "./models/images-news.model";



interface CreateNews{
    title: string,
    description: string,
    contacts: string[],
    address : string[]
}

@Table({tableName: 'news'})
export class News extends Model<News, CreateNews>{
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id: number;

    @ApiProperty({example: 'Закрытие паромной переправы', description: 'Нзавние новости'})
    @Column({type: DataType.STRING,  allowNull:false})
    title: string;

    @ApiProperty({example: 'Дорогие клиенты,\n' +
            'При планировании отправок в г. Якутск, просьба обращаться к менеджеру за предварительным расчетом стоимости и сроков доставки, т.к. начинается демисезонный период. (С 04.10.2023г вступят ограничения на паромной переправе Н. Бестях - Якутск.)\n' +
            'Информация ниже является ориентировочной и может корректироваться, исходя из погодных условий региона.', description: 'Описание (основной текст)'})
    @Column({type: DataType.TEXT, allowNull:false})
    description: string;

    @HasMany(() => NewsAddress)
    newsAddress: NewsAddress[];

    @HasMany(() => NewsContacts)
    newsContacts: NewsContacts[];

    @HasMany(() => ImagesNews)
    newsImgs: ImagesNews[];

    @HasMany(() => DocsNews)
    newsDocs: DocsNews[];

}


