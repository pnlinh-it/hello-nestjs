import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';
import { StrategyEnum } from './strategy.enum';

@Injectable()
// This class must be instantiate while application start
// Typically, to instantiate while application start we add into Module providers
export class LocalStrategy extends PassportStrategy(Strategy, StrategyEnum.Local) {
  constructor(private userService: UsersService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    return await this.userService.findByEmailPassword(email, password);
  }
}
