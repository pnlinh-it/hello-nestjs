import { Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { IndexNotFoundException } from '../exceptions/index-not-found.exception';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof IndexNotFoundException) {
      return AllExceptionsFilter.handleIndexNotFound(exception, host);
    }

    super.catch(exception, host);
  }

  private static handleIndexNotFound(exception: IndexNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      message: `ID not found : ${exception.index}`,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
