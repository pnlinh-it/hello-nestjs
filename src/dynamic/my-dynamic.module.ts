import { DynamicModule, Module } from '@nestjs/common';
import { CONFIG_OPTION } from '../constant/constant';
import { MyDynamicService } from './my-dynamic.service';

@Module({})
export class MyDynamicModule {
  static register(option): DynamicModule {
    return {
      providers: [
        // This will encapsulate for this module
        // It's purpose is allow MyDynamicModule can inject CONFIG_OPTION
        {
          provide: CONFIG_OPTION,
          useValue: option,
        },
        // To export MyDynamicService, it must be a part of MyDynamicModule
        // So we need to make it become a provider of MyDynamicModule
        MyDynamicService,
      ],
      module: MyDynamicModule,
      exports: [MyDynamicService],
    };
  }
}
