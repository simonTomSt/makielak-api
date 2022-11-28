import express from 'express';
import morgan from 'morgan';
import { Container, type interfaces } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import env from '@config/env';
import { TYPES } from './ioc-types';
import { UserController as _ } from '@modules/user';
import { catchErrorMiddleware } from '@middleware/catch-error';
import type { IDatabaseService } from '@services/database';
import type { IApplication } from './app.interface';
import { bindAllDependencies } from './ioc-bindings';

export class Application implements IApplication {
  private readonly container: Container;
  private serverApp: express.Application;

  constructor(options: interfaces.ContainerOptions) {
    this.container = new Container(options);
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
      app.use(express.json());
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
