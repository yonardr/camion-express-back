import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Documents} from "../../documents/documents.model";
import {News} from "../news.model";
import {ApiProperty} from "@nestjs/swagger";

@Table({tableName: 'docs_news', createdAt: false, updatedAt:false})
export class DocsNews extends Model<DocsNews>{

    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id: number;

    @ApiProperty({example: 'Транспортная карта.docx', description: 'Нзавние файла для вывод в фронте'})
    @Column({type: DataType.STRING,  allowNull:false})
    name: string;

    @ApiProperty({example: 'djsbhfkushjbhi38hd3.docx', description: 'Путь файла в статике'})
    @Column({type: DataType.STRING, unique:true, allowNull:false})
    path: string;

    @ForeignKey(()=> News)
    @Column({type: DataType.INTEGER})
    news_id: number
}