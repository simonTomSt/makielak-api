import { TYPES } from './ioc-types';
import { DatabaseService, IDatabaseService } from '@services/database';
import {
  IUserRepository,
  IUserService,
  UserRepository,
  UserService,
  UserController as _UserController,
} from '@modules/user';

import { type Container } from 'inversify';
import { AuthService } from '@services/auth/auth.service';
import { IAuthService } from '@services/auth';
import {
  ContentService,
  IContentRepository,
  IContentService,
  ContentRepository,
  ContentController as _ContentController,
} from '@modules/content';

import {
  IStorageService,
  StorageService,
  StorageRepository,
  StorageController as _StorageController,
  IStorageRepository,
} from '@modules/storage';

export const bindAllDependencies = (container: Container) => {
  // DB
  container.bind<IDatabaseService>(TYPES.DatabaseService).to(DatabaseService);

  // User
  container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
  container.bind<IUserService>(TYPES.UserService).to(UserService);

  // Auth
  container.bind<IAuthService>(TYPES.AuthService).to(AuthService);

  // Content
  container.bind<IContentService>(TYPES.ContentService).to(ContentService);
  container
    .bind<IContentRepository>(TYPES.ContentRepository)
    .to(ContentRepository);

  //Storage
  container
    .bind<IStorageRepository>(TYPES.StorageRepository)
    .to(StorageRepository);
  container.bind<IStorageService>(TYPES.StorageService).to(StorageService);
};
