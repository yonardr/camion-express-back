import { Module } from '@nestjs/common';

import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { EmailerController } from './emailer.controller';
import { EmailerService } from './emailer.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: 'smtps://user@domain.com:pass@smtp.domain.com',
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [EmailerController],
  providers: [EmailerService]
})
export class EmailerModule {}
