import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../abs/base-repository';
import { PasswordReset } from './entities/password-reset';

@EntityRepository(PasswordReset)
export class PasswordResetRepository extends BaseRepository<PasswordReset> {}
