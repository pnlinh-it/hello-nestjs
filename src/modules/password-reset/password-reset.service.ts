import { Injectable, NotFoundException } from '@nestjs/common';
import { PasswordResetRepository } from './password-reset-repository';
import { UsersService } from '../users/users.service';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { Between } from 'typeorm';
import { differenceInSeconds, subSeconds } from 'date-fns';
import { TooManyRequestException } from '../../exceptions/too-many-request-exception';
import { ConfigService } from '@nestjs/config';
import { Auth } from '../../config/types/auth';
import { AppConfig } from '../../config/app-config';

@Injectable()
export class PasswordResetService {
  constructor(
    private passwordResets: PasswordResetRepository,
    private users: UsersService,
    private configService: ConfigService<AppConfig>,
  ) {}

  async create(email: string) {
    const user = await this.users.findByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }

    await this.checkRecentlyCreated(email);

    await this.passwordResets.delete({ email: email });

    const resetToken = PasswordResetService.createResetToken();

    const hashedToken = await bcrypt.hash(resetToken, 10);

    await this.passwordResets.insertWithoutReload({ email: email, token: hashedToken });

    return resetToken;
  }

  async checkRecentlyCreated(email: string) {
    const now = new Date();
    const from = subSeconds(now, this.configService.get<Auth>('auth').passwordThrottle);

    const passwordReset = await this.passwordResets.findOne({
      where: {
        email: email,
        createdAt: Between(from, now),
      },
    });

    if (passwordReset) {
      const availableAt = differenceInSeconds(now, passwordReset.createdAt);
      throw new TooManyRequestException(`Please try after ${availableAt} seconds`);
    }
  }

  private static createResetToken() {
    return crypto.randomBytes(32).toString('hex');
  }
}
