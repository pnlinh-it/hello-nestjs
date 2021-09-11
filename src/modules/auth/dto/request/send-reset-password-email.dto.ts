import { IsEmail } from 'class-validator';
import { IsRequiredString } from '../../../../decorators/validation/is-required-string';

export class SendResetPasswordEmailDto {
  @IsEmail()
  @IsRequiredString()
  email: string;
}
