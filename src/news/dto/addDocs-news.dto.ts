import {ApiProperty} from "@nestjs/swagger";

export class AddDocsNewsDto{
    @ApiProperty({example: `['Важный документ 1', 'Важный документ 2']`, description: 'Навзание которое отобразиться пользователю'})
    readonly name: [];
}