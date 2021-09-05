import { IsEmail } from 'class-validator';
import { Confirmed } from '../../../decorators/validation/Confirmed';
import { IsRequiredString } from '../../../decorators/validation/is-required-string';
import { IsOptionalInt } from '../../../decorators/validation/is-optional-int';

export class RegisterDto {
  @IsEmail()
  @IsRequiredString()
  email: string;

  @IsRequiredString({ minLength: 3 })
  name: string;

  @IsOptionalInt()
  age?: number;

  @IsRequiredString({ minLength: 8 })
  password: string;

  @Confirmed('password')
  @IsRequiredString({ minLength: 8 })
  passwordConfirm: string;
}
