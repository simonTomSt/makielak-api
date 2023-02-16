import { ContentType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";

export class DeleteContentFileDto {
  @IsEnum(ContentType)
  @IsNotEmpty()
  public name: ContentType;

  @IsUUID()
  @IsNotEmpty()
  public fileId: string;
}
