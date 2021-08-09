import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { IndexNotFoundExceptionFilter } from './filters/index-not-found-exception.filter';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { ValidationError } from '@nestjs/common/interfaces/external/validation-error.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    // Don't change the exception order
    // Under line will take higher priority.
    new AllExceptionsFilter(httpAdapter),
    new IndexNotFoundExceptionFilter(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      // Will ignore validate null or undefined properties
      // event if it marked as @IsNotEmpty or @ArrayNotEmpty.
      skipMissingProperties: false,
      // Strip any field that has no Decorator.
      // In case have no decorator using @Allow.
      whitelist: true,
      // Throw exception if payload has
      // field that not present in validate properties.
      forbidNonWhitelisted: false,
      // If set to true, attempts to validate unknown objects fail immediately.
      forbidUnknownValues: true,
      // Remove validate error message from response
      disableErrorMessages: false,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      // Only use use define message. This may useful for i18n
      dismissDefaultMessages: false,
      // Validation of the given property will stop after encountering the first error
      // Validation of other properties will continue
      stopAtFirstError: true,
      // Handle at ./node_modules/@nestjs/common/pipes/validation.pipe.js#63
      exceptionFactory: (errors: ValidationError[]) => {
        return errors;
      },
      // Transform the payload to defined (dto) class
      transform: true,
      // Send target and property's value into validation error object
      // Target is the object contains validate property: CreateUserDto, AnswerDto
      // Value is value of validate property
      validationError: { target: true, value: true },
    }),
  );

  await app.listen(3000);
}

bootstrap().then(() => console.log('Bootstrapped'));
