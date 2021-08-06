import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class AnswerDto {
  @MaxLength(255)
  @MinLength(5)
  @IsNotEmpty()
  content: string;
}
