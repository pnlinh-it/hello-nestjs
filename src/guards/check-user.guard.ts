import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

type ActiveResult = boolean | Promise<boolean> | Observable<boolean>;

@Injectable()
export class CheckUserGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): ActiveResult {
    // getHandler get method of controller
    // getClass get controller
    // https://docs.nestjs.com/fundamentals/execution-context#executioncontext-class
    //const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // To combine use getAllAndOverride or getAllAndMerge
    // https://docs.nestjs.com/fundamentals/execution-context#reflection-and-metadata
    const roles = this.reflector.get<string[]>('roles', context.getClass());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return true;
  }
}
