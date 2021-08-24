import { Column, CreateDateColumn, Entity, OneToMany, UpdateDateColumn } from 'typeorm';
import { Primary } from '../../../decorators/typeorm/primary';
import { String } from '../../../decorators/typeorm/string';
import { UserRole } from './user-role.entity';
import { SocialUser } from './social-user.entity';

@Entity('users')
export class User {
  @Primary()
  id: number;

  @Column({ name: 'email', type: 'varchar', length: 255, unique: true, nullable: true })
  email: string;

  @Column({ name: 'username', type: 'varchar', length: 255, unique: true })
  username: string;

  @String('name')
  name: string;

  @Column({ name: 'age', type: 'mediumint', unsigned: true, nullable: true })
  age: number;

  @String('password')
  password: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];

  @OneToMany(() => SocialUser, (socialUser) => socialUser.user)
  socialUsers: SocialUser[];

  public get roles() {
    return this.userRoles?.map((userRole) => userRole.role) || [];
  }

  isAdmin: boolean;
}
