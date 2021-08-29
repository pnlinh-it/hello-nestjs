import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';
import { SendResetPasswordEmailDto } from './dto/password/send-reset-password-email.dto';
import { PasswordResetService } from '../password-reset/password-reset.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private passwordResets: PasswordResetService,
    private mailService: MailService,
  ) {}

  async register(newUser: RegisterDto) {
    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    const user = await this.userService.store({ ...newUser, password: hashedPassword });

    return this.generateToken(user);
  }

  async login(credential: LoginDto) {
    const { email, password } = credential;

    const user = await this.userService.findByEmailPassword(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.generateToken(user);
  }

  generateToken(user: User) {
    const payload = { userId: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
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
}
