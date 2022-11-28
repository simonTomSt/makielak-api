import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserDto {
  @IsUUID()
  @IsNotEmpty()
  public id: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  public name: string | null;
}
