import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user-repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { Not } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(private users: UserRepository) {}

  index() {
    return this.users.find();
  }

  show(id: number) {
    return this.users.findOne(id);
  }

  async store(createUserDto: CreateUserDto) {
    const existUser = await this.users.findOne({ where: { email: createUserDto.email } });

    if (existUser) {
      throw new UnprocessableEntityException('Email is already exist.');
    }

    return this.users.save(createUserDto);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const newUser = await this.users.preload({ ...updateUserDto, id: id });

    if (!newUser) {
      throw new NotFoundException();
    }

    const email = updateUserDto.email;
    if (email != null) {
      const existUser = await this.users.findOne({ where: { email: email, id: Not(id) } });
      if (existUser) {
        throw new UnprocessableEntityException('Email is already exist.');
      }
    }

    return this.users.save(newUser);
  }

  async destroy(id: number) {
    await this.users.delete(id);
  }

  findByEmail(email: string) {
    return this.users.find({ where: { email: email } });
  }
}
