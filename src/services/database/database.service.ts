import { injectable } from 'inversify';
import { Prisma, PrismaClient } from '@prisma/client';
import { IDatabaseService } from './database.interface';

import type { ContentCtx, DBClient, FileCtx, UserCtx } from '@utils/types';

@injectable()
export class DatabaseService implements IDatabaseService {
  private dbClient: DBClient;

  constructor() {
    this.dbClient = new PrismaClient();
  }

  async connect(): Promise<void> {
    await this.dbClient.$connect();
  }

  userCtx(): UserCtx {
    return this.dbClient.user;
  }

  contentCtx(): ContentCtx {
    return this.dbClient.content;
  }

  fileCtx(): FileCtx {
    return this.dbClient.file;
  }

  async disconnect(): Promise<void> {
    await this.dbClient.$disconnect();
  }
}
