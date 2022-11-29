import { Role } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsUUID, IsNotEmpty, IsEmail, IsString, IsEnum } from 'class-validator';

export class TokenPayloadDto {
  @IsUUID()
  @IsNotEmpty()
  @Expose()
  public id: string;

  @IsEmail()
  @IsNotEmpty()
  @Expose()
  public email: string;

  @IsString()
  @Expose()
  public name: string;

  @IsEnum(Role)
  @IsNotEmpty()
  @Expose()
  public role: Role;
}
