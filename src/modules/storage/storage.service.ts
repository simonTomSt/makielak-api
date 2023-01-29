import { TYPES } from '@services/app/ioc-types';
import { plainToClass } from 'class-transformer';
import { inject, injectable } from 'inversify';
import { DeleteFileDto, FileDto, GetFilesDto, StoreFileDto } from './dto';
import { IStorageRepository, IStorageService } from './storage.interface';

@injectable()
export class StorageService implements IStorageService {
  constructor(
    @inject(TYPES.StorageRepository)
    private readonly storageRepository: IStorageRepository
  ) {}

  async getFilesByIds(getFilesDto: GetFilesDto): Promise<FileDto[]> {
    const files = await this.storageRepository.getFilesByIds(getFilesDto.ids);

    return files.map((file) => plainToClass(FileDto, file));
  }

  async storeFile(storeFileDto: StoreFileDto) {
    const file = await this.storageRepository.storeFile(storeFileDto);

    return plainToClass(FileDto, file);
  }

  async deleteFile(deleteFileDto: DeleteFileDto): Promise<boolean> {
    return this.storageRepository.deleteFile(deleteFileDto.id);
  }
}
