import { Expose } from 'class-transformer';
import { UserResponseDto } from './user-response.dto';

export class RegisterResponseDto {
  @Expose()
  user: UserResponseDto;

  @Expose()
  accessToken: string;

  constructor(user: UserResponseDto, accessToken: string) {
    this.user = user;
    this.accessToken = accessToken;
  }
}
