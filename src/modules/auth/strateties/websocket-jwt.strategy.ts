import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../../config/app-config';
import { UsersService } from '../../users/users.service';
import { StrategyEnum } from './strategy.enum';

// import { Socket } from 'socket.io';

@Injectable()
export class WebsocketJwtStrategy extends PassportStrategy(Strategy, StrategyEnum.WebsocketJwt) {
  constructor(private configService: ConfigService<AppConfig>, private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          console.log(`Token ${request.handshake.headers.Authorization}`);
          return request?.cookies?.Authentication;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwtKey'),
    });
  }

  async validate(payload: any) {
    return this.userService.findById(payload.userId);
  }
}
