import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateUserDto {
  @IsUUID()
  @IsNotEmpty()
  public id: string;

  @IsEmail()
  public email?: string;

  @IsString()
  public name?: string | null;
}
