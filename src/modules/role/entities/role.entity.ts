import { Primary } from '../../../decorators/typeorm/primary';
import { String } from '../../../decorators/typeorm/string';
import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity('roles')
export class Role {
  @Primary()
  id: number;

  @String('name')
  name: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
