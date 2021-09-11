import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/request/login.dto';
import { Auth } from '../../decorators/guards/auth.decorator';
import { User } from '../../decorators/auth/user.decorator';
import { User as UserEntity } from '../../modules/users/entities/user.entity';
import { StrategyEnum as Strategy } from './strateties/strategy.enum';
import { SendResetPasswordEmailDto } from './dto/request/send-reset-password-email.dto';
import {
  ApiNotFoundResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { RegisterResponseDto } from './dto/response/register-response.dto';
import { OauthLoginDto } from './dto/request/oauth-login.dto';
import { UserResponseDto } from '../users/dto/reponse/user-response.dto';
import { plainToClassWhitelist } from '../../helper/plain-to-class-whitelist';
import { RegisterDto } from './dto/request/register.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /** Register new user */
  @Post('register')
  @ApiUnprocessableEntityResponse()
  async register(@Body() newUser: RegisterDto) {
    const [user, token] = await this.authService.register(newUser);

    const userResponse = plainToClassWhitelist(UserResponseDto, user);

    return new RegisterResponseDto(userResponse, token);
  }

  /** Login new user */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse()
  async login(@Body() credential: LoginDto) {
    const [user, token] = await this.authService.login(credential);

    const userResponse = plainToClassWhitelist(UserResponseDto, user);

    return new RegisterResponseDto(userResponse, token);
  }

  @Post('login-passport')
  @HttpCode(HttpStatus.OK)
  @Auth(Strategy.Local)
  @ApiUnauthorizedResponse()
  @ApiUnprocessableEntityResponse()
  // loginPassport(@Req() request: AuthenticatedRequest) {
  loginPassport(@Body() credential: LoginDto, @User() user: UserEntity) {
    const token = this.authService.generateToken(user);

    const userResponse = plainToClassWhitelist(UserResponseDto, user);

    return new RegisterResponseDto(userResponse, token);
  }

  @Post('oauth/facebook')
  @HttpCode(HttpStatus.OK)
  @Auth(Strategy.FacebookToken)
  @ApiUnauthorizedResponse()
  @ApiUnprocessableEntityResponse()
  loginFacebook(@Body() oauthLoginDto: OauthLoginDto, @User() user: UserEntity) {
    const token = this.authService.generateToken(user);

    const userResponse = plainToClassWhitelist(UserResponseDto, user);

    return new RegisterResponseDto(userResponse, token);
  }

  @Post('oauth/google')
  @HttpCode(HttpStatus.OK)
  @Auth(Strategy.GoogleToken)
  @ApiUnauthorizedResponse()
  @ApiUnprocessableEntityResponse()
  loginGoogle(@Body() oauthLoginDto: OauthLoginDto, @User() user: UserEntity) {
    const token = this.authService.generateToken(user);

    const userResponse = plainToClassWhitelist(UserResponseDto, user);

    return new RegisterResponseDto(userResponse, token);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('password/email')
  @ApiNotFoundResponse()
  @ApiUnprocessableEntityResponse()
  @ApiTooManyRequestsResponse()
  async sendResetLinkEmail(@Body() sendResetPasswordEmail: SendResetPasswordEmailDto) {
    await this.authService.sendResetLinkEmail(sendResetPasswordEmail);
  }
}
