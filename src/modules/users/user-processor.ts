import { Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { QUEUE_USER, UPDATE_USER_AVATAR } from './constant';

@Injectable()
@Processor(QUEUE_USER)
export class UserProcessor {
  private readonly _logger = new Logger(UserProcessor.name);

  @Process(UPDATE_USER_AVATAR)
  async sendMail(job: Job) {
    this._logger.debug(job.data);
  }
}
