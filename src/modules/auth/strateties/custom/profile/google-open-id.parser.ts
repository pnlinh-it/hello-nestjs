/**
 * Parse profile.
 *
 * Parses user profiles as fetched from Google's Google+ API.
 *
 * The amount of detail in the profile varies based on the scopes granted by the
 * user.  The following scope values add additional data:
 *
 *     `https://www.googleapis.com/auth/plus.login` - recommended login scope
 *     `profile` - basic profile information
 *     `email` - email address
 *
 * References:
 *   - https://developers.google.com/+/web/api/rest/latest/people/get
 *   - https://developers.google.com/+/web/api/rest/
 *   - https://developers.google.com/+/web/api/rest/oauth
 *
 * @param {object|string} json
 * @return {object}
 * @access public
 */
import { Profile } from 'passport';

export class GoogleOpenIdParser {
  static parse(json) {
    if ('string' == typeof json) {
      json = JSON.parse(json);
    }

    const id = json.sub;
    const displayName = json.name;

    const profile: Profile = {
      id: id,
      provider: 'google',
      displayName: displayName,
    };

    if (json.family_name || json.given_name) {
      profile.name = { familyName: json.family_name, givenName: json.given_name };
    }
    if (json.email) {
      profile.emails = [{ value: json.email }];
    }
    if (json.picture) {
      profile.photos = [{ value: json.picture }];
    }

    return profile;
  }
}
