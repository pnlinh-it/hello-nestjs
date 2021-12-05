import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { QueuesService } from './queues.service';
import * as cookieParser from 'cookie-parser';
import { AdminRoleMiddleware } from './admin-role.middleware';

@Module({
  providers: [
    QueuesService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard(StrategyEnum.JwtCookie),
    // },
  ],
  exports: [QueuesService],
})
export class BullBoardModule implements NestModule {
  constructor(private readonly queuesService: QueuesService) {}

  configure(consumer: MiddlewareConsumer) {
    const serverAdapter = this.queuesService.getServerAdapter();

    serverAdapter.setBasePath('/api/admin/queues');

    consumer
      .apply(
        cookieParser(),
        AdminRoleMiddleware,
        // passport.authenticate(StrategyEnum.JwtCookie, { session: false }),
        // function (request: Request, response: Response, next: NextFunction) {
        // Only get call when authenticate successfully
        //   if (request.user) {
        //     return next();
        //   }
        //   response.send(HttpStatus.NOT_FOUND);
        // },
        serverAdapter.getRouter(),
      )
      .forRoutes('/admin/queues');
  }
}
