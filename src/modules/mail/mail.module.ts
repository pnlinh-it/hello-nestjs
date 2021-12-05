import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailConfigFactory } from './mail-config.factory';
import { ConfigService } from '@nestjs/config';
import { BullModule, InjectQueue } from '@nestjs/bull';
import { QUEUE_MAIL } from './constant';
import { MailProcessor } from './mail-processor';
import { BullBoardModule } from '../bulls/bull-board.module';
import { Queue } from 'bull';
import { QueuesService } from '../bulls/queues.service';
import { BullAdapter } from '@bull-board/api/bullAdapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useClass: MailConfigFactory,
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: QUEUE_MAIL,
    }),
    BullBoardModule,
  ],
  providers: [MailService, MailProcessor],
  exports: [MailService],
})
export class MailModule {
  constructor(
    @InjectQueue(QUEUE_MAIL) private readonly mailQueue: Queue,
    private readonly queuesService: QueuesService,
  ) {
    queuesService.addNewQueue(new BullAdapter(mailQueue));
  }
}
