import { Column, CreateDateColumn, Entity, OneToMany, UpdateDateColumn } from 'typeorm';
import { Primary } from '../../../decorators/typeorm/primary';
import { String } from '../../../decorators/typeorm/string';
import { UserRole } from './user-role.entity';
import { SocialUser } from './social-user.entity';
import { Expose } from 'class-transformer';

@Entity('users')
export class User {
  @Primary()
  @Expose()
  id: number;

  @Column({ name: 'email', type: 'varchar', length: 255, unique: true, nullable: true })
  @Expose()
  email: string;

  @Column({ name: 'username', type: 'varchar', length: 255, unique: true })
  @Expose()
  username: string;

  @String('name')
  @Expose()
  name: string;

  @Column({ name: 'age', type: 'mediumint', unsigned: true, nullable: true })
  @Expose()
  age: number;

  @String('password')
  password: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  @Expose({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  @Expose({ name: 'updated_at' })
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
