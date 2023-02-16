import { ContentType } from '@prisma/client';
import { TYPES } from '@services/app/ioc-types';
import { plainToClass, plainToInstance } from 'class-transformer';
import { inject, injectable } from 'inversify';
import { contentFileFields, contentTypeDtoMap } from './content.contstants';
import { IContentRepository, IContentService } from './content.interface';
import { GetContentByNameDto, ContentDto, DeleteContentFileDto } from './dto';
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

  async deleteFile(deleteContentFileDto: DeleteContentFileDto): Promise<ContentDto> {
    const content = await this.findByName(deleteContentFileDto);


    const contentStructure = plainToInstance<any, any>(
      contentTypeDtoMap[deleteContentFileDto.name],
      JSON.parse(content.structure)
    );
    
    const newStructure = contentFileFields[deleteContentFileDto.name].reduce((prev, curr) => {
      const fileField = contentStructure[curr];
      
      if (Array.isArray(fileField)) {
        return {...prev, [curr]: fileField.filter(file => file.id !== deleteContentFileDto.fileId)}
      }

      if (fileField.id === deleteContentFileDto.fileId) {
        return {...prev, [curr]: undefined}
      }
    }, contentStructure)

    // Object.entries(content.structure).filter(([key]) => key === )

    const updatedContent = { ...content, structure: newStructure };

    await this.contentRepository.updateOne(updatedContent)

    return plainToClass(ContentDto, updatedContent);
  }
}
