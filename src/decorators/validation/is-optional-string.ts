import { applyDecorators } from '@nestjs/common';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export function IsOptionalString(range?: { minLength?: number; maxLength?: number }) {
  return applyDecorators(
    IsOptional(),
    IsString(),
    MinLength(range?.minLength || 5),
    MaxLength(range?.maxLength || 255),
  );
}
