import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { IsRequired } from '../../../decorators/validation/IsRequired';

export class AttemptDto {
  @Type(() => Number)
  @IsNumber({ allowNaN: false })
  @IsRequired()
  quizQuestionId: number;

  @Type(() => Number)
  @IsRequired()
  answerId: number;
}
