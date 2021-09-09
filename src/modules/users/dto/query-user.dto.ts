import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsOptionalInt } from '../../../decorators/validation/is-optional-int';
import { IsRequiredInt } from '../../../decorators/validation/is-required-int';

@ArgsType()
export class QueryUserDto {
  @Field(() => Int)
  @IsRequiredInt()
  page: number;

  @IsOptionalInt()
  @Field(() => Int)
  size?: number = 20;
}
