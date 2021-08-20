import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import databaseNamespaceConfig from './database.namespace.config';
import { EnvironmentVariables } from './environment-variables';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { DatabaseConfig } from './database.config';
import { Question } from '../modules/questions/entities/question';
import { Answer } from '../modules/questions/entities/answer';
import { query } from 'express';

@Injectable()
export class TypeOrmConfigFactory implements TypeOrmOptionsFactory {
  constructor(
    private configService: ConfigService<EnvironmentVariables>,
    // We don't need to inject: [databaseNamespaceConfig.KEY] maybe because
    // It exist inside ConfigModule that we ready imported
    @Inject(databaseNamespaceConfig.KEY)
    private dbNamespaceConfig: ConfigType<typeof databaseNamespaceConfig>,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const dbConfig = this.configService.get<DatabaseConfig>('database');
    // configService.get<DatabaseConfig>('database');
    // configService.get('database', { infer: true })
    return {
      bigNumberStrings: false,
      logging: 'all',
      logger: 'simple-console',
      type: 'mysql',
      host: dbConfig.host,
      port: +dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      synchronize: true,
      entities: [Question, Answer],
    };
  }
}