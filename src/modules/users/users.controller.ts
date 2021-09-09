import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { CheckUserGuard } from '../../guards/check-user.guard';
import { Auth } from '../../decorators/guards/auth.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AssignRolesDto } from './dto/assign-roles.dto';
import { StrategyEnum } from '../auth/strateties/strategy.enum';
import { Roles } from '../../decorators/guards/role.decorator';
import { Role } from './role';
import { IsPublic } from '../../decorators/guards/is-public.decorator';
import { UserResponseDto } from './dto/reponse/user-response.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { IntParam } from '../../decorators/http/int-param.decorator';
import { plainToClassWhitelist } from '../../helper/plain-to-class-whitelist';

@Roles(Role.Admin)
@UseGuards(CheckUserGuard)
@Auth(StrategyEnum.JWT)
@ApiTags('users')
@ApiBearerAuth()
@ApiForbiddenResponse()
@ApiUnauthorizedResponse()
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @IsPublic()
  @Get()
  async index() {
    const users = await this.userService.index();

    return users.map((user) => plainToClassWhitelist(UserResponseDto, user));
  }

  /**
   * When we use Express object by using decorator @Req, @Res
   * We have responsibility to handle response by using that object
   * Or we use option: passthrough: true
   */
  @Get('manual')
  indexManualHandle(@Req() request: Request, @Res() response: Response) {
    response.send(this.userService.index());
  }

  @Get('through')
  indexPassThrough(@Res({ passthrough: true }) response: Response) {
    response.status(HttpStatus.OK);
    return this.userService.index();
  }

  @Get('redirect')
  @Redirect('https://nestjs.com', HttpStatus.MOVED_PERMANENTLY)
  redirect(@Query('version') version) {
    if (version === '-1') {
      return 'https://docs.nestjs.com';
    }
  }

  @Roles(Role.Admin, Role.User)
  @Get(':id')
  async show(@IntParam('id') id: number) {
    const user = await this.userService.show(id);

    return plainToClassWhitelist(UserResponseDto, user);
  }

  /**
   * This doesn't accept form-data 🤔
   * Use x-www-url-form-encoded or application/json along with the raw
   * https://stackoverflow.com/a/61087718/14284081
   */
  @Post()
  @Header('Cache-Control', 'true')
  @HttpCode(HttpStatus.CREATED)
  // @UsePipes(UniqueEmailPipe)
  @ApiUnprocessableEntityResponse()
  async store(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.store(createUserDto);
    return plainToClassWhitelist(UserResponseDto, user);
  }

  @Put(':id')
  @ApiBadRequestResponse()
  @ApiUnprocessableEntityResponse()
  update(@IntParam('id') id: number, @Body() patch: UpdateUserDto) {
    return this.userService.update(id, patch);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse()
  destroy(@IntParam('id') id: number) {
    return this.userService.destroy(id);
  }

  @Post(':userId/roles')
  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse()
  @ApiUnprocessableEntityResponse()
  async addRoles(@IntParam('userId') userId: number, @Body() assignRolesDto: AssignRolesDto) {
    const user = await this.userService.assignRoles(userId, assignRolesDto);
    return plainToClassWhitelist(UserResponseDto, user);
  }

  // // @UseGuards(CheckUserGuard)
  // // @UseGuards(AuthGuard('local'))
  // // @UseGuards(CheckUserGuard, AuthGuard('local'))
  // @Auth('local')
  // @Post('login')
  // login(@Req() req) {
  //   const payload = { username: req.user.username, sub: req.user.userId };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
}
