import { ArrayNotEmpty, IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateQuizQuestionDto {
  @Type(() => Number)
  @IsNumber({ allowNaN: false }, { each: true })
  @ArrayNotEmpty()
  @IsArray()
  questionIds: number[];
}
