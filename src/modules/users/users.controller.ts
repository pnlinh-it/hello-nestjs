import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Redirect,
  Req,
  Res,
  SetMetadata,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { CheckUserGuard } from '../../guards/check-user.guard';
import { UniqueEmailPipe } from '../../pipes/unique-email.pipe';
import { Role } from './role';
import { Roles } from '../../decorators/guards/role.decorator';
import { Auth } from '../../decorators/guards/auth.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AssignRolesDto } from './dto/assign-roles.dto';

@UseGuards(CheckUserGuard)
@SetMetadata('roles', ['staff'])
@Controller('users')
@Roles(Role.Admin, Role.User)
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(CheckUserGuard)
  @SetMetadata('roles', ['admin'])
  @Get()
  index() {
    return this.userService.index();
  }

  /** When we use Express object by using decorator @Req, @Res
   * We have responsibility to handle response by using that object
   * Or we use option: passthrough: true
   */
  @Get('manual')
  indexManualHandle(@Req() request: Request, @Res() response: Response) {
    console.log(request.query);
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

  @Get(':id')
  show(@Param('id', ParseIntPipe) id: number) {
    return this.userService.show(id);
  }

  /**
   * This doesn't accept form-data 🤔
   * Use x-www-url-form-encoded or application/json along with the raw
   * https://stackoverflow.com/a/61087718/14284081
   */
  @Post()
  @Header('Cache-Control', 'true')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(UniqueEmailPipe)
  store(@Body() createUserDto: CreateUserDto) {
    return this.userService.store(createUserDto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() patch: UpdateUserDto) {
    return this.userService.update(id, patch);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  destroy(@Param('id', ParseIntPipe) id) {
    return this.userService.destroy(id);
  }

  @Post(':userId/roles')
  addRoles(@Param('userId', ParseIntPipe) userId: number, @Body() assignRolesDto: AssignRolesDto) {
    return this.userService.assignRoles(userId, assignRolesDto);
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

  @Auth('jwt')
  @Post('profile')
  profile(@Req() req) {
    return req.user;
  }
}
