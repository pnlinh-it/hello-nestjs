import {
  Allow,
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  Validate,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { IsLongerThan } from '../../../validators/IsLongerThan';
import { AnswerDto } from './answer.dto';
import { Type } from 'class-transformer';
import { Optional } from '@nestjs/common';
import { IsNotBlank } from '../../../validators/IsNotBlank';

export class CreateAdminUserDto extends CreateUserDto {
  @IsString()
  @ValidateIf(function (object: CreateUserDto, value: string) {
    return true;
  })
  // @IsLongerThan('email')
  @IsIn(['admin', 'staff'])
  @MaxLength(20)
  @IsString()
  @Length(5, 10)
  @IsNotEmpty()
  @Validate(IsNotBlank)
  role: string;

  @Type(() => AnswerDto)
  @ValidateNested({ each: true })
  @ArrayMaxSize(3)
  @ArrayMinSize(1)
  @IsArray()
  @ArrayNotEmpty()
  answers: AnswerDto[];

  @IsDefined()
  nickname: string;

  @Optional()
  @Allow()
  phone_number?: string;
}
