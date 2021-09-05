import { Expose, Type } from 'class-transformer';
import { RoleResponseDto } from '../../../role/dto/response/role-response.dto';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  username: string;

  @Expose()
  name: string;

  @Expose()
  age?: number;

  @Expose()
  @Type(() => RoleResponseDto)
  roles: RoleResponseDto[];
}
