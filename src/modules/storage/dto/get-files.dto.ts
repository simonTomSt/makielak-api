import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class GetFilesDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  public ids: string[];
}
