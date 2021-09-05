import { applyDecorators } from '@nestjs/common';
import { ArrayMaxSize, ArrayMinSize, ArrayNotEmpty, IsArray } from 'class-validator';
import { IsRequired } from './IsRequired';

export function IsRequireArray(option?: { maxSize?: number; minSize?: number }) {
  const decorators = new Array<ClassDecorator | MethodDecorator | PropertyDecorator>(
    IsRequired(),
    IsArray(),
    ArrayNotEmpty(),
  );

  if (option?.minSize != null) {
    decorators.push(ArrayMinSize(option.minSize));
  }

  if (option?.maxSize != null) {
    decorators.push(ArrayMaxSize(option.maxSize));
  }

  return applyDecorators(...decorators);
}
