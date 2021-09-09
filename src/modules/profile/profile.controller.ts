import { Controller, Get } from '@nestjs/common';
import { User as UserEntity } from '../../modules/users/entities/user.entity';
import { User } from '../../decorators/auth/user.decorator';
import { Auth } from '../../decorators/guards/auth.decorator';
import { StrategyEnum } from '../auth/strateties/strategy.enum';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserResponseDto } from '../users/dto/reponse/user-response.dto';
import { plainToClassWhitelist } from '../../helper/plain-to-class-whitelist';

@Controller('profile')
@ApiTags('profile')
@Auth(StrategyEnum.JWT)
@ApiBearerAuth()
export class ProfileController {
  @Get()
  @ApiUnauthorizedResponse()
  profile(@User() user: UserEntity) {
    return plainToClassWhitelist(UserResponseDto, user);
  }
}
