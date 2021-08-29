import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ISendMailOptions } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  async send(sendMailOptions: ISendMailOptions) {
    return this.mailService.sendMail(sendMailOptions);
  }
}
