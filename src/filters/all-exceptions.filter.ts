import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { InternalOAuthError } from 'passport-oauth';
import { InternalOAuthError as InternalOAuthError2, TokenError } from 'passport-oauth2';
import { EntityNotFoundError } from 'typeorm';
import { IndexNotFoundException } from '../exceptions/index-not-found.exception';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    if (host.getType() !== 'http') {
      throw exception;
    }

    if (exception instanceof IndexNotFoundException) {
      return AllExceptionsFilter.handleIndexNotFound(exception, host);
    }

    if (exception instanceof EntityNotFoundError) {
      return super.catch(new NotFoundException(), host);
    }

    if (
      exception instanceof InternalOAuthError ||
      exception instanceof InternalOAuthError2 ||
      exception instanceof TokenError
    ) {
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
