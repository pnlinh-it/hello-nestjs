import { Module } from '@nestjs/common';
import { M1Service } from './m1.service';

@Module({
  providers: [M1Service],
  exports: [M1Service],
})
export class Module1Module {
  constructor(private readonly m1: M1Service) {}
}
