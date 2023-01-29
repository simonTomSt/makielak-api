import { FileType as FileTypeEnum } from '@prisma/client';
import { createResponseSchema, getByRef } from '../shared';

export const FileType = {
  type: 'string',
  enum: [FileTypeEnum.IMAGE, FileTypeEnum.PDF],
};

const FileResponse = createResponseSchema(
  {
    file: {
      $ref: getByRef('FileDto'),
    },
  },
  201
);

export const storageSchemas = {
  // Response
  FileResponse,

  // Other
  FileType,
};
