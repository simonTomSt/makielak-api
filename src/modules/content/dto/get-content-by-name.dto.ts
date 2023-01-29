import { ContentType } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class GetContentByNameDto {
  @IsEnum(ContentType)
  @IsNotEmpty()
  public name: ContentType;
}
