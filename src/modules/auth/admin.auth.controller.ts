import { Controller, Get, Redirect, Res } from '@nestjs/common';
import { Auth } from '../../decorators/guards/auth.decorator';
import { StrategyEnum } from './strateties/strategy.enum';
import { User } from '../../decorators/auth/user.decorator';
import { User as UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Controller('admin')
export class AdminAuthController {
  constructor(private authService: AuthService, private readonly userService: UsersService) {}

  @Auth(StrategyEnum.GoogleAdmin)
  @Get('login')
  redirect() {
    return;
  }

  @Auth(StrategyEnum.GoogleAdmin)
  @Get('oauth/google/callback')
  @Redirect('/api/admin/queues')
  async callback(@Res({ passthrough: true }) response, @User() user: UserEntity) {
    await this.userService.hasRole(user.id, 'admin');

    const token = this.authService.generateToken(user);

    response.cookie('Authentication', token);
  }
}
