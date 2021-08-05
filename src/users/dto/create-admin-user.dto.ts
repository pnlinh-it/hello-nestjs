import {
  IsIn,
  IsNotEmpty,
  IsString,
  MaxLength,
  Validate,
  ValidateIf,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { IsNotBlank } from '../../validators/IsNotBlank';
import { IsLongerThan } from '../../validators/IsLongerThan';

export class CreateAdminUserDto extends CreateUserDto {
  @IsString()
  @ValidateIf(function (object: CreateUserDto, value: string) {
    return true;
  })
  @IsLongerThan('email')
  @IsIn(['admin', 'staff'])
  @MaxLength(20)
  @IsNotEmpty()
  @Validate(IsNotBlank)
  role: string;
}
