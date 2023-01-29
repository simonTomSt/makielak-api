import { FileDto } from '@modules/storage/dto';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsNotEmptyObject,
  IsObject,
} from 'class-validator';

export class ServicesStructureDto {
  @IsNotEmpty()
  @IsString()
  public headerTitle: string;

  @IsNotEmpty()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => FileDto)
  public headerImage: FileDto;

  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(4)
  @Type(() => FileDto)
  public images: FileDto[];
}
