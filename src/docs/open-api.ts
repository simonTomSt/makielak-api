import deepMerge from 'deepmerge';
import { usersDocs } from './users';
import { Request, Response } from 'express';
import { sharedSchemas } from './shared';

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

const docs = deepMerge.all([docsOptions, usersDocs]);

export default docs;
