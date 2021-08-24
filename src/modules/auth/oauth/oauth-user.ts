/**
 * The class represent oauth user fetch from 3rd service such as Facebook, Google
 */
import { Provider } from './provider';

export class OauthUser {
  uid: string;
  accessToken: string;
  provider: Provider;
  fullName: string;
  email?: string;
  avatar?: string;
  raw: any;

  public static fromFacebook(profile: any, accessToken: string): OauthUser {
    return {
      uid: profile.id,
      accessToken: accessToken,
      provider: Provider.Facebook,
      fullName: profile.displayName,
      email: profile.emails?.[0]?.value,
      avatar: profile.photos?.[0]?.value,
      raw: profile,
    };
  }
}
