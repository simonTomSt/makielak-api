import { Content } from '@prisma/client';
import { ContentDto, GetContentByNameDto, UpsertContentDto } from './dto';

export interface IContentService {
  findByName(getContentByNameDto: GetContentByNameDto): Promise<ContentDto>;
  updateOne(contentDto: UpsertContentDto): Promise<ContentDto>;
}

export interface IContentRepository {
  findByName(name: Content['name']): Promise<Content>;
  updateOne(content: Content): Promise<Content>;
}
