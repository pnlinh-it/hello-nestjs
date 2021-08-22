import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../abs/base-repository';
import { Role } from './entities/role.entity';

@EntityRepository(Role)
export class RoleRepository extends BaseRepository<Role> {}
