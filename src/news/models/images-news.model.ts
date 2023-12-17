import {Table, Model, Column, DataType, ForeignKey} from 'sequelize-typescript'
import {ApiProperty} from '@nestjs/swagger'
import {News} from "../news.model";

@Table({tableName: 'news_images'})
export class ImagesNews extends Model<ImagesNews>{
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id: number;

    @ApiProperty({example: '/news/truck.png', description: 'Путь к фотографии для новости'})
    @Column({type: DataType.STRING, allowNull:false})
    path: string;

    @ForeignKey(()=> News)
    @Column({type: DataType.INTEGER})
    news_id: number
}