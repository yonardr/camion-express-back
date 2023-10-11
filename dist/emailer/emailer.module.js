"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailerModule = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const emailer_controller_1 = require("./emailer.controller");
const emailer_service_1 = require("./emailer.service");
let EmailerModule = class EmailerModule {
};
EmailerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRootAsync({
                useFactory: () => ({
                    transport: {
                        host: 'smtp.timeweb.ru',
                        port: 25,
                        auth: {
                            user: 'info@kamion-express.tmweb.ru',
                            pass: 'IGIP5fOEy8XumaaOifO3'
                        }
                    },
                    defaults: {
                        from: '"No Reply" <info@kamion-express.tmweb.ru>',
                    },
                    template: {
                        dir: __dirname + '/templates',
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }),
            }),
        ],
        controllers: [emailer_controller_1.EmailerController],
        providers: [emailer_service_1.EmailerService]
    })
], EmailerModule);
exports.EmailerModule = EmailerModule;
//# sourceMappingURL=emailer.module.js.map