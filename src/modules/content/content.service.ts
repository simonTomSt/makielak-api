import { TYPES } from '@services/app/ioc-types';
import { plainToClass } from 'class-transformer';
import { inject, injectable } from 'inversify';
import { IContentRepository, IContentService } from './content.interface';
import { GetContentByNameDto, ContentDto } from './dto';
import { createEmptyStructure } from './dto/structures/empty-structure-map';

@injectable()
export class ContentService implements IContentService {
  constructor(
    @inject(TYPES.ContentRepository)
    private readonly contentRepository: IContentRepository
  ) {}

  async findByName(
    getContentByNameDto: GetContentByNameDto
  ): Promise<ContentDto> {
    const content = await this.contentRepository.findByName(
      getContentByNameDto.name
    );

    if (!content)
      return plainToClass(ContentDto, {
        ...content,
        structure: createEmptyStructure(getContentByNameDto.name),
      });

    return plainToClass(ContentDto, content);
  }

  async updateOne(contentDto: ContentDto): Promise<ContentDto> {
    const content = await this.contentRepository.updateOne(contentDto);

    return plainToClass(ContentDto, content);
  }
}
