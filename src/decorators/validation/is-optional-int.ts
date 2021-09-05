import { applyDecorators } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export function IsOptionalInt(option?: { max?: number; min?: number; each?: boolean }) {
  const each = option?.each || false;

  const decorators = new Array<ClassDecorator | MethodDecorator | PropertyDecorator>(
    IsOptional(),
    IsInt({ each: each }),
    Type(() => Number),
  );

  if (option?.min != null) {
    decorators.push(Min(option.min, { each: each }));
  }

  if (option?.max != null) {
    decorators.push(Max(option.max, { each: each }));
  }

  return applyDecorators(...decorators);
}
