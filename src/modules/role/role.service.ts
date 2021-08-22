import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleRepository } from './role-repository';

@Injectable()
export class RoleService {
  constructor(private roles: RoleRepository) {}

  create(createRoleDto: CreateRoleDto) {
    return this.roles.save(createRoleDto);
  }

  findAll() {
    return this.roles.find();
  }

  findOne(id: number) {
    return this.roles.findOne(id);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const newRole = await this.roles.preload({ ...updateRoleDto, id: id });

    if (!newRole) {
      throw new NotFoundException();
    }

    return this.roles.save(newRole, { transaction: false });
  }

  async remove(id: number) {
    await this.roles.delete(id);
  }
}
