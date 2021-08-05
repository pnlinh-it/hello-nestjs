import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  email: string;

  @MaxLength(20, {
    message:
      'Title is too long. Maximal length is $constraint1 characters, but actual is $value',
    context: {
      errorCode: 1003,
      developerNote: 'The validated string must contain 32 or more characters.',
    },
  })
  @IsString()
  name: string;

  @Max(5)
  @IsNumber()
  @IsNotEmpty()
  age: number;
}
