import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNumber } from 'class-validator';

export class AssignRolesDto {
  @Type(() => Number)
  @IsNumber({ allowNaN: false }, { each: true })
  @IsArray()
  @ArrayNotEmpty()
  roleIds: number[];
}
