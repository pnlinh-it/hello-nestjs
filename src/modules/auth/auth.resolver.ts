import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { plainToClassWhitelist } from '../../helper/plain-to-class-whitelist';
import { UserResponseDto } from '../users/dto/reponse/user-response.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/request/login.dto';
import { RegisterDto } from './dto/request/register.dto';
import { RegisterResponseDto } from './dto/response/register-response.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => RegisterResponseDto)
  async login(@Args() credential: LoginDto) {
    const [user, token] = await this.authService.login(credential);

    const userResponse = plainToClassWhitelist(UserResponseDto, user);

    return new RegisterResponseDto(userResponse, token);
  }

  @Mutation(() => RegisterResponseDto)
  async register(@Args('registerDto') registerDto: RegisterDto) {
    const [user, token] = await this.authService.register(registerDto);

    const userResponse = plainToClassWhitelist(UserResponseDto, user);

    return new RegisterResponseDto(userResponse, token);
  }
}
