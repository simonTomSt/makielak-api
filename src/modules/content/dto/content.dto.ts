import { ContentType } from '@prisma/client';
import { IsEnum, IsJSON, IsNotEmpty, IsUUID } from 'class-validator';

export class ContentDto {
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
