import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { join } from 'path';
import { AppConfig } from '../../config/app-config';

@Injectable()
export class GrpahQLConfigFactory implements GqlOptionsFactory {
  constructor(private readonly configService: ConfigService<AppConfig>) {}

  createGqlOptions(): GqlModuleOptions | Promise<GqlModuleOptions> {
    return {
      debug: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    };
  }
}
