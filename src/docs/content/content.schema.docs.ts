import { ContentType as ContentTypeEnum } from '@prisma/client';
import { createResponseSchema, getByRef } from '../shared';

export const ContentType = {
  type: 'string',
  enum: Object.values(ContentTypeEnum),
};

const ContentResponse = createResponseSchema(
  {
    content: {
      $ref: getByRef('ContentDto'),
    },
  },
  200
);

export const storageSchemas = {
  // Response
  ContentResponse,

  // Other
  ContentType,
};
