import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Auth } from '../../decorators/guards/auth.decorator';
import { User } from '../../decorators/auth/user.decorator';
import { User as UserEntity } from '../../modules/users/entities/user.entity';
import { StrategyEnum } from './strateties/strategy.enum';
import { SendResetPasswordEmailDto } from './dto/password/send-reset-password-email.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() newUser: RegisterDto) {
    return this.authService.register(newUser);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() credential: LoginDto) {
    return this.authService.login(credential);
  }

  @Post('login-passport')
  @HttpCode(HttpStatus.OK)
  @Auth(StrategyEnum.Local)
  // loginPassport(@Req() request: AuthenticatedRequest) {
  loginPassport(@User() user: UserEntity) {
    return this.authService.generateToken(user);
  }

  @Post('oauth/facebook')
  @Auth(StrategyEnum.FacebookToken)
  loginFacebook(@User() user: UserEntity) {
    return user;
  }

  @Post('oauth/google')
  @Auth(StrategyEnum.GoogleToken)
  loginGoogle(@User() user: UserEntity) {
    return user;
  }

  @Post('password/email')
  sendResetLinkEmail(@Body() sendResetPasswordEmail: SendResetPasswordEmailDto) {
    return this.authService.sendResetLinkEmail(sendResetPasswordEmail);
  }
}
