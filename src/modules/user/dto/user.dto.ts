import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

export class UserDto {
  @IsUUID()
  @IsNotEmpty()
  public id: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsString()
  public name: string | null;

  @IsEnum(Role)
  @IsNotEmpty()
  public role: Role;
}

export const UserDtoSchema = validationMetadatasToSchemas();
