import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AnswerDto {
  @MaxLength(255)
  @MinLength(5)
  @IsNotEmpty()
  @Length(1, 12)
  content: string;

  @ArrayMaxSize(4)
  @ArrayMinSize(2)
  @ArrayNotEmpty()
  @IsArray()
  skills: string[];
}
