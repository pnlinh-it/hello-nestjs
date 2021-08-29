import { CreateDateColumn, Entity } from 'typeorm';
import { Primary } from '../../../decorators/typeorm/primary';
import { String } from '../../../decorators/typeorm/string';

@Entity('password_resets')
export class PasswordReset {
  @Primary()
  id: number;

  @String('email')
  email: string;

  @String('token')
  token: string;

  @CreateDateColumn()
  createdAt: Date;
}
