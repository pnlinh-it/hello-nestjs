import { Field, HideField, ID, Int, ObjectType } from '@nestjs/graphql';
import { Expose, Type } from 'class-transformer';
import { RoleResponseDto } from '../../../role/dto/response/role-response.dto';

@ObjectType()
export class UserResponseDto {
  @Field(() => ID)
  @Expose()
  id: number;

  @Expose()
  email?: string;

  @Expose()
  username: string;

  @Expose()
  name: string;

  @Expose()
  age?: number;

  @HideField()
  @Expose()
  @Type(() => RoleResponseDto)
  roles: RoleResponseDto[];
}
