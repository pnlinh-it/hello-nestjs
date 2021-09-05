import { IsRequiredString } from '../../../decorators/validation/is-required-string';

export class OauthLoginDto {
  @IsRequiredString()
  token: string;
}
