import { PrimaryGeneratedColumn } from 'typeorm';

export const Primary = (id = 'id') =>
  PrimaryGeneratedColumn({ name: id, type: 'int', unsigned: true });
