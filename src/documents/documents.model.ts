import {Table, Model, Column, DataType, ForeignKey} from 'sequelize-typescript'
import {ApiProperty} from '@nestjs/swagger'
import {TypesDocuments} from "./types-documents.model";

interface CreateDocuments{
    name: string,
    path: string,
    type_id : number
}

@Table({tableName: 'documents'})
export class Documents extends Model<Documents, CreateDocuments>{
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id: number;

    @ApiProperty({example: 'Транспортная карта.docx', description: 'Нзавние файла для вывод в фронте'})
    @Column({type: DataType.STRING,  allowNull:false})
    name: string;

    @ApiProperty({example: 'djsbhfkushjbhi38hd3.docx', description: 'Путь файла в статике'})
    @Column({type: DataType.STRING, unique:true, allowNull:false})
    path: string;

    @ForeignKey(()=>TypesDocuments)
    @Column({type: DataType.INTEGER})
    type_id: number
}