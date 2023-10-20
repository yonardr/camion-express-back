import {Table, Model, Column, DataType, BelongsToMany} from 'sequelize-typescript'
import {ApiProperty} from '@nestjs/swagger'
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
interface UserCreationAttr{
    login: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttr>{
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id: number;

    @ApiProperty({example: 'yonardr123', description: 'тоже типо уникальная, логин'})
    @Column({type: DataType.STRING, unique:true, allowNull:false})
    login: string;

    @ApiProperty({example: 'i123', description: 'пароль'})
    @Column({type: DataType.STRING, allowNull:false})
    password: string;

    @BelongsToMany(()=> Role, ()=> UserRoles)
    roles : Role[];
}