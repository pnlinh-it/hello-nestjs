import { plainToClass } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces';

export const plainToClassWhitelist = <T, V>(cls: ClassConstructor<T>, plain: V) =>
  plainToClass(cls, plain, { excludeExtraneousValues: true });
