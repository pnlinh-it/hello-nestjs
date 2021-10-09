import { Expose } from 'class-transformer';
import { PageOptionDto } from '../../../../common/dtos/paging-meta.dto';
import { UserResponseDto } from './user-response.dto';

export class UsersReponseDto {
  @Expose()
  items: UserResponseDto[];

  @Expose()
  meta: PageOptionDto;

  constructor(users: UserResponseDto[], pageOption: PageOptionDto) {
    this.items = users;
    this.meta = pageOption;
  }
}
