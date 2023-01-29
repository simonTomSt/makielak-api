import { FileType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class StoreFileDto {
  @IsEnum(FileType)
  @IsNotEmpty()
  public type: FileType;

  @IsString()
  @IsNotEmpty()
  public url: string;
}
