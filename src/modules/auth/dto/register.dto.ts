import { IsRequired } from '../../../decorators/validation/IsRequired';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Confirmed } from '../../../decorators/validation/Confirmed';

export class RegisterDto {
  @MaxLength(100)
  @IsEmail()
  @IsString()
  @IsRequired()
  email: string;

  @MaxLength(100)
  @MinLength(5)
  @IsString()
  @IsRequired()
  name: string;

  @Type(() => Number)
  @Max(200)
  @Min(1)
  @IsInt()
  @IsOptional()
  age: number;

  @MaxLength(50)
  @MinLength(8)
  @IsString()
  @IsRequired()
  password: string;

  @MaxLength(50)
  @MinLength(8)
  @Confirmed('password')
  @IsString()
  @IsRequired()
  passwordConfirm: string;
}
