import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../abs/base-repository';
import { UserRole } from './entities/user-role.entity';

@EntityRepository(UserRole)
export class UserRoleRepository extends BaseRepository<UserRole> {}
