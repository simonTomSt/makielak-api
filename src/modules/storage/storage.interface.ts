import { File } from '@prisma/client';
import { DeleteFileDto, FileDto, GetFilesDto, StoreFileDto } from './dto';

export interface IStorageRepository {
  storeFile(files: Omit<File, 'id'>): Promise<File>;
  getFilesByIds(ids: File['id'][]): Promise<File[]>;
  deleteFile(id: File['id']): Promise<boolean>;
}

export interface IStorageService {
  storeFile(storeFileDto: StoreFileDto): Promise<FileDto>;
  getFilesByIds(getFilesDto: GetFilesDto): Promise<FileDto[]>;
  deleteFile(deleteFileDto: DeleteFileDto): Promise<boolean>;
}
