import { IsEmail, IsNotEmpty, IsNumber, IsString, Max, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

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

  //@Type(() => Number)
  @Transform(({ value }) => Number(value))
  @Max(5)
  @IsNumber()
  @IsNotEmpty()
  age: number;
}
