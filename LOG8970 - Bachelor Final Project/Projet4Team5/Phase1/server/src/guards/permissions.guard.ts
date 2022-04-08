import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.get<string[]>("permissions", context.getHandler());

    if (!permissions || permissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.role || !user.role.permissions || user.role.permissions.length === 0) {
      return false;
    }

    return this.hasPermissions(user.role.permissions.map(permission => permission.name), permissions);
  }

  private hasPermissions(userPermissions: string[], requiredPermissions: string[]) {
    for (const requiredPermission of requiredPermissions) {
      if (userPermissions.indexOf(requiredPermission) < 0) {
        console.log(
          "Missing permissions, make sure they are correctly populated in your database!" +
            " See /src/data/roles.ts for more information."
        );
        return false;
      }
    }

    return true;
  }
}
