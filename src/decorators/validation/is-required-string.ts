import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export function IsRequiredString(range?: { minLength?: number; maxLength?: number }) {
  return applyDecorators(
    IsString(),
    IsNotEmpty(),
    MinLength(range?.minLength || 5),
    MaxLength(range?.maxLength || 255),
  );
}
