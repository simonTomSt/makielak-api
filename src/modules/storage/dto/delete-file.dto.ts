import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteFileDto {
  @IsNotEmpty()
  @IsUUID()
  public id: string;
}
