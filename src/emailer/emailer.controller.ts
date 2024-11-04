import {Body, Controller, Post, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import {EmailerService} from "./emailer.service";
import {GetDataMailDto} from "./dto/get-data-mail.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {CalcEmailerService} from "./calc-emailer.service";
import {CalcMailDto} from "./dto/calc-mail.dto";
import { Response } from 'express';
@Controller('emailer')
export class EmailerController {
    constructor(private readonly emailerService: EmailerService,
                private readonly calcEmailerService: CalcEmailerService
    ) {}

    @Post()
    post(@Body() dto : GetDataMailDto){
        return this.emailerService.send(dto);
    }
    @Post('/file')
    @UseInterceptors(FileInterceptor('file'))
    postFile(@Body() dto: GetDataMailDto, @UploadedFile() file){
        return this.emailerService.sendWithfile(dto, file);
    }

    @Post('calc/send')
    async sendDocument(@Body() data: CalcMailDto) {
        await this.calcEmailerService.generateAndSendDocument(data);
        return { message: 'Документ успешно сгенерирован и отправлен на почту' };
    }

    @Post('/calc')
    async generateDocument(
        @Body() dto: CalcMailDto,
        @Res() res: Response
    ) {
        const buffer = await this.calcEmailerService.generateDocument(dto);
        // Устанавливаем заголовки с использованием `header` или `setHeader`
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.setHeader('Content-Disposition', 'attachment; filename=document.docx');
        res.send(buffer);
        const obj: GetDataMailDto = {
            name: '123',
            tel: '123',
            email: '123',
            file_name: 'application.docx'
        }
        return dto
        //return this.emailerService.sendWithfile(obj, buffer);
    }
}
