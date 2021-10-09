import { ApiHideProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { IsOptionalInt } from '../../decorators/validation/is-optional-int';
import { Order } from './order';

export class PageOptionDto {
  @ApiHideProperty()
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.DESC;

  @Expose()
  @IsOptionalInt({ min: 1 })
  readonly page?: number = 1;

  @Expose()
  @IsOptionalInt({ min: 1, max: 50 })
  readonly take?: number = 15;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
