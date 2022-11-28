import type { Response, Request, NextFunction } from 'express';
import { HttpError } from '@utils/http-error';
import { BaseHttpResponse } from '@utils/base-http-response';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { prismaErrorsMap } from '@utils/prisma-errors';

export const catchErrorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  let finalError = {
    statusCode: 500,
    message: err.message || 'Internal Server Error',
  };

  if (err instanceof PrismaClientKnownRequestError) {
    finalError = prismaErrorsMap.get(err.code);
  }

  if (err instanceof HttpError) {
    finalError = err;
  }

  const response = BaseHttpResponse.failed(
    finalError.message,
    finalError.statusCode
  );

  res.status(response.statusCode).json(response);

  next();
};
