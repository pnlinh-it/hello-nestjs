import { IsRequired } from '../../../decorators/validation/IsRequired';
import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateQuestionDto } from './create-question.dto';

export class CreateQuizDto {
  @MaxLength(255)
  @IsString()
  @IsRequired()
  name: string;

  @MaxLength(255)
  @IsString()
  @IsRequired()
  description: string;

  // @IsString({ each: true })
  // @IsRequired({ each: true })
  // @ArrayNotEmpty()
  // tags: string[];

  @IsNumber()
  @IsRequired()
  @Type(() => Number)
  type: number;

  @Type(() => CreateQuestionDto)
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @IsArray()
  @IsOptional()
  questions: CreateQuestionDto[];
}
