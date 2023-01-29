import { FileDto } from '@modules/storage/dto';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  ValidateNested,
  IsUrl,
  IsNotEmptyObject,
  IsObject,
} from 'class-validator';

class AddressDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  addressUrl: string;
}

export class ContactStructureDto {
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
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(4)
  public phones: string[];

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(4)
  public emails: string[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @Type(() => AddressDto)
  public addresses: AddressDto[];
}
