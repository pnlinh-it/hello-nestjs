import { Column } from 'typeorm';

export const String = (name: string, length = 255) =>
  Column({ name: name, type: 'varchar', length: length });
