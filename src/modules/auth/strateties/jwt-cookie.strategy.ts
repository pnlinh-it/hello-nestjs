import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { StrategyEnum } from './strategy.enum';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../../config/app-config';
import { Request } from 'express';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtCookieStrategy extends PassportStrategy(Strategy, StrategyEnum.JwtCookie) {
  constructor(private userService: UsersService, private configService: ConfigService<AppConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          console.log(`Token ${request?.cookies?.Authentication}`);
          return request?.cookies?.Authentication;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwtKey'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any) {
    const isAdmin = await this.userService.hasRole(payload.userId, 'admin');
    if (isAdmin) {
      return await this.userService.findById(payload.userId);
    }
    return null;
  }
}
