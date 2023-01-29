import { Content } from '@prisma/client';
import { TYPES } from '@services/app/ioc-types';
import { IDatabaseService } from '@services/database';
import { ContentCtx } from '@utils/types';
import { inject, injectable } from 'inversify';
import { IContentRepository } from './content.interface';

@injectable()
export class ContentRepository implements IContentRepository {
  private readonly contentCtx: ContentCtx;

  constructor(
    @inject(TYPES.DatabaseService)
    private readonly databaseService: IDatabaseService
  ) {
    this.contentCtx = this.databaseService.contentCtx();
  }

  findByName(name: Content['name']): Promise<Content> {
    return this.contentCtx.findFirst({ where: { name } });
  }

  async updateOne(content: Content): Promise<Content> {
    return this.contentCtx.upsert({
      where: {
        id: content.id || '',
      },
      update: content,
      create: content,
    });
  }
}
