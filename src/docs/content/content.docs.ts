import { getByRef } from 'src/docs/shared';
import { storageSchemas } from './content.schema.docs';

const contentTag = 'Content';

export const contentDocs = {
  tags: [{ name: contentTag }],

  paths: {
    '/content/{name}': {
      get: {
        operationId: 'getContentByName',
        tags: [contentTag],
        summary: 'Get content by name',
        parameters: [
          {
            in: 'path',
            name: 'name',
            required: true,
            description: 'Content type',
            schema: {
              $ref: getByRef('ContentType'),
            },
          },
        ],
        responses: {
          '201': {
            description: 'Content response',
            content: {
              'application/json': {
                schema: {
                  $ref: getByRef('ContentResponse'),
                },
              },
            },
          },
        },
      },
      post: {
        operationId: 'upsertContent',
        tags: [contentTag],
        summary: 'Store a file',
        parameters: [
          {
            in: 'path',
            name: 'name',
            required: true,
            description: 'Content type',
            schema: {
              $ref: getByRef('ContentType'),
            },
          },
        ],
        requestBody: {
          description: 'Data to upsert content',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: getByRef('UpsertContentDto'),
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
                  $ref: getByRef('ContentResponse'),
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      ...storageSchemas,
    },
  },
};
