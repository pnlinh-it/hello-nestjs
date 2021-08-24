import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InternalOAuthError } from 'passport-oauth';
import { BaseExceptionFilter } from '@nestjs/core';
import { IndexNotFoundException } from '../exceptions/index-not-found.exception';
import { EntityNotFoundError } from 'typeorm';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof IndexNotFoundException) {
      return AllExceptionsFilter.handleIndexNotFound(exception, host);
    }

    if (exception instanceof EntityNotFoundError) {
      return super.catch(new NotFoundException(), host);
    }

    if (exception instanceof InternalOAuthError) {
      return super.catch(new UnprocessableEntityException('Invalid token.'), host);
    }

    super.catch(exception, host);
  }

  private static handleIndexNotFound(exception: IndexNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      message: `ID not found : ${exception.index}`,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
