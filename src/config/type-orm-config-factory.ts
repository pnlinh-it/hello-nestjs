import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { PasswordReset } from '../modules/password-reset/entities/password-reset';
import { Answer } from '../modules/questions/entities/answer';
import { Question } from '../modules/questions/entities/question';
import { QuizQuestion } from '../modules/quiz-question/entities/quiz-question';
import { Quiz } from '../modules/quiz/entities/quiz.entity';
import { Role } from '../modules/role/entities/role.entity';
import { SocialUser } from '../modules/users/entities/social-user.entity';
import { UserRole } from '../modules/users/entities/user-role.entity';
import { User } from '../modules/users/entities/user.entity';
import { AppConfig } from './app-config';
import databaseNamespaceConfig from './database.namespace.config';
import { Database } from './types/database';

@Injectable()
export class TypeOrmConfigFactory implements TypeOrmOptionsFactory {
  constructor(
    private configService: ConfigService<AppConfig>,
    // We don't need to inject: [databaseNamespaceConfig.KEY] maybe because
    // It exist inside ConfigModule that we ready imported
    @Inject(databaseNamespaceConfig.KEY)
    private dbNamespaceConfig: ConfigType<typeof databaseNamespaceConfig>,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const dbConfig = this.configService.get<Database>('database');
    // configService.get<Database>('database');
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
      entities: [
        QuizQuestion,
        Quiz,
        Question,
        Answer,
        User,
        Role,
        UserRole,
        SocialUser,
        PasswordReset,
      ],
    };
  }
}
