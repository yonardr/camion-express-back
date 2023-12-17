import {ApiProperty} from "@nestjs/swagger";

export class CreateDocNewsDto{
    @ApiProperty({example: '/news/truck.png', description: 'Путь до фото'})
    readonly path: string;

    @ApiProperty({example: 'Накладная', description: 'Навзание которое отобразиться пользователю'})
    readonly name: string;

    @ApiProperty({example: '1', description: 'ID новости к которому прикрепляется фото'})
    readonly news_id: number;

}