import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import {GetDataMailDto} from "./dto/get-data-mail.dto";

@Injectable()
export class EmailerService {
    constructor(private readonly mailerService: MailerService) {}
    async sendWithfile(dto: GetDataMailDto, file: any) {
        console.log(file)
        const res = await this.mailerService
            .sendMail({
                to:  ['astron0408@gmail.com', 'astron71@mail.ru'], // list of receivers
                from: 'info@kamion-express.tmweb.ru', // sender address
                subject: 'Заявка', // Subject line
                template: 'application-approved',
                html: `<h1>${dto.name} оставил заявку </h1><h1>Номер телефона: ${dto.tel}</h1><h1>Почта этого пользователя: ${dto.email}</h1>`, // HTML body content
                attachments: [{
                    filename: dto.file_name,
                    content: file.buffer.toString('base64'),
                    encoding: 'base64',
                    contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                }]
            })
        return res
    }
    async send(dto: GetDataMailDto) {
        const res = await this.mailerService
            .sendMail({
                to:  ['astron0408@gmail.com', 'astron71@mail.ru'], // list of receivers
                from: 'info@kamion-express.tmweb.ru', // sender address
                subject: 'Заявка', // Subject line
                template: 'application-approved',
                html: `<h1>${dto.name} оставил заявку </h1><h1>Номер телефона: ${dto.tel}</h1><h1>Почта этого пользователя: ${dto.email}</h1>`, // HTML body content
            })
        return res
    }
    async sendWithFile(dto: GetDataMailDto, fileBuffer: Buffer) {
        return this.mailerService.sendMail({
            to: ['astron0408@gmail.com', 'astron71@mail.ru'],
            from: 'info@kamion-express.tmweb.ru',
            subject: 'Заявка',
            html: `<h1>${dto.name} оставил заявку</h1><h1>Номер телефона: ${dto.tel}</h1><h1>Почта этого пользователя: ${dto.email}</h1>`,
            attachments: [{
                filename: dto.file_name,
                content: fileBuffer.toString('base64'),
                encoding: 'base64',
                contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            }],
        });
    }
}
