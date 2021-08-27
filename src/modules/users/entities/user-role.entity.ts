import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Primary } from '../../../decorators/typeorm/primary';
import { User } from './user.entity';
import { Role } from '../../role/entities/role.entity';

@Entity('user_role')
@Unique(['userId', 'roleId'])
// @Index('user_id_role_id_UNIQUE', ['userId', 'roleId'], { unique: true })
export class UserRole {
  @Primary()
  id: number;

  @Column({ name: 'user_id', type: 'int', unsigned: true })
  userId: number;

  @Column({ name: 'role_id', type: 'int', unsigned: true })
  roleId: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  // https://github.com/typeorm/typeorm/issues/1224#issuecomment-348426495
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  static create(userId: number, roleId: number): Partial<UserRole> {
    return {
      userId: userId,
      roleId: roleId,
    };
  }
}
