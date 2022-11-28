import 'reflect-metadata';

import { Application } from '@services/app';

const bootstrap = async () => {
  try {
    const app = new Application({
      defaultScope: 'Singleton',
    });

    app.configureServices();

    await app.setupDB();

    app.setupServer();
    app.listen();
  } catch (e) {
    console.error(e);
  }
};

bootstrap();