import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../abs/base-repository';
import { SocialUser } from './entities/social-user.entity';

@EntityRepository(SocialUser)
export class SocialUserRepository extends BaseRepository<SocialUser> {
  findByUid(uid: string, provider: string) {
    return this.findOne({ where: { uid: uid, provider: provider } });
  }
}
