import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ValidationExecutor } from 'class-validator/types/validation/ValidationExecutor';

@Injectable()
export class Rule1Pipe implements PipeTransform {
  constructor(private readonly userService: UsersService) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const email = value['email'];
    const exist = this.userService.findByEmail(email);

    if (exist) {
      throw new UnprocessableEntityException('User email is exist');
    }
    return value;
  }
}
