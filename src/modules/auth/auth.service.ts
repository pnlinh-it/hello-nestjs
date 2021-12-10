import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { MailService } from '../mail/mail.service';
import { PasswordResetService } from '../password-reset/password-reset.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { SendResetPasswordEmailDto } from './dto/request/send-reset-password-email.dto';
import { LoginDto } from './dto/request/login.dto';
import { RegisterDto } from './dto/request/register.dto';
import { TokenPayload } from './token-payload';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../config/app-config';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService<AppConfig>,
    private userService: UsersService,
    private jwtService: JwtService,
    private passwordResets: PasswordResetService,
    private mailService: MailService,
  ) {}

  async register(newUser: RegisterDto): Promise<[User, string]> {
    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    const user = await this.userService.store({ ...newUser, password: hashedPassword });

    const token = this.generateToken(user);

    return [plainToClass(User, user), token];
  }

  async login(credential: LoginDto): Promise<[User, string]> {
    const { email, password } = credential;

    const user = await this.userService.findByEmailPassword(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    const token = this.generateToken(user);

    return [plainToClass(User, user), token];
  }

  generateToken(user: User) {
    const payload: TokenPayload = { userId: user.id };

    return this.jwtService.sign(payload);
  }

  async sendResetLinkEmail({ email }: SendResetPasswordEmailDto) {
    const resetToken = await this.passwordResets.create(email);

    await this.mailService.send({
      to: email,
      subject: 'Test from NestJS',
      template: __dirname + `/templates/reset-password.template.hbs`,
      context: { resetToken: resetToken },
    });
  }

  verifyJwt(token?: string): number {
    if (!token) return 0;

    try {
      const { userId }: TokenPayload = this.jwtService.verify(token, {
        secret: this.configService.get('jwtKey'),
      });
      return userId;
    } catch (exception) {
      return 0;
    }
  }

  async findUserByJwt(token?: string) {
    try {
      const userId = this.verifyJwt(token);
      if (!userId) {
        return null;
      }
      return await this.userService.findById(userId);
    } catch (exception) {
      return null;
    }
  }
}
