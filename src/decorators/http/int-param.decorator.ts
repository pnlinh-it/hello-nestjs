import { Param, ParseIntPipe } from '@nestjs/common';

export const IntParam = (property: string) => Param(property, ParseIntPipe);
