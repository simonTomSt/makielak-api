import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import env from '@config/env';
import { TYPES } from './ioc-types';
import { UserController as _ } from '@modules/user';
import { catchErrorMiddleware } from '@middleware/catch-error';
import type { IDatabaseService } from '@services/database';
import type { IApplication } from './app.interface';
import { bindAllDependencies } from './ioc-bindings';
import { container } from './ioc-container';
import { corsOptions } from '@config/corsOptions';
import swaggerUi from 'swagger-ui-express';
import openapiSpecification, { getApiAsJson } from 'src/docs/open-api';

export class Application implements IApplication {
  private readonly container: Container;
  private serverApp: express.Application;

  constructor() {
    this.container = container;
  }

  configureServices() {
    bindAllDependencies(this.container);
  }

  async setupDB() {
    const db = this.container.get<IDatabaseService>(TYPES.DatabaseService);
    await db.connect();
  }

  setupServer() {
    const server = new InversifyExpressServer(this.container);

    server.setConfig((app) => {
      app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(openapiSpecification)
      );
      app.get('/swagger.json', getApiAsJson);
      app.use(cors(corsOptions));
      app.use(express.json());
      app.use(cookieParser());
      app.use('/public', express.static('public'));
      app.use(morgan('dev'));
    });

    server.setErrorConfig((app) => app.use(catchErrorMiddleware));

    this.serverApp = server.build();
  }

  listen() {
    this.serverApp.listen(env.PORT, () =>
      console.log(`node server is listening on port ${env.PORT}`)
    );

    this.serverApp.on('close', async () => {
      const db = this.container.get<IDatabaseService>(TYPES.DatabaseService);
      await db.disconnect();

      console.info('node server closed');
    });
  }
}
