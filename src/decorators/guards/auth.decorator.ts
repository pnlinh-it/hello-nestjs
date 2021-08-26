import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StrategyEnum } from '../../modules/auth/strateties/strategy.enum';

export const Auth = (strategy: StrategyEnum) => UseGuards(AuthGuard(strategy));
