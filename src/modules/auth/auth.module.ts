import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl/casl-ability-factory';
import { LocalStrategy } from './strateties/local.strategy';
import { JwtStrategy } from './strateties/jwt.strategy';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig } from '../../config/app-config';
import { AuthController } from './auth.controller';
import { FacebookStrategy } from './strateties/facebook.strategy';
import { GoogleTokenStrategy } from './strateties/google-token.strategy';
import { PasswordResetModule } from '../password-reset/password-reset.module';
import { MailModule } from '../mail/mail.module';
import { AuthResolver } from './auth.resolver';
import { GoogleRedirectStrategy } from './strateties/google-redirect.strategy';
import { JwtCookieStrategy } from './strateties/jwt-cookie.strategy';
import { GoogleAdminStrategy } from './strateties/google-admin.strategy';
import { AdminAuthController } from './admin.auth.controller';
import { WebsocketJwtStrategy } from './strateties/websocket-jwt.strategy';

type ConfigServiceEnv = ConfigService<AppConfig>;

@Module({
  imports: [
    UsersModule,
    MailModule,
    PasswordResetModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigServiceEnv) => ({
        secret: configService.get('jwtKey'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    CaslAbilityFactory,
    LocalStrategy,
    JwtStrategy,
    FacebookStrategy,
    GoogleTokenStrategy,
    GoogleRedirectStrategy,
    JwtCookieStrategy,
    GoogleAdminStrategy,
    WebsocketJwtStrategy,
    AuthService,
    AuthResolver,
  ],
  controllers: [AuthController, AdminAuthController],
  exports: [CaslAbilityFactory, AuthService],
})
export class AuthModule {}
