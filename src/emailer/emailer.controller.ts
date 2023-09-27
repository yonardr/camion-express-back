import {Controller, Get} from '@nestjs/common';
import {EmailerService} from "./emailer.service";

@Controller('emailer')
export class EmailerController {
    constructor(private emailerService: EmailerService) {}
    @Get()
    get(){
        return this.emailerService.example();
    }
}
