import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { UserRoleEnum } from 'src/users/utility/common/users-role.enum';

@Injectable()
export class AuthorizationGuard implements CanActivate {

    constructor(private reflector: Reflector){}

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request = context.switchToHttp().getRequest();

    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getClass(),
        context.getHandler()
    ]);
    let role = UserRoleEnum.USER;
    requiredRoles[0] == 'admin' ? role = UserRoleEnum.ADMIN : null;
    
    return role == request.currentUser.role;
  }
}