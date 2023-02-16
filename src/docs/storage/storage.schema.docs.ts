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

const DeletedFileResponse = createResponseSchema(
  {
    deleted: {
      type: 'boolean',
      example: 'true',
    },
  },
  200
);

export const storageSchemas = {
  // Response
  FileResponse,
  DeletedFileResponse,

  // Other
  FileType,
};
