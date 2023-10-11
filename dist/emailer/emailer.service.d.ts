import { MailerService } from '@nestjs-modules/mailer';
import { GetDataMailDto } from "./dto/get-data-mail.dto";
export declare class EmailerService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendWithfile(dto: GetDataMailDto, file: any): Promise<SentMessageInfo>;
    send(dto: GetDataMailDto): Promise<SentMessageInfo>;
}
