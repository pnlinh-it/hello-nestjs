import { applyDecorators } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { IsRequired } from './IsRequired';

export function IsRequiredInt(option?: { max?: number; min?: number; each?: boolean }) {
  const each = option?.each || false;

  const decorators = new Array<ClassDecorator | MethodDecorator | PropertyDecorator>(
    IsRequired(),
    IsNotEmpty({ each: each }),
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
