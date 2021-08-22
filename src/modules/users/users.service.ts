import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInterface } from './interfaces/user.interface';
import { IndexNotFoundException } from '../../exceptions/index-not-found.exception';

@Injectable()
export class UsersService {
  private users: UserInterface[] = [];

  index() {
    return this.users;
  }

  show(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new IndexNotFoundException(id);
    }

    return user;
  }

  store(createUserDto: CreateUserDto) {
    const nextId = this.users.length + 1;

    const newUser = { ...createUserDto, id: nextId, isAdmin: true };

    this.users.push(newUser);

    return newUser;
  }

  update(id: number, patch: Partial<CreateUserDto>) {
    const matcher = (user) => user.id === id;

    const user = this.users.find((user) => matcher(user));
    const index = this.users.findIndex((user) => matcher(user));

    if (!user) {
      throw new NotFoundException();
    }

    const newUser = { ...user, ...patch };

    this.users.splice(index, 1);

    this.users.push(newUser);

    return newUser;
  }

  destroy(id: number) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index < 0) {
      throw new NotFoundException();
    }

    this.users.splice(index, 1);
  }

  findByEmail(email: string): UserInterface | undefined {
    return this.users.find((user) => user.email === email);
  }
}
