import * as OAuth2Strategy from 'passport-oauth2';
import { InternalOAuthError } from 'passport-oauth2';
import { Request } from 'express';
import { GoogleOpenIdParser } from './profile/google-open-id.parser';
import { OauthProfile } from './type/oauth-profile';

interface Temp {
  fail(error: any);
  error(...args: any[]);
  success(...args: any[]);
  _loadUserProfile(...args: any[]);
  _verify(...args: any[]);
}

const defaultAuthorizationUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
const defaultTokenUrl = 'https://www.googleapis.com/oauth2/v4/token';
const userProfileTokenUrl = 'https://www.googleapis.com/oauth2/v3/userinfo';
type OauthError = { statusCode: number; data?: any };

export class MyCustomGoogleStrategy extends OAuth2Strategy {
  constructor(options, verify) {
    options = options || {};
    options.authorizationURL = options.authorizationURL || defaultAuthorizationUrl;
    options.tokenURL = options.tokenURL || defaultTokenUrl;
    super(options, verify);
    this.name = 'google-token';
  }

  authenticate(req: Request, options?: any) {
    const accessToken = this.lookup(req, 'token');
    const self = this as unknown as Temp;
    if (!accessToken) {
      return self.fail({ message: `You should provide token.` });
    }

    self._loadUserProfile(accessToken, (error, profile) => {
      if (error) {
        return self.error(error);
      }

      const verified = (error, user, info) => {
        if (error) return self.error(error);
        if (!user) return self.fail(info);

        return self.success(user, info);
      };

      self._verify(accessToken, 'refreshToken', profile, verified);
    });
  }

  userProfile(accessToken, done) {
    this._oauth2.get(userProfileTokenUrl, accessToken, function (err: OauthError, body?: string) {
      if (err) {
        return done(new InternalOAuthError('Failed to fetch user profile', err));
      }

      const json = MyCustomGoogleStrategy.safetyParse(body);
      if (!json) {
        return done(new Error('Failed to parse user profile'));
      }

      const profile: OauthProfile = GoogleOpenIdParser.parse(json);

      profile._raw = body;
      profile._json = json;

      done(null, profile);
    });
  }

  private static safetyParse(json) {
    try {
      return JSON.parse(json);
    } catch (e) {
      return null;
    }
  }

  lookup(req, field) {
    return (
      (req.body && req.body[field]) ||
      (req.query && req.query[field]) ||
      (req.headers && (req.headers[field] || req.headers[field.toLowerCase()])) ||
      this.parseOAuth2Token(req)
    );
  }

  parseOAuth2Token(req) {
    const OAuth2AuthorizationField = 'Authorization';
    const headerValue =
      req.headers &&
      (req.headers[OAuth2AuthorizationField] ||
        req.headers[OAuth2AuthorizationField.toLowerCase()]);

    return (
      headerValue &&
      (() => {
        const bearerRE = /Bearer (.*)/;
        const match = bearerRE.exec(headerValue);
        return match && match[1];
      })()
    );
  }
}
