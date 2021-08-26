import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../../../config/environment-variables';
import { OauthUser } from '../oauth/oauth-user';
// import { PassportGoogleStrategy } from './passport-google.strategy';
import { Google } from '../../../config/types/google';
import { Provider } from '../oauth/provider';
import { StrategyEnum } from './strategy.enum';
import { MyCustomGoogleStrategy } from './custom/my-custom-google.strategy';

@Injectable()
// This class must be instantiate while application start
// Typically, to instantiate while application start we add into Module providers
export class GoogleTokenStrategy extends PassportStrategy(
  MyCustomGoogleStrategy,
  StrategyEnum.GoogleToken,
) {
  constructor(
    private configService: ConfigService<EnvironmentVariables>,
    private userService: UsersService,
  ) {
    super({
      clientID: configService.get<Google>('google').clientId,
      clientSecret: configService.get<Google>('google').clientSecret,
      accessTokenField: 'token',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any): Promise<User> {
    const oauthUser = OauthUser.fromRaw(profile, accessToken, Provider.Google);

    return await this.userService.firstOrCreateFromOauthUser(oauthUser);
  }
}
