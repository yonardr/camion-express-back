import {Table, Model, Column, DataType} from 'sequelize-typescript'
import {ApiProperty} from '@nestjs/swagger'

interface CreateTypes {
    name: string;
}

@Table({tableName: 'documents-types'})
export class TypesDocuments extends Model<TypesDocuments, CreateTypes>{
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id: number;

    @ApiProperty({example: 'Документы компании', description: ''})
    @Column({type: DataType.STRING, allowNull:false})
    name: string;
}