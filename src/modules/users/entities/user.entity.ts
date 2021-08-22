import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { Primary } from '../../../decorators/typeorm/primary';
import { String } from '../../../decorators/typeorm/string';

@Entity('users')
export class User {
  @Primary()
  id: number;

  @Column({ name: 'email', type: 'varchar', length: 255, unique: true })
  email: string;

  @String('name')
  name: string;

  @Column({ name: 'age', type: 'mediumint', unsigned: true })
  age: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  isAdmin: boolean;
}
