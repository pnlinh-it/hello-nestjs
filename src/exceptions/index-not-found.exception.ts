import { HttpException, NotFoundException } from '@nestjs/common';

export class IndexNotFoundException extends NotFoundException {
  constructor(public index: number) {
    super();
  }
}
