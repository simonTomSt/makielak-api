import { TYPES } from '@services/app/ioc-types';
import { IDatabaseService } from '@services/database';
import { FileCtx } from '@utils/types';
import { inject, injectable } from 'inversify';
import { IStorageRepository } from './storage.interface';
import { File } from '@prisma/client';

@injectable()
export class StorageRepository implements IStorageRepository {
  private readonly fileCtx: FileCtx;

  constructor(
    @inject(TYPES.DatabaseService)
    private readonly databaseService: IDatabaseService
  ) {
    this.fileCtx = this.databaseService.fileCtx();
  }

  async storeFile(file: Omit<File, 'id'>) {
    return this.fileCtx.create({ data: file });
  }

  async deleteFile(id: File['id']) {
    await this.fileCtx.delete({ where: { id } });
    return true;
  }

  async getFilesByIds(ids: File['id'][]) {
    return this.fileCtx.findMany({ where: { id: { in: ids } } });
  }
}
