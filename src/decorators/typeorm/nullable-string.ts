import { Column } from 'typeorm';

export const NullablString = (name: string, length = 255) =>
  Column({ name: name, type: 'varchar', length: length, nullable: true });
