import { IsEmail, IsString, MaxLength } from 'class-validator';
import { IsRequired } from '../../../../decorators/validation/IsRequired';

export class SendResetPasswordEmailDto {
  @IsEmail()
  @MaxLength(255)
  @IsString()
  @IsRequired()
  email: string;
}
