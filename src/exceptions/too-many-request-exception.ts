import { HttpException, HttpStatus } from '@nestjs/common';

export class TooManyRequestException extends HttpException {
  constructor(response: string | Record<string, any>) {
    super(response, HttpStatus.TOO_MANY_REQUESTS);
  }
}
