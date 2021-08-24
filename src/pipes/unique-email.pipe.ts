import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UsersService } from '../modules/users/users.service';

@Injectable()
export class UniqueEmailPipe implements PipeTransform {
  constructor(private readonly userService: UsersService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const email = value['email'];
    // const exist = await this.userService.findByEmail(email);

    // if (exist) {
    //   throw new UnprocessableEntityException('User email is exist');
    // }
    return value;
  }
}
