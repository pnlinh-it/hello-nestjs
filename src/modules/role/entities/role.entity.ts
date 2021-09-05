import { Primary } from '../../../decorators/typeorm/primary';
import { String } from '../../../decorators/typeorm/string';
import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity('roles')
export class Role {
  @Primary()
  id: number;

  @String('name')
  name: string;

  @ApiHideProperty()
  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @ApiHideProperty()
  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
