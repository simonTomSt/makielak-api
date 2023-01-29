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

class ServiceItem {
  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsNotEmpty()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => FileDto)
  public image: FileDto;
}

export class HomePageStructureDto {
  @IsNotEmpty()
  @IsString()
  public welcomeTitle: string;

  @IsNotEmpty()
  @IsString()
  public welcomeSubtitle: string;

  @IsNotEmpty()
  @IsString()
  public welcomeButtonText: string;

  @IsNotEmpty()
  @IsString()
  public aboutUsText: string;

  @IsNotEmpty()
  @IsString()
  public offerTitle: string;

  @IsNotEmpty()
  @IsString()
  public offerButtonText: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(4)
  @Type(() => ServiceItem)
  public serviceItems: ServiceItem[];
}
