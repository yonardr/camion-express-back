import { EmailerService } from "./emailer.service";
import { GetDataMailDto } from "./dto/get-data-mail.dto";
export declare class EmailerController {
    private emailerService;
    constructor(emailerService: EmailerService);
    post(dto: GetDataMailDto): Promise<SentMessageInfo>;
    postFile(dto: GetDataMailDto, file: any): Promise<SentMessageInfo>;
}
