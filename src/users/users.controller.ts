import {
  Query,
  Body,
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Get,
  Post,
  Delete,
  Redirect,
  Req,
  Res,
  ParseIntPipe,
  Put,
  UsePipes,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { Rule1Pipe } from '../pipes/rule1.pipe';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { UserGuard } from '../user.service';

@UseGuards(UserGuard)
@SetMetadata('roles', ['staff'])
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(UserGuard)
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
  @UsePipes(Rule1Pipe)
  store(@Body() createUserDto: CreateAdminUserDto) {
    return this.userService.store(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() patch: Partial<CreateUserDto>,
  ) {
    return this.userService.update(id, patch);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  destroy(@Param('id', ParseIntPipe) id) {
    return this.userService.destroy(id);
  }
}
