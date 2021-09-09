import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ObjectType()
export class RoleResponseDto {
  @Field(() => ID)
  @Expose()
  id: number;

  @Expose()
  name: string;
}
