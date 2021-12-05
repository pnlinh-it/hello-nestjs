import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from '../../middlewares/logger.middleware';
import { RoleRepository } from '../role/role-repository';
import { RolesLoader } from './roles.loader';
import { SocialUserRepository } from './repositories/social-user-repository';
import { UserResolver } from './user.resolver';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './repositories/user-repository';
import { UserRoleRepository } from './repositories/user-role-repository';
import { UserProcessor } from './user-processor';
import { BullModule, InjectQueue } from '@nestjs/bull';
import { QUEUE_USER } from './constant';
import { Queue } from 'bull';
import { QueuesService } from '../bulls/queues.service';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { BullBoardModule } from '../bulls/bull-board.module';

/**
 * To use UserService in other module
 * that import UserModule: exports: [UsersService]
 * Here we just invoke LocalStrategy to invoke it's constructor to register passport strategy
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      RoleRepository,
      UserRoleRepository,
      SocialUserRepository,
    ]),
    BullModule.registerQueue({
      name: QUEUE_USER,
    }),
    PassportModule,
    BullBoardModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UserResolver, RolesLoader, UserProcessor],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  constructor(
    @InjectQueue(QUEUE_USER) private readonly userQueue: Queue,
    private readonly queuesService: QueuesService,
  ) {
    queuesService.addNewQueue(new BullAdapter(userQueue));
  }
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes({ path: 'users', method: RequestMethod.ALL });
  }
}
