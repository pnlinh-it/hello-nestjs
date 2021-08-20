import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Module2Module } from './module2/module2.module';
import { M1Service } from './module1/m1.service';
import { MyDynamicModule } from './dynamic/my-dynamic.module';
import { MyDynamicService } from './dynamic/my-dynamic.service';
import { DatabaseConnection } from './database-connection';
import { LogService } from './log.service';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseConfig } from './config/database.config';
import { EnvironmentVariables } from './config/environment-variables';
import { ExportServiceModule } from './modules/export-service/export-service.module';
import { ExportServiceService } from './modules/export-service/export-service.service';
import { QuestionsModule } from './modules/questions/questions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseNamespaceConfig from './config/database.namespace.config';
import { TypeOrmConfigFactory } from './config/type-orm-config-factory';
//import configurationYml from './config/configuration-yml';

type ConfigServiceEnv = ConfigService<EnvironmentVariables>;

const option = { password: 'awdawd' };

const aliasM1ServiceFactory = {
  provide: 'ALIAS_LOG_Service',
  useExisting: LogService,
};

const connectionFactory = {
  provide: 'CONNECTION',
  useFactory: (m1Service: M1Service) => {
    return new DatabaseConnection(m1Service);
  },
  inject: [M1Service],
};

@Module({
  imports: [
    UsersModule,
    Module2Module,
    MyDynamicModule.register(option),
    ConfigModule.forRoot({
      load: [databaseNamespaceConfig, configuration],
      // ConfigModule.forFeature(databaseConfig)
      // https://docs.nestjs.com/techniques/configuration#partial-registration
      cache: true,
      isGlobal: true,
      // envFilePath: '.development.env',
    }),
    // Move to separate file
    // https://docs.nestjs.com/techniques/database#custom-connection-factory
    // https://docs.nestjs.com/techniques/database#async-configuration
    TypeOrmModule.forRootAsync({
      // https://stackoverflow.com/a/50597179/14284081
      // The providers in Nest aren't globally scoped by default.
      // So to inject ConfigService from ConfigModule we must be import it
      // Use imports same as standard module
      // Actually, here we jus return an object. Same as the way we use dynamic module
      imports: [ConfigModule],

      // Use useFactory, useClass, or useExisting
      //  https://stackoverflow.com/a/52578302/14284081
      // useFactory: (
      //   configService: ConfigServiceEnv,
      //   dbConfig2: ConfigType<typeof databaseNamespaceConfig>,
      // ) => {
      //   // ConfigModule.forFeature(databaseConfig)
      //   // Get all configuration or use namespace
      //   const dbConfig = configService.get<DatabaseConfig>('database');
      //   // configService.get<DatabaseConfig>('database');
      //   // configService.get('database', { infer: true })
      //   return {
      //     type: 'mysql',
      //     host: dbConfig.host,
      //     port: +dbConfig.port,
      //     username: dbConfig.username,
      //     password: dbConfig.password,
      //     database: dbConfig.database,
      //     synchronize: true,
      //     entities: [Question, Answer],
      //   };
      // },
      // https://github.com/nestjs/typeorm/blob/eb8f0a5f551b3db0955f765a88df2e233e22698f/lib/typeorm.providers.ts#L31
      // https://github.com/nestjs/typeorm/blob/eb8f0a5f55/lib/common/typeorm.utils.ts#L70
      // inject: [
      //   ConfigService,
      //   databaseNamespaceConfig.KEY,
      //   TypeOrmConfigFactory,
      // ],

      useClass: TypeOrmConfigFactory,

      // connectionFactory: async (options) => {
      //   const connection = await createConnection(options);
      //   return connection;
      // },
    }),
    ExportServiceModule,
    QuestionsModule,
  ],
  controllers: [AppController],
  providers: [AppService, aliasM1ServiceFactory, connectionFactory, LogService],
})
export class AppModule {
  constructor(
    private readonly m1Service: M1Service,
    private readonly m1Service2: M1Service,
    private readonly dynamicService: MyDynamicService,
    @Inject('ALIAS_LOG_Service')
    private readonly aliasLogService,
    private readonly logService: LogService,
    @Inject('CONNECTION')
    private readonly databaseConnection: DatabaseConnection,
    private configService: ConfigService,
    private configService2: ConfigService<EnvironmentVariables>,
    private exportModule: ExportServiceService,
    @Inject(databaseNamespaceConfig.KEY)
    private dbConfig2: ConfigType<typeof databaseNamespaceConfig>,
  ) {
    const host = configService2.get('database', { infer: true }).host;
    const dbConfig = configService.get<DatabaseConfig>('database');
    console.log(dbConfig2);
    console.log(dbConfig);
    // dbConfig2.port
    // m1Service, m1Service2, databaseConnection.m1Service are same
    // logService, aliasLogService are same
  }
}
