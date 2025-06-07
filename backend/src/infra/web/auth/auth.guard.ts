import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Request } from 'express';
import { JwtService } from 'src/infra/services/jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private jwtService: JwtService) {}

  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.exctractTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException('User not authenticated');
    }

    const payload = this.jwtService.verifyAuthToken(token);

    if (!payload) {
      throw new UnauthorizedException('User not authenticated');
    }

    request['userId'] = payload.userId;

    return true;
  }

  // authorization: Bearer <token>

  private exctractTokenFromRequest(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

export const AuthGuardProvider = {
  provide: APP_GUARD,
  useClass: AuthGuard,
};
