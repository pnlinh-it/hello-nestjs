import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl/casl-ability-factory';
import { LocalStrategy } from './strateties/local.strategy';
import { JwtStrategy } from './strateties/jwt.strategy';

@Module({
  providers: [CaslAbilityFactory, LocalStrategy, JwtStrategy],
  exports: [CaslAbilityFactory],
})
export class AuthModule {}
