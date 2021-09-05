import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { DECORATOR_ROLE_KEY, IS_PUBLIC_KEY } from '../constant/constant';
import { User } from '../modules/users/entities/user.entity';
import { Role } from '../modules/users/role';

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

    const isPublic = this.getOverrideMethodFirst(context, IS_PUBLIC_KEY);
    if (isPublic) {
      return true;
    }

    const requiredRoles: Role[] = this.getOverrideMethodFirst(context, DECORATOR_ROLE_KEY);

    const user: User = context.switchToHttp().getRequest().user;
    const userRoleNames = user.roles.map((role) => role.name);

    return requiredRoles.some((role) => userRoleNames.includes(role));
  }

  private getOverrideMethodFirst<T>(context: ExecutionContext, key: string): T {
    return this.reflector.getAllAndOverride(key, [context.getHandler(), context.getClass()]);
  }
}
