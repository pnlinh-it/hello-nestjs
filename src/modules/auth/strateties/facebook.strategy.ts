import * as FacebookTokenStrategy from 'passport-facebook-token';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../../../config/environment-variables';
import { Facebook } from '../../../config/types/facebook';
import { OauthUser } from '../oauth/oauth-user';

@Injectable()
// This class must be instantiate while application start
// Typically, to instantiate while application start we add into Module providers
export class FacebookStrategy extends PassportStrategy(FacebookTokenStrategy) {
  constructor(
    private configService: ConfigService<EnvironmentVariables>,
    private userService: UsersService,
  ) {
    super({
      clientID: configService.get<Facebook>('facebook').clientId,
      clientSecret: configService.get<Facebook>('facebook').clientSecret,
      fbGraphVersion: 'v3.0',
      accessTokenField: 'token',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any): Promise<User> {
    const oauthUser = OauthUser.fromFacebook(profile, accessToken);

    return await this.userService.firstOrCreateFromOauthUser(oauthUser);
  }
}
