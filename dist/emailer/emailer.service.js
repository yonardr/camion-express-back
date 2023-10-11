"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailerService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
let EmailerService = class EmailerService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendWithfile(dto, file) {
        console.log(file);
        const res = await this.mailerService
            .sendMail({
            to: 'rustem2129@mail.ru',
            from: 'info@kamion-express.tmweb.ru',
            subject: 'Заявка',
            template: 'application-approved',
            html: `<h1>${dto.name} оставил заявку </h1><h1>Номер телефона: ${dto.tel}</h1><h1>Почта этого пользователя: ${dto.email}</h1>`,
            attachments: [{
                    filename: file.originalname,
                    content: file.buffer.toString('base64'),
                    encoding: 'base64',
                    contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                }]
        });
        return res;
    }
    async send(dto) {
        const res = await this.mailerService
            .sendMail({
            to: 'rustem2129@mail.ru',
            from: 'info@kamion-express.tmweb.ru',
            subject: 'Заявка',
            template: 'application-approved',
            html: `<h1>${dto.name} оставил заявку </h1><h1>Номер телефона: ${dto.tel}</h1><h1>Почта этого пользователя: ${dto.email}</h1>`,
        });
        return res;
    }
};
EmailerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], EmailerService);
exports.EmailerService = EmailerService;
//# sourceMappingURL=emailer.service.js.map