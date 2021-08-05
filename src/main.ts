import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { IndexNotFoundExceptionFilter } from './filters/index-not-found-exception.filter';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { ValidationError } from '@nestjs/common/interfaces/external/validation-error.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalFilters(new IndexNotFoundExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      whitelist: true,
      // If set to true, instead of stripping non-whitelisted properties validator will throw an exception.
      forbidNonWhitelisted: false,
      // If set to true, attempts to validate unknown objects fail immediately.
      forbidUnknownValues: true,
      disableErrorMessages: false,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      dismissDefaultMessages: false,
      // Handle at ./node_modules/@nestjs/common/pipes/validation.pipe.js#63
      // exceptionFactory: (errors: ValidationError[]) => {
      //   return errors;
      // },
      transform: true,
      validationError: { target: true, value: true },
    }),
  );

  await app.listen(3000);
}

bootstrap().then(() => console.log('Bootstrapped'));
