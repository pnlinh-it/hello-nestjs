import { ConfigService } from '@nestjs/config';
import { AppConfig } from './app-config';
import { Redis } from './types/redis';
import { Injectable } from '@nestjs/common';
import { BullModuleOptions, SharedBullConfigurationFactory } from '@nestjs/bull';

@Injectable()
export class BullConfigFactory implements SharedBullConfigurationFactory {
  constructor(private configService: ConfigService<AppConfig>) {}

  createSharedConfiguration(): Promise<BullModuleOptions> | BullModuleOptions {
    const redisConfig = this.configService.get<Redis>('redis');
    return {
      redis: {
        host: redisConfig.host,
        port: redisConfig.port,
        password: redisConfig.password,
        keyPrefix: redisConfig.prefix,
      },
    };
  }
}
