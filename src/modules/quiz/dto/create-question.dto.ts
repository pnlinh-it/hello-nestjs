import { IsRequired } from '../../../decorators/validation/IsRequired';
import { IsString, MaxLength } from 'class-validator';

export class CreateQuestionDto {
  @MaxLength(255)
  @IsString()
  @IsRequired()
  content: string;
}
