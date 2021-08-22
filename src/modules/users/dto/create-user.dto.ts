import { IsEmail, IsNumber, IsString, Max, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { IsRequired } from '../../../decorators/validation/IsRequired';

export class CreateUserDto {
  @MaxLength(255)
  @IsEmail()
  @IsString()
  @IsRequired()
  email: string;

  @MaxLength(100, {
    message: 'Name is too long',
    context: {
      errorCode: 1003,
      developerNote: 'Some additional note.',
    },
  })
  @IsString()
  @IsRequired()
  name: string;

  @Type(() => Number)
  @Max(200)
  @Min(0)
  @IsNumber()
  @IsRequired()
  age: number;
}
