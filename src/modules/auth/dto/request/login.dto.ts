import { IsRequired } from '../../../../decorators/validation/IsRequired';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class LoginDto {
  @MaxLength(100)
  @IsEmail()
  @IsString()
  @IsRequired()
  email: string;

  @MaxLength(50)
  @MinLength(8)
  @IsString()
  @IsRequired()
  password: string;
}
