import {
  DocumentBuilder,
  ExpressSwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import * as basicAuth from 'express-basic-auth';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config/app-config';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { UsersModule } from './modules/users/users.module';

export function setupSwagger(app: INestApplication) {
  const configService: ConfigService<AppConfig> = app.get(ConfigService);
  const docsConfig = configService.get('documentation', { infer: true });

  app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        [docsConfig.auth.username]: docsConfig.auth.password,
      },
    }),
  );

  /**
   * OpenAPI (Swagger) configuration
   * https://docs.nestjs.com/openapi/introduction#bootstrap
   */
  const swaggerOptions = new DocumentBuilder()
    .setTitle('API')
    .setVersion('2.0.0')
    .addBearerAuth()
    .build();

  /**
   * Library's (@nestjs/swagger) behavior configuration:
   * https://docs.nestjs.com/openapi/introduction#document-options
   */
  const nestJsSwaggerOption: SwaggerDocumentOptions = {
    include: [AuthModule, ProfileModule, UsersModule],
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  /**
   * Swagger UI configuration
   * https://docs.nestjs.com/openapi/introduction#setup-options
   */
  const swaggerUiConfig: ExpressSwaggerCustomOptions = {
    customSiteTitle: 'Hello Nestjs documentation',
  };

  const document = SwaggerModule.createDocument(app, swaggerOptions, nestJsSwaggerOption);

  SwaggerModule.setup('docs', app, document, swaggerUiConfig);
}
