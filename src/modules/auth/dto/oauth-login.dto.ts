import { IsRequired } from '../../../decorators/validation/IsRequired';
import { IsString, MinLength } from 'class-validator';

export class OauthLoginDto {
  @MinLength(10)
  @IsString()
  @IsRequired()
  token: string;
}
