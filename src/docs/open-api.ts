import deepMerge from 'deepmerge';
import { usersDocs } from './users';
import { Request, Response } from 'express';
import { sharedSchemas } from './shared';
import { storageDocs } from './storage';
import { contentDocs } from './content';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
const { defaultMetadataStorage } = require('class-transformer/cjs/storage');

export const getApiAsJson = (_req: Request, res: Response) => res.json(docs);

const docsOptions = {
  openapi: '3.0.3',
  info: {
    version: '1.0.0',
    title: 'Makielak API',
    description: 'This is a makielak API documentation.',
  },
  servers: [
    {
      url: 'https://{URL}:{PORT}',
    },
    {
      url: 'http://{URL}:{PORT}',
    },
  ],
  components: {
    schemas: {
      ...sharedSchemas,
      ...validationMetadatasToSchemas({
        classTransformerMetadataStorage: defaultMetadataStorage,
      }),
    },
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'token',
      },
    },
  },
};

const docs = deepMerge.all([docsOptions, usersDocs, contentDocs, storageDocs]);

export default docs;
