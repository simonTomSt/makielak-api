import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetUserByIdDto {
  @IsUUID()
  @IsNotEmpty()
  public id: string;
}
