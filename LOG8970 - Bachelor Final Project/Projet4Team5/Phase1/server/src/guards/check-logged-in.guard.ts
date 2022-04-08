import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  BadRequestException,
  forwardRef,
  Inject
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserService } from "../modules/user/user.service";

@Injectable()
export class CheckLoggedInGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const userId = request.user.id;
    const username = request.body["username"];
    const password = request.body["password"];

    if (!username || !password) {
      throw new BadRequestException();
    }

    let user;
    try {
      user = await this.userService.login({ username, password });
    } catch (e) {
      throw new BadRequestException();
    }

    if (user.id === userId) {
      return true;
    }

    throw new UnauthorizedException();
  }
}
