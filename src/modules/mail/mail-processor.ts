import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { JOB_SEND_MAIL, QUEUE_MAIL } from './constant';
import { MailerService } from '@nestjs-modules/mailer';
import { Job } from 'bull';
import { Injectable, Logger } from '@nestjs/common';
import { ISendMailOptions } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';

@Injectable()
@Processor(QUEUE_MAIL)
export class MailProcessor {
  private readonly _logger = new Logger(MailProcessor.name);

  constructor(private readonly mailService: MailerService) {}

  @OnQueueActive()
  public onActive(job: Job) {
    this._logger.debug(`Processing job ${job.id} of type ${job.name}`);
  }

  @OnQueueCompleted()
  public onComplete(job: Job) {
    this._logger.debug(`Completed job ${job.id} of type ${job.name}`);
  }

  @OnQueueFailed()
  public onError(job: Job, error: any) {
    this._logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack);
  }

  @Process(JOB_SEND_MAIL)
  async sendMail(job: Job<ISendMailOptions>) {
    return await this.mailService.sendMail(job.data);
  }
}
