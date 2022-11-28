export const mapPrismaErrors = () => {};

export const prismaErrorsMap = new Map();

prismaErrorsMap.set('P2025', {
  statusCode: 404,
  message: 'Record not found',
});

prismaErrorsMap.set('P2002', {
  statusCode: 409,
  message: 'Resource already exists',
});
