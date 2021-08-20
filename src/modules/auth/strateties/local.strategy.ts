import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
// This class must be instantiate while application start
// Typically, to instantiate while application start we add into Module providers
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    return { userId: 12, username: 'Linh' };
  }
}
