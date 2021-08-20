import { SetMetadata, UseGuards } from '@nestjs/common';
import { DECORATOR_ROLE_KEY } from '../../constant/constant';
import { Role } from '../../modules/users/role';

export const Roles = (...roles: Role[]) => SetMetadata(DECORATOR_ROLE_KEY, roles);
