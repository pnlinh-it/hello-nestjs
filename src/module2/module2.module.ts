import { Module } from '@nestjs/common';
import { Module1Module } from '../module1/module1.module';
import { M1Service } from '../module1/m1.service';

@Module({
  imports: [Module1Module],
  //exports: [Module1Module],
  exports: [M1Service],
  providers: [M1Service],
})
export class Module2Module {
  constructor(private readonly m1: M1Service) {}
}
