import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { plainToClassWhitelist } from '../../helper/plain-to-class-whitelist';
import { RoleResponseDto } from '../role/dto/response/role-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UserResponseDto } from './dto/reponse/user-response.dto';
import { RolesLoader } from './roles.loader';
import { UsersService } from './users.service';

@Resolver(() => UserResponseDto)
export class UserResolver {
  constructor(
    private readonly userService: UsersService,
    private readonly rolesLoader: RolesLoader,
  ) {}

  @Query(() => [UserResponseDto])
  async users(@Args() queryUser: QueryUserDto): Promise<UserResponseDto[]> {
    const users = await this.userService.index();

    return users.map((user) => plainToClassWhitelist(UserResponseDto, user));
  }

  @Query(() => UserResponseDto, { name: 'user', nullable: true })
  async getUser(@Args('id', { type: () => Int }) id: number): Promise<UserResponseDto> {
    const user = await this.userService.findById(id, []);

    return plainToClassWhitelist(UserResponseDto, user);
  }

  @ResolveField(() => [RoleResponseDto])
  async roles(@Parent() user: UserResponseDto): Promise<RoleResponseDto[]> {
    const userRoles = await this.rolesLoader.batchUsers.load(user.id);

    return (
      userRoles?.map((userRole) => plainToClassWhitelist(RoleResponseDto, userRole.role)) || []
    );
  }

  @Mutation(() => UserResponseDto)
  createUser(@Args('createUser') createUser: CreateUserDto) {}
}
