import { PartialType } from '@nestjs/mapped-types';
import { AssignRolesDto } from './assign-roles.dto';

export class UpdateUserRoleDto extends PartialType(AssignRolesDto) {}
