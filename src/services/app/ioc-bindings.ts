import { TYPES } from './ioc-types';
import { DatabaseService, IDatabaseService } from '@services/database';
import {
  IUserRepository,
  IUserService,
  UserRepository,
  UserService,
  UserController as _,
} from '@modules/user';

import { type Container } from 'inversify';

export const bindAllDependencies = (container: Container) => {
  // DB
  container.bind<IDatabaseService>(TYPES.DatabaseService).to(DatabaseService);

  // User
  container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
  container.bind<IUserService>(TYPES.UserService).to(UserService);
};
