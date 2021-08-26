import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../../../config/environment-variables';
import { UsersService } from '../../users/users.service';
import { StrategyEnum } from './strategy.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, StrategyEnum.JWT) {
  constructor(
    private configService: ConfigService<EnvironmentVariables>,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwtKey'),
    });
  }

  async validate(payload: any) {
    return this.userService.findById(payload.userId);
  }
}
