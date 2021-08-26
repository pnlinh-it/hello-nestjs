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

  public static fromRaw(profile: any, accessToken: string, provider: Provider): OauthUser {
    return {
      uid: profile.id,
      accessToken: accessToken,
      provider: provider,
      fullName: profile.displayName,
      email: profile.emails?.[0]?.value,
      avatar: profile.photos?.[0]?.value,
      raw: profile,
    };
  }
}
