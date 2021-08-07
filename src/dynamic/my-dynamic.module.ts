import { DynamicModule, Module } from '@nestjs/common';
import { CONFIG_OPTION } from '../constant/constant';
import { MyDynamicService } from './my-dynamic.service';

@Module({})
export class MyDynamicModule {
  static register(option): DynamicModule {
    return {
      providers: [
        {
          provide: CONFIG_OPTION,
          useValue: option,
        },
        MyDynamicService,
      ],
      module: MyDynamicModule,
      exports: [MyDynamicService],
    };
  }
}
