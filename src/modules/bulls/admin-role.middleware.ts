import { NestMiddleware, NotFoundException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as passport from 'passport';
import { StrategyEnum } from '../auth/strateties/strategy.enum';

export class AdminRoleMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): any {
    const callback = passport.authenticate(
      StrategyEnum.JwtCookie,
      { session: false },
      function (error, user, info) {
        if (info || !user) {
          throw new NotFoundException();
          //return response.sendStatus(HttpStatus.NOT_FOUND);
        }
        next();
      },
    );

    callback(request, response, next);
  }
}
