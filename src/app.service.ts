import { Injectable } from '@nestjs/common';
import { UsersService } from './modules/users/users.service';

@Injectable()
export class AppService {
  constructor(private readonly userService: UsersService) {}

  getHello(): string {
    return 'Hello World!';
  }
}
