import { IsRequired } from '../../../decorators/validation/IsRequired';
import { IsString, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @MaxLength(255)
  @IsString()
  @IsRequired()
  name: string;
}
