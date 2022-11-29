import { BaseHttpResponse } from '@utils/base-http-response';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import type { Response, Request, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';

export class ValidateRequest extends BaseMiddleware {
  constructor(private readonly dtoClass: any) {
    super();
  }

  public handler = async (req: Request, res: Response, next: NextFunction) => {
    const mergedBodyWithQuery = { ...req.body, ...req.query, ...req.params };
    req.body = plainToInstance(this.dtoClass, mergedBodyWithQuery);

    const errors = await validate(req.body);

    if (errors.length > 0) {
      const errorMessage = Object.values(errors[0].constraints)?.[0];

      const response = BaseHttpResponse.failed(errorMessage, 400);
      res.status(response.statusCode).json(response);
    }

    next();
  };

  static with(dto: any) {
    return new ValidateRequest(dto).handler;
  }
}
