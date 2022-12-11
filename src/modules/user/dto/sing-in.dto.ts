import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}

export const SignInDtoSchema = validationMetadatasToSchemas();
