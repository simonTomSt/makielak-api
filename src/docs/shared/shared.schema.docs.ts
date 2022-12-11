export const getByRef = (schemaName: string) =>
  `#/components/schemas/${schemaName}`;

export const createResponseSchema = (
  data: Record<string, unknown>,
  statusCode?: number | string,
  error?: string
) => ({
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: data,
    },
    statusCode: {
      type: 'number',
      example: statusCode,
    },
    error: {
      type: 'string',
      example: error,
    },
  },
});

export const sharedSchemas = {
  UUID: {
    type: 'string',
    pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    minLength: 36,
    maxLength: 36,
    example: '95b11417-f18f-457f-8804-68e361f9164f',
  },
};
