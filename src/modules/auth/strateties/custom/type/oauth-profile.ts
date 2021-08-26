import { Profile } from 'passport';

export interface OauthProfile extends Profile {
  gender?: string;
  _raw?: string;
  _json?: any;
}
