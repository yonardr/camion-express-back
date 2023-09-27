import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailerService {
    constructor(private readonly mailerService: MailerService) {}
    async example() {
        await this.mailerService
            .sendMail({
                to: 'rustem2129@mail.ru', // list of receivers
                from: 'noreply@nestjs.com', // sender address
                subject: 'Testing Nest MailerModule ✔', // Subject line
                text: 'welcome', // plaintext body
                html: '<b>welcome</b>', // HTML body content
            })
        return 1
    }
}
