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

import { OauthProfile } from '../type/oauth-profile';

export class GooglePlusParser {
  static parse(json) {
    if ('string' == typeof json) {
      json = JSON.parse(json);
    }

    const id = json.id;
    const displayName = json.displayName;
    const gender = json.gender;

    const profile: OauthProfile = {
      id: id,
      provider: 'google',
      displayName: displayName,
      gender: gender,
    };

    if (json.name) {
      profile.name = { familyName: json.name.familyName, givenName: json.name.givenName };
    }

    if (json.emails) {
      const emails = [];
      for (const email of emails) {
        emails.push({ value: email.value, type: email.type });
      }
      profile.emails = emails;
    }

    if (json.image) {
      profile.photos = [{ value: json.image.url }];
    }

    return profile;
  }
}
