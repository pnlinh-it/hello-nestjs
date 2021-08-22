import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AttemptDto } from './attempt.dto';

export class AttemptsDto {
  @Type(() => AttemptDto)
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @IsArray({ each: false })
  attempts: AttemptDto[];
}
