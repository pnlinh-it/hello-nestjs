import { Strategy } from 'passport-google-oauth20';
import { Request } from 'express';

interface Temp {
  fail(error: any);
  error(...args: any[]);
  success(...args: any[]);
  _loadUserProfile(...args: any[]);
  _verify(...args: any[]);
}

export class PassportGoogleStrategy extends Strategy {
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

      if (super._passReqToCallback) {
        self._verify(req, accessToken, 'refreshToken', profile, verified);
      } else {
        self._verify(accessToken, 'refreshToken', profile, verified);
      }
    });
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
