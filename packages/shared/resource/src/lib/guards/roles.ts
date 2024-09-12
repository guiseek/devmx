import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '@devmx/shared-data-source';
import { Role } from '@devmx/shared-api-interfaces';
import { ROLES_KEY } from '../decorators';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.getRequiredRoles(context);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<AuthRequest>();

    return requiredRoles.some((role) => user.roles.includes(role));
  }

  private getRequiredRoles(context: ExecutionContext) {
    const metaKey = ROLES_KEY;
    const targets = [context.getHandler(), context.getClass()];
    return this.reflector.getAllAndOverride<Role[]>(metaKey, targets);
  }
}
