import { InputType } from '@nestjs/graphql';
import { RegisterDto } from '../../auth/dto/register.dto';

@InputType()
export class CreateUserDto extends RegisterDto {}
