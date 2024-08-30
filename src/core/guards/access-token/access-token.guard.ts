import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/core/decorators/public.decorator';
import { DecodedTokenI } from 'src/shared/interfaces/decoded-token.interface';
import { RequestI } from 'src/shared/interfaces/request.interface';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const ctx = context.switchToHttp();
      const req = ctx.getRequest<RequestI>();

      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getClass(), context.getHandler()],
      );

      if (isPublic) return true;

      const authorization = req.headers.authorization;

      if (
        !authorization ||
        Array.isArray(authorization) ||
        typeof authorization != 'string'
      )
        throw new HttpException('invalid headers', HttpStatus.UNAUTHORIZED);
      const [bearer, accessToken] = authorization.split(' ');
      if (bearer != 'Bearer')
        throw new HttpException('invalid headers', HttpStatus.UNAUTHORIZED);

      const decodedToken = this.jwtService.verify<DecodedTokenI>(accessToken, {
        secret: 'Y4Z$0$14lM3d144ppl1c4t10n_ACCESS_TOKEN',
      });
      req.user = decodedToken;
      return true;
    } catch (error) {
      throw new HttpException(
        error?.message ?? 'You must be logged in first',
        error?.status ?? HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
