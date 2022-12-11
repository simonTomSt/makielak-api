import { IsEmail, IsNotEmpty } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

export class GetUserByEmailDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;
}


export const GetUserByEmailDtoSchema = validationMetadatasToSchemas();
