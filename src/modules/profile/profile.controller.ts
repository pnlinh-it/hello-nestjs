import { Controller, Get } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { User as UserEntity } from '../../modules/users/entities/user.entity';
import { User } from '../../decorators/auth/user.decorator';
import { Auth } from '../../decorators/guards/auth.decorator';

@Controller('profile')
@Auth('jwt')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  profile(@User() user: UserEntity) {
    return user;
  }
}
