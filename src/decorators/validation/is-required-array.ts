import { applyDecorators } from '@nestjs/common';
import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, ArrayNotEmpty, IsArray } from 'class-validator';

export function IsRequireArray(option?: { maxSize?: number; minSize?: number }) {
  const decorators = new Array<ClassDecorator | MethodDecorator | PropertyDecorator>(
    IsArray(),
    ArrayNotEmpty(),
  );

  if (option.minSize != null) {
    decorators.push(ArrayMinSize(option.minSize));
  }

  if (option.maxSize != null) {
    decorators.push(ArrayMaxSize(option.maxSize));
  }

  return applyDecorators(...decorators);
}
