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
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseConfig } from './config/database.config';
import { EnvironmentVariables } from './config/environment-variables';
//import configurationYml from './config/configuration-yml';

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
      load: [configuration],
      cache: true,
      // envFilePath: '.development.env',
    }),
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
  ) {
    const host = configService2.get('database', { infer: true }).host;
    const dbConfig = configService.get<DatabaseConfig>('database');
    console.log(dbConfig);
    // m1Service, m1Service2, databaseConnection.m1Service are same
    // logService, aliasLogService are same
  }
}
