import {
  IsEmail,
  isIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MaxLength(20, {
    message: 'Title is too long',
    context: {
      errorCode: 1003,
      developerNote: 'Some additional note.',
    },
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => Number)
  @Max(5)
  @IsNumber()
  @IsNotEmpty()
  age: number;
}
