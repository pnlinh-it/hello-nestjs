import { IsRequireArray } from 'src/decorators/validation/is-required-array';
import { IsRequiredInt } from 'src/decorators/validation/is-required-int';

export class AssignRolesDto {
  @IsRequiredInt({ min: 1, each: true })
  @IsRequireArray({ minSize: 3, maxSize: 4 })
  roleIds: number[];
}
