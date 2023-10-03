import { Module } from '@nestjs/common';

import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { EmailerController } from './emailer.controller';
import { EmailerService } from './emailer.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
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
