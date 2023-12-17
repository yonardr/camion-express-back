import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {News} from "../news.model";

@Table({tableName: 'news_address'})
export class NewsAddress extends Model<NewsAddress>{
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id: number;

    @ApiProperty({example: `['г.Набережные Челны, ул.Мензелинский тракт, д.30A', 'г.Набережные Челны, ул.Мензелинский тракт, д.30A']`, description: ''})
    @Column({type: DataType.STRING, allowNull:false})
    value: string;

    @ForeignKey(()=> News)
    @Column({type: DataType.INTEGER})
    news_id: number
}
