import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(64)
  public password: string;

  @IsString()
  @IsOptional()
  public name: string | null | undefined;

  @IsEnum(Role)
  @IsOptional()
  public role: Role;
}

export const CreateUserDtoSchema = validationMetadatasToSchemas();
