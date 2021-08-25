import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user-repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { Like, Not } from 'typeorm';
import { AssignRolesDto } from './dto/assign-roles.dto';
import { RoleRepository } from '../role/role-repository';
import { UserRoleRepository } from './user-role-repository';
import { UserRole } from './entities/user-role.entity';
import * as bcrypt from 'bcrypt';
import { OauthUser } from '../auth/oauth/oauth-user';
import { SocialUserRepository } from './social-user-repository';
import { SocialUser } from './entities/social-user.entity';
import slugify from 'slugify';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    private users: UserRepository,
    private roles: RoleRepository,
    private userRoles: UserRoleRepository,
    private socialUsers: SocialUserRepository,
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

    const username = await this.generateUsername(createUserDto.name);

    return this.users.save({ ...createUserDto, username: username });
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
    return this.users.findOne({ where: { email: email } });
  }

  async findByEmailPassword(email: string, password: string) {
    const user = await this.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return null;
    }

    return user;
  }

  findById(id: number, relations = ['userRoles', 'userRoles.role']) {
    return this.users.findOne(id, { relations: relations });
  }

  async firstOrCreateFromOauthUser(oauthUser: OauthUser) {
    const { uid, provider, email } = oauthUser;

    const socialUser = await this.socialUsers.findByUid(uid, provider);

    if (socialUser) {
      return await this.users.findOne(socialUser.userId);
    }

    if (email) {
      const user = await this.findByEmail(email);
      if (user) {
        await this.socialUsers.insertWithoutReload(SocialUser.fromOauthUser(oauthUser, user.id));
        return user;
      }
    }

    const randomPassword = crypto.randomBytes(20).toString('hex');
    const hashedPassword = await bcrypt.hash(randomPassword, 10);
    const username = await this.generateUsername(oauthUser.fullName);
    const newUserPayload: Partial<CreateUserDto> = {
      email: oauthUser.email,
      name: oauthUser.fullName,
      password: hashedPassword,
    };

    const newUser = await this.users.save({ ...newUserPayload, username: username });

    await this.socialUsers.insertWithoutReload(SocialUser.fromOauthUser(oauthUser, newUser.id));

    return newUser;
  }

  async generateUsername(displayName: string) {
    const username = slugify(displayName, { replacement: '_', lower: true, strict: true });

    return await this.makeSureUsernameIsUnique(username);
  }

  async makeSureUsernameIsUnique(username: string) {
    const existUser = await this.users.findOne({ where: { username: username } });
    if (!existUser) {
      return username;
    }

    let usernameNumber = 1;
    let newUsername = username;

    const existUsers = await this.users.find({
      select: ['username'],
      where: { username: Like(`%${username}%`) },
    });

    const existUserNames = existUsers.map((user) => user.username);

    while (existUserNames.includes(newUsername)) {
      newUsername = `${username}${usernameNumber}`;
      usernameNumber++;
    }

    return newUsername;
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
