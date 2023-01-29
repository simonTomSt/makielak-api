import { Role } from '@prisma/client';
import { BaseHttpResponse } from '@utils/base-http-response';
import type { Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { container } from '@services/app';
import { TYPES } from '@services/app/ioc-types';
import { IAuthService } from '@services/auth';
import { AuthRequest } from '@utils/types';

export class AuthMiddleware extends BaseMiddleware {
  constructor(private readonly roles?: Role[]) {
    super();
  }

  public handler = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    const authService = container.get<IAuthService>(TYPES.AuthService);
    const token = req.cookies.token;

    if (!token) {
      const response = BaseHttpResponse.failed('Unauthorized', 401);
      return res.clearCookie('token').status(401).json(response);
    }

    try {
      const tokenPayload = await authService.verifyJwt(token);

      if (
        this.roles &&
        !this.roles.includes(tokenPayload.payload.role) &&
        tokenPayload.payload.role !== Role.SUPER_ADMIN
      ) {
        const response = BaseHttpResponse.failed('Forbidden', 403);
        return res.status(response.statusCode).json(response);
      }

      req.user = tokenPayload.payload;

      next();
    } catch (e) {
      const response = BaseHttpResponse.failed('Unauthorized', 401);
      return res.clearCookie('token').status(401).json(response);
    }
  };

  static roles(roles: Role[]) {
    return new AuthMiddleware(roles).handler;
  }
}
