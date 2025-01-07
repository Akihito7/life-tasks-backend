import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;

    if (!authorization) throw new UnauthorizedException('Invalid Token JWT.');

    const [, token] = authorization.split(' ');

    const { sub: userId } = await this.authService.verifyToken(token);

    request.user = {
      id: Number(userId),
    };

    return true;
  }
}
