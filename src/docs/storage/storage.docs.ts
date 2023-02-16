import { getByRef } from 'src/docs/shared';
import { storageSchemas } from './storage.schema.docs';

const storageTag = 'Storage';

export const storageDocs = {
  tags: [{ name: storageTag }],
  paths: {
    '/store/file': {
      post: {
        operationId: 'storeFile',
        tags: [storageTag],
        summary: 'Stores a file',
        parameters: [
          {
            in: 'query',
            name: 'type',
            required: true,
            description: 'File type',
            schema: {
              $ref: getByRef('FileType'),
            },
          },
        ],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  file: {
                    type: 'string',
                    format: 'binary',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Stored file response',
            content: {
              'application/json': {
                schema: {
                  $ref: getByRef('FileResponse'),
                },
              },
            },
          },
        },
      },
    },
    '/store/file/{id}': {
      delete: {
        operationId: 'deleteFile',
        tags: [storageTag],
        summary: 'Deletes stored file',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'file id',
            schema: {
              $ref: getByRef('UUID'),
            },
          },
        ],
        responses: {
          '200': {
            description: 'Deleted file response',
            content: {
              'application/json': {
                schema: {
                  $ref: getByRef('DeletedFileResponse'),
                },
              },
            },
          },
        },
      }
    },
  },
  components: {
    schemas: {
      ...storageSchemas,
    },
  },
};
