import { FileDto } from '@modules/storage/dto';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export class AboutUsStructureDto {
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
  public firstPartContent: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @Type(() => FileDto)
  public firstPartImages: FileDto[];

  @IsNotEmpty()
  @IsString()
  public secondPartContent: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @Type(() => FileDto)
  public secondPartImages: FileDto[];
}
