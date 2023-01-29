import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteOneUserDto {
  @IsUUID()
  @IsNotEmpty()
  public id: string;
}
