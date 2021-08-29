import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../config/app-config';
import { Mail } from '../../config/types/mail';
import { Injectable } from '@nestjs/common';
// port: 587,
// port: 465 secure: true, // use TLS
@Injectable()
export class MailConfigFactory implements MailerOptionsFactory {
  constructor(private configService: ConfigService<AppConfig>) {}
  createMailerOptions(): Promise<MailerOptions> | MailerOptions {
    const mailConfig = this.configService.get<Mail>('mail');

    const mailService = this.getMailService();
    return {
      transport: {
        host: mailService.host,
        port: mailConfig.port,
        auth: {
          user: mailService.user,
          pass: mailService.password,
        },
      },
      defaults: {
        from: {
          name: mailConfig.fromName,
          address: mailConfig.fromAddress,
        },
      },
      template: {
        adapter: new HandlebarsAdapter(),
        options: { strict: true },
      },
    };
  }

  getMailService() {
    const mailConfig = this.configService.get<Mail>('mail');
    const driver = mailConfig.driver;
    return mailConfig.services[driver];
  }
}
