import { Module } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordResetRepository } from './password-reset-repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([PasswordResetRepository])],
  providers: [PasswordResetService],
  exports: [PasswordResetService],
})
export class PasswordResetModule {}
