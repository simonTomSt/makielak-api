import { BaseHttpResponse } from '@utils/base-http-response';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import type { Response, Request, NextFunction } from 'express';

export class ValidateRequest {
  constructor(private readonly dtoClass: any) {}

  public execute = async (req: Request, res: Response, next: NextFunction) => {
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
    return new ValidateRequest(dto).execute;
  }
}
