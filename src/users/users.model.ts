import {Table, Model, Column, DataType} from 'sequelize-typescript'
import {ApiProperty} from '@nestjs/swagger'
interface UserCreationAttr{
    login: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttr>{
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id: number;

    @ApiProperty({example: 'islamloh', description: 'тоже типо уникальная, логин'})
    @Column({type: DataType.STRING, unique:true, allowNull:false})
    login: string;

    @ApiProperty({example: 'i123', description: 'пароль'})
    @Column({type: DataType.STRING, allowNull:false})
    password: string;
}