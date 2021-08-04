import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { IndexNotFoundExceptionFilter } from './filters/index-not-found-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalFilters(new IndexNotFoundExceptionFilter());
  await app.listen(3000);
}

bootstrap().then(() => console.log('Bootstrapped'));
