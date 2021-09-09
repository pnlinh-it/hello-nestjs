import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import * as _ from 'lodash';
import { In } from 'typeorm';
import { UserRoleRepository } from './user-role-repository';

@Injectable({ scope: Scope.REQUEST })
export class RolesLoader {
  constructor(private readonly userRoleRepository: UserRoleRepository) {}

  public readonly batchUsers = new DataLoader(async (userIds: number[]) => {
    const userRoles = await this.userRoleRepository.find({
      where: { userId: In(userIds) },
      relations: ['role'],
    });

    const userRoleMaps = _.groupBy(userRoles, 'userId');

    return userIds.map((userId) => userRoleMaps[userId]);
  });
}
