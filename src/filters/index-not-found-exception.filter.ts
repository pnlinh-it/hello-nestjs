import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { IndexNotFoundException } from '../exceptions/index-not-found.exception';

@Catch(IndexNotFoundException)
export class IndexNotFoundExceptionFilter implements ExceptionFilter<IndexNotFoundException> {
  catch(exception: IndexNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: `The user with ${exception.index} not found`,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
