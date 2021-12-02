import { Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../../config/app-config';
import { Google } from '../../../config/types/google';
import { PassportStrategy } from '@nestjs/passport';
import { StrategyEnum } from './strategy.enum';
import { Injectable } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';
import { OauthUser } from '../oauth/oauth-user';
import { Provider } from '../oauth/provider';
import { UsersService } from '../../users/users.service';

@Injectable()
export class GoogleRedirectStrategy extends PassportStrategy(
  Strategy,
  StrategyEnum.GoogleRedirect,
) {
  constructor(private userService: UsersService, private configService: ConfigService<AppConfig>) {
    super({
      clientID: configService.get<Google>('google').clientId,
      clientSecret: configService.get<Google>('google').clientSecret,
      callbackURL: configService.get<Google>('google').callbackUrl,
      scope: ['email', 'profile'],
      // state: true, to use state add express-session middleware
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any): Promise<User> {
    const oauthUser = OauthUser.fromRaw(profile, accessToken, Provider.Google);

    return await this.userService.firstOrCreateFromOauthUser(oauthUser);
  }
}
