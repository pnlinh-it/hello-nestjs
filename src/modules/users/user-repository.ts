import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../abs/base-repository';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {}
