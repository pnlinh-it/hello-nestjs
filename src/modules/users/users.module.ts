import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PassportModule } from '@nestjs/passport';
import { LoggerMiddleware } from '../../middlewares/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user-repository';
import { UserRoleRepository } from './user-role-repository';
import { RoleRepository } from '../role/role-repository';
import { SocialUserRepository } from './social-user-repository';

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
    PassportModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes({ path: 'users', method: RequestMethod.ALL });
  }
}
