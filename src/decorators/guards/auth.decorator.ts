import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const Auth = (strategy: 'local' | 'jwt') => UseGuards(AuthGuard(strategy));
