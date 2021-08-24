import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl/casl-ability-factory';
import { LocalStrategy } from './strateties/local.strategy';
import { JwtStrategy } from './strateties/jwt.strategy';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../../config/environment-variables';
import { AuthController } from './auth.controller';
import { FacebookStrategy } from './strateties/facebook.strategy';

type ConfigServiceEnv = ConfigService<EnvironmentVariables>;

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigServiceEnv) => ({
        secret: configService.get('jwtKey'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CaslAbilityFactory, LocalStrategy, JwtStrategy, FacebookStrategy, AuthService],
  controllers: [AuthController],
  exports: [CaslAbilityFactory],
})
export class AuthModule {}
