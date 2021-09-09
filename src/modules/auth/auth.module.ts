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
import { UserResolver } from '../users/user.resolver';

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
    AuthService,
  ],
  controllers: [AuthController],
  exports: [CaslAbilityFactory],
})
export class AuthModule {}
