import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto{
    @ApiProperty({example: 'ислам лох', description: 'Логин'})
    readonly login: string;
    @ApiProperty({example: 'лох лох123', description: 'Пароль'})
    readonly password: string;
}