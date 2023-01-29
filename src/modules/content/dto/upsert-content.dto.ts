import { ContentType } from '@prisma/client';
import {
  IsOptional,
  IsUUID,
  IsNotEmpty,
  IsJSON,
  IsEnum,
} from 'class-validator';

export class UpsertContentDto {
  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  public id: string;

  @IsJSON()
  @IsNotEmpty()
  public structure: string;

  @IsEnum(ContentType)
  @IsNotEmpty()
  public name: ContentType;
}
