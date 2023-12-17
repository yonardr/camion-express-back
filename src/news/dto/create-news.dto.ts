import {ApiProperty} from "@nestjs/swagger";
import {AddDocumentDto} from "../../documents/dto/add-document.dto";

export class CreateNewsDto{
    @ApiProperty({example: 'Прямые машины: Красноярск!', description: 'Заголовок новости'})
    readonly title: string;

    @ApiProperty({example: 'Лучшие цены на рынке с высоким качеством Индивидуальные скидки и спецпердложения Идем на встречу - все ставки обсуждаемы!', description: 'Описание новости'})
    readonly description: string;

    @ApiProperty({example: `['г.Казань', 'г.Москва']`, description: 'Массив адресов'})
    readonly address: [];

    @ApiProperty({example: `['+7 (855) 247-05-90', '+7 (999) 247-05-99']`, description: 'Массив адресов'})
    readonly contacts: [];

}