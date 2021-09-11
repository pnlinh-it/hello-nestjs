import { ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { UserResponseDto } from '../../../users/dto/reponse/user-response.dto';

@ObjectType()
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
