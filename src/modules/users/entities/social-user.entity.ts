import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from 'typeorm';
import { Primary } from '../../../decorators/typeorm/primary';
import { String } from '../../../decorators/typeorm/string';
import { Provider } from '../../auth/oauth/provider';
import { User } from './user.entity';
import { OauthUser } from '../../auth/oauth/oauth-user';

@Entity('social_users')
export class SocialUser {
  @Primary()
  id: number;

  @String('provider')
  provider: Provider;

  @String('uid')
  uid: string;

  @Column({ name: 'user_id', type: 'int', unsigned: true })
  userId: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  public static fromOauthUser(oauthUser: OauthUser, userId: number): Partial<SocialUser> {
    return {
      provider: oauthUser.provider,
      uid: oauthUser.uid,
      userId: userId,
    };
  }
}
