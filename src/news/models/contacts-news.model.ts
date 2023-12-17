import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {News} from "../news.model";

@Table({tableName: 'news_contacts'})
export class NewsContacts extends Model<NewsContacts>{
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id: number;

    @ApiProperty({example: `['+7 (855) 247-05-90', '+7 (855) 247-05-90']`, description: ''})
    @Column({type: DataType.STRING, allowNull:false})
    value: string;

    @ForeignKey(()=> News)
    @Column({type: DataType.INTEGER})
    news_id: number
}