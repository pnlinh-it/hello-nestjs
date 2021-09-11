import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { Confirmed } from '../../../../decorators/validation/Confirmed';
import { IsOptionalInt } from '../../../../decorators/validation/is-optional-int';
import { IsRequiredString } from '../../../../decorators/validation/is-required-string';

@InputType()
export class RegisterDto {
  @Field()
  @IsEmail()
  @IsRequiredString()
  email: string;

  @IsRequiredString({ minLength: 3 })
  name: string;

  @Field(() => Int)
  @IsOptionalInt()
  age?: number;

  @IsRequiredString({ minLength: 8 })
  password: string;

  @Confirmed('password')
  @IsRequiredString({ minLength: 8 })
  passwordConfirm: string;
}
