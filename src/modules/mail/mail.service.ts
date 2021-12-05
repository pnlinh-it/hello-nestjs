import { Injectable } from '@nestjs/common';
import { ISendMailOptions } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';
import { InjectQueue } from '@nestjs/bull';
import { JOB_SEND_MAIL, QUEUE_MAIL } from './constant';
import { Queue } from 'bull';

@Injectable()
export class MailService {
  constructor(@InjectQueue(QUEUE_MAIL) private readonly mailQueue: Queue) {}

  async send(sendMailOptions: ISendMailOptions) {
    await this.mailQueue.add(JOB_SEND_MAIL, sendMailOptions, {
      attempts: 5,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    });
  }
}
