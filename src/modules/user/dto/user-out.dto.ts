import { Role } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

export class UserOutDto {
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

export const UserOutDtoSchema = validationMetadatasToSchemas();
