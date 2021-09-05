import { applyDecorators } from '@nestjs/common';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { IsRequired } from './IsRequired';

export function IsRequiredString(range?: { minLength?: number; maxLength?: number }) {
  return applyDecorators(
    IsRequired(),
    IsString(),
    MinLength(range?.minLength || 5),
    MaxLength(range?.maxLength || 255),
  );
}
