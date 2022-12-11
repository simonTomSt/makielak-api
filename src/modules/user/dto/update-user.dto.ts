import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

export class UpdateUserDto {
  @IsUUID()
  @IsNotEmpty()
  public id: string;

  @IsEmail()
  @IsOptional()
  public email?: string;

  @IsString()
  @IsOptional()
  public name?: string | null;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(64)
  public password: string;

  @IsEnum(Role)
  @IsOptional()
  public role?: Role;
}

export const UpdateUserDtoSchema = validationMetadatasToSchemas();
