import { FileType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FileDto {
  @IsUUID()
  @IsNotEmpty()
  public id: string;

  @IsEnum(FileType)
  @IsNotEmpty()
  public type: FileType;

  @IsString()
  @IsNotEmpty()
  public url: string;
}
