import { IsRequireArray } from '../../../decorators/validation/is-required-array';
import { IsRequiredInt } from '../../../decorators/validation/is-required-int';

export class AssignRolesDto {
  @IsRequiredInt({ min: 1, each: true })
  @IsRequireArray({ minSize: 3, maxSize: 4 })
  roleIds: number[];
}
