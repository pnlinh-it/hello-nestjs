import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const Auth = (strategy: 'local' | 'jwt' | 'facebook-token') =>
  UseGuards(AuthGuard(strategy));
