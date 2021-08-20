import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../../config/environment-variables';
import { LoggerMiddleware } from '../../middlewares/logger.middleware';
import { JwtStrategy } from '../auth/strateties/jwt.strategy';
import { LocalStrategy } from '../auth/strateties/local.strategy';

type ConfigServiceEnv = ConfigService<EnvironmentVariables>;

/**
 * To use UserService in other module
 * that import UserModule: exports: [UsersService]
 * Here we just invoke LocalStrategy to invoke it's constructor to register passport strategy
 */
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigServiceEnv) => ({
        secret: configService.get('jwtKey'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, LocalStrategy, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.ALL });
  }
}
