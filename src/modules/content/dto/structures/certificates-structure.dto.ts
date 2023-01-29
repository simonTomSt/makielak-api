import { FileDto } from '@modules/storage/dto';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';

class Certificate {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public url: string;

  @IsNotEmpty()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => FileDto)
  public image: FileDto;
}

export class CertificatesStructureDto {
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
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @Type(() => Certificate)
  public certificates: Certificate[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @Type(() => Certificate)
  public declarations: Certificate[];
}
