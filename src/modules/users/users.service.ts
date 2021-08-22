import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user-repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { Not } from 'typeorm';
import { AssignRolesDto } from './dto/assign-roles.dto';
import { RoleRepository } from '../role/role-repository';
import { UserRoleRepository } from './user-role-repository';
import { UserRole } from './entities/user-role.entity';

@Injectable()
export class UsersService {
  constructor(
    private users: UserRepository,
    private roles: RoleRepository,
    private userRoles: UserRoleRepository,
  ) {}

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

  async assignRoles(userId: number, { roleIds }: AssignRolesDto) {
    const user = await this.users.findOneOrFail(userId);
    const userRoles = await this.userRoles.find({ select: ['roleId'], where: { userId: userId } });
    const currentRoleIds = userRoles.map((userRole) => userRole.roleId);
    const diffRoleIds = roleIds.filter((roleId) => !currentRoleIds.includes(roleId));
    const insertUserRoles = diffRoleIds.map((roleId) => UserRole.create(userId, roleId));
    await this.userRoles.insertWithoutReload(insertUserRoles);

    return this.users.findOne(user.id, {
      relations: ['userRoles', 'userRoles.role'],
    });
  }
}
