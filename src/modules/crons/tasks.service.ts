import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron('*/5 * * * * *') // Every 5 second -> 17:00:05 17:00:10 17:00:15
  // @Cron('5 * * * * *') // Every minute on the second 5th -> 17:00:05 17:01:05 17:02:05
  handleCron() {
    this.logger.debug('Called when the current second is 45');
  }
}
