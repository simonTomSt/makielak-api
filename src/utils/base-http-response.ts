export class BaseHttpResponse<T extends Record<string, unknown> = {}> {
  constructor(
    public readonly data: T = {} as T,
    public readonly error: string | null = null,
    public readonly statusCode: number
  ) {}

  static success<T extends Record<string, unknown> = {}>(
    successData: any,
    statusCode = 200
  ) {
    return new BaseHttpResponse<T>(successData, null, statusCode);
  }

  static failed<T extends Record<string, unknown> = {}>(
    msg: string = 'Internal Server Error',
    statusCode = 500
  ) {
    return new BaseHttpResponse<T>(null, msg, statusCode);
  }
}
